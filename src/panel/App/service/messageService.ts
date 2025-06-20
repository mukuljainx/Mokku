import { IEventMessage } from "../types";
/**
 *
 * Inject
 *     -> Content Script
 *
 * Content script is bridge between panel and inject for communication
 * as it has both windows event listern and chrome runtime message listner
 * Content Script
 *     -> Panel
 *     -> Hook
 *
 * Panel
 *     -> Content Script
 */

const tunnelMap = {
    "HOOK:CONTENT": "window",
    "CONTENT:HOOK": "window",
    "CONTENT:PANEL": "runtime",
    "CONTENT:SERVICE_WORKER": "runtime",
    "PANEL:CONTENT": "tab",
    "SERVICE_WORKER:CONTENT": "runtime",
    "SERVICE_WORKER:PANEL": "runtime",
};

const send = (props: IEventMessage, tabId?: number) => {
    const pathKey = `${props.from}:${props.to}` as keyof typeof tunnelMap;
    const path = tunnelMap[pathKey];
    const service = {
        window: () => window.postMessage(props, "*"), // Ensure this is only called in contexts where 'window' is the host window
        runtime: () => chrome.runtime.sendMessage(props),
        tab: () => chrome.tabs.sendMessage(tabId, props),
    };

    if (service[path]) {
        service[path](props);
    } else {
        console.error(`Mokku MessageService: No path defined for ${pathKey}`);
    }
};

const listen = (
    entity: IEventMessage["from"],
    callback: (props: IEventMessage, sender?: any, sendResponse?: any) => void,
) => {
    const service = {
        runtime: () => {
            const func = (message, _sender, sendResponse) => {
                if (message.to !== entity) return;
                callback(message, _sender, sendResponse);
            };
            chrome.runtime.onMessage.addListener(func);
            return () => chrome.runtime.onMessage.removeListener(func);
        },
        window: () => {
            const func = (event) => {
                // We only accept messages from ourselves
                if (event.source !== window) return;
                const data: IEventMessage = event.data;
                if (data.to !== entity) return;

                callback(data);
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

export default { send, listen };
