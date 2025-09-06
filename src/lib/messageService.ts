import { IMessage, Process, Tunnel } from "@/types";

const listen = <T extends Process>(
    entity: T,
    callback: (props: IMessage, sender?: any, sendResponse?: any) => void,
) => {
    const service = {
        runtime: () => {
            const func = (message: any, _sender: any, sendResponse: any) => {
                if (message?._mokku?.destination === entity) {
                    callback(message, _sender, sendResponse);
                }
            };
            chrome.runtime.onMessage.addListener(func);
            return () => chrome.runtime.onMessage.removeListener(func);
        },
        window: () => {
            const func = (event: any) => {
                // We only accept messages from ourselves
                if (event.source !== window) return;
                const message = event.data;
                if (message?._mokku?.destination === entity) {
                    callback(message);
                }
            };
            window.addEventListener("message", func);
            return () => window.removeEventListener("message", func);
        },
    };

    switch (entity) {
        case "HOOK": {
            return [service["window"]()];
        }
        case "CONTENT": {
            return [service["window"](), service["runtime"]()];
        }
        case "PANEL": {
            return [service["runtime"]()];
        }
        case "SERVICE_WORKER": {
            return [service["runtime"]()];
        }
    }
};

const tunnelMap = {
    "HOOK.CONTENT": "WINDOW",

    "CONTENT.PANEL": "RUNTIME",
    "CONTENT.SERVICE_WORKER": "RUNTIME",
    "CONTENT.HOOK": "WINDOW",

    "PANEL.CONTENT": "RUNTIME",

    "SERVICE_WORKER.CONTENT": "RUNTIME",

    "APP_SCRIPT.APP": "WINDOW",
} as const;

const sendMessage = (tunnel: Tunnel, message) => {
    message.extensionName = "MOKKU";
    switch (tunnel) {
        case "WINDOW": {
            window.postMessage(message, "*");
            break;
        }
        case "RUNTIME": {
            chrome.runtime.sendMessage(message);
            break;
        }
        // case "TAB":
        //     if (type.tabId) {
        //         chrome.tabs.sendMessage(type.tabId, { type });
        //     }
        //     break;
        default: {
            console.error(
                `Mokku MessageService: No path defined for ${tunnel}`,
            );
            break;
        }
    }
};

const serviceMap = {
    send: {
        HOOK: ["CONTENT"],
        CONTENT: ["PANEL", "SERVICE_WORKER", "HOOK"],
        PANEL: ["CONTENT"],
        SERVICE_WORKER: [],
        APP_SCRIPT: ["APP"],
        APP: [],
    },
} as const;

type ServiceMap = typeof serviceMap;
type AllowedDestinations<T extends Process> = ServiceMap["send"][T][number];

export class MessageService<T extends Process> {
    private currentProcess: Process;
    constructor(currentProcess: T) {
        this.currentProcess = currentProcess;
    }

    send(destination: AllowedDestinations<T>, message: IMessage) {
        // Ensure message is serializable
        const safeMessage = JSON.parse(JSON.stringify(message));
        safeMessage._mokku = {
            destination,
        };
        safeMessage.extensionName = "MOKKU";

        const pathKey = `${this.currentProcess}.${destination}`;
        const tunnel = tunnelMap[pathKey];
        sendMessage(tunnel, safeMessage);
    }

    listen(
        callback: (props: IMessage, sender?: any, sendResponse?: any) => void,
    ) {
        return listen(this.currentProcess, callback);
    }
}
