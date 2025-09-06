import { IMessage } from "@/types";
import { type DynamicUrlEntry } from "@/services";
import { mockHandler, mockHandlerInit } from "./mock-handler";

// Initialize on service worker startup
chrome.runtime.onStartup.addListener(() => {
    console.log("Mokku: Service worker started on browser startup.");
    mockHandlerInit();
});

// Also initialize when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    console.log("Mokku: Extension installed/updated.");
    mockHandlerInit();
});

chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "mokku-content-script") {
        port.onMessage.addListener(async (message: IMessage) => {
            const portPostMessage = (message: IMessage) =>
                port.postMessage(message);

            const operations = {
                ...mockHandler,
            };

            operations[message.type]?.(message, portPostMessage);
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
