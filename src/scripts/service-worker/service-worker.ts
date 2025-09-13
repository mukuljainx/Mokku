import { IMessage } from "@/types";
import { mockHandler, mockHandlerInit } from "./mock-handler";
import { projectHandler } from "./project-handler";
import { organizationHandler } from "./organization-handler";

// Initialize on service worker startup
chrome.runtime.onStartup.addListener(() => {
    console.log("Mokku: Service worker started on browser startup.");
    mockHandlerInit();
});

// Also initialize when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    console.log("Mokku: Extension installed/updated.");
    mockHandlerInit();
    organizationHandler.init?.();
});

const operations = {
    ...mockHandler,
    ...projectHandler,
    ...organizationHandler,
};

chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "mokku-content-script") {
        port.onMessage.addListener(async (message: IMessage | "PING") => {
            if (message === "PING") {
                return;
            }

            const portPostMessage = (message: IMessage) =>
                port.postMessage(message);

            console.log(
                "Mokku SW: received message from content script",
                message,
            );

            if (operations[message.type] === undefined) {
                console.log("Mokku SW: No handler for message", message);

                portPostMessage({
                    type: message.type,
                    data: {
                        isError: true,
                        error: {
                            message: "Operation not supported",
                            status: 404,
                        },
                    },
                    id: message.id,
                    _mokku: {
                        source: "SERVICE_WORKER",
                        destination: message._mokku.source,
                    },
                } as IMessage);

                return;
            }

            try {
                await operations[message.type]?.(message, portPostMessage);
            } catch (err) {
                console.log("Mokku SW: Error handling message", err, message);
                portPostMessage({
                    type: message.type,
                    data: {
                        isError: true,
                        error: {
                            message: "Something went wrong",
                            status: 500,
                            error: err,
                        },
                    },
                    id: message.id,
                    _mokku: {
                        source: "SERVICE_WORKER",
                        destination: message._mokku.source,
                    },
                } as IMessage);
            }
        });
    }
});

chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "mokku-content-script") {
        port.onMessage.addListener(async (data: IMessage) => {
            // REQUEST_CHECKPOINT_3: service worker received message from content script
        });
    }
});
