import type { IMessage, IMessageErrorData } from "@/dashboard/types";

const EXTENSION_ID = "llflfcikklhgamfmnjkgpdadpmdplmji"; // mokku

export const sendMessageToMokkuSW = (message: {
    type: "NEW_MOCK";
    data: unknown;
}) => {
    return new Promise((resolve, reject) =>
        chrome.runtime.sendMessage(EXTENSION_ID, message, (response) => {
            if (chrome.runtime.lastError) {
                const errorMessage = `App: Error sending message to extension ${EXTENSION_ID}: ${chrome.runtime.lastError.message}`;
                reject(chrome.runtime.lastError.message);
                console.error(errorMessage);
            } else if (response) {
                console.log(
                    `App: Response from extension ${EXTENSION_ID}:`,
                    response
                );
                resolve(response);
            } else {
                console.log(
                    `App: Extension ${EXTENSION_ID} did not send a response or is not listening.`
                );
                reject(new Error("Mokku not listening or not installed."));
            }
        })
    );
};

export const promiseCollector = new Map();

export const sendMessageToMokku = (message: IMessage) => {
    return new Promise<IMessage | undefined>((resolve, reject) => {
        // console.log("App: Sending message to Mokku:", message);
        if (message.id) {
            promiseCollector.set(message.id, {
                resolve,
                reject,
                time: Date.now(),
            });
            const messageWithMetaInfo: IMessage = {
                ...message,
                _mokku: {
                    destination: "APP_SCRIPT",
                    source: "APP",
                },
            };
            window.postMessage(messageWithMetaInfo, location.origin);
        } else {
            resolve(undefined);
        }
    });
};

// subscribe to messages from mokku
export const subscribeToMokkuMessages = (
    callback: (data: IMessage) => void
) => {
    const func = (event: WindowEventMap["message"]) => {
        // We only accept messages from ourselves
        if (event.source !== window) {
            return;
        }

        const data: IMessage = event.data;
        if (data.extensionName !== "MOKKU" || data._mokku?.source === "APP") {
            return;
        }

        callback(data);
    };
    window.addEventListener("message", func);
    return () => window.removeEventListener("message", func);
};

// listener to resolve promises in promiseCollector
// when we get a message from mokku with respondedToId
subscribeToMokkuMessages((message) => {
    if (message.id) {
        const promise = promiseCollector.get(message.id);
        if (promise) {
            if ((message.data as IMessageErrorData).isError) {
                const error = (message.data as IMessageErrorData).error;
                promise.reject(error);
            } else {
                promise.resolve(message);
            }
            promiseCollector.delete(message.id);
        }
    }

    // clean up old promises
    const now = Date.now();
    for (const [key] of promiseCollector) {
        const promise = promiseCollector.get(key);
        if (promise && now - promise.time > 60 * 1000) {
            promise.reject({
                message: "Timeout waiting for response from Mokku",
                code: 408,
            });
            promiseCollector.delete(key);
        }
    }
});
