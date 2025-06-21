import { IEventMessage, ILog, IMockResponse } from "@mokku/types";
import { messageService } from "../panel/App/service";
import { db, DynamicUrlEntry } from "./db";
import { ApiCallDetails, Mock } from "./types";

let dynamicUrlPatterns: DynamicUrlEntry[] = [];

async function initializeDynamicUrls() {
    try {
        dynamicUrlPatterns = await db.getDynamicUrlPatterns();
        console.log(
            "Mokku: Dynamic URL patterns loaded:",
            dynamicUrlPatterns.length,
        );
    } catch (error) {
        console.error("Mokku: Error loading dynamic URL patterns:", error);
    }
}

// Initialize on service worker startup
chrome.runtime.onStartup.addListener(() => {
    console.log("Mokku: Service worker started on browser startup.");
    initializeDynamicUrls();
});

// Also initialize when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    console.log("Mokku: Extension installed/updated.");
    initializeDynamicUrls();
});

function findMatchingDynamicUrl(
    url: string,
    method: string,
): DynamicUrlEntry | undefined {
    // This is a very basic matcher.
    // For more complex patterns (e.g., /users/:id), you'd need a robust path-to-regexp like library.
    return dynamicUrlPatterns.find((entry) => {
        // Simple exact match for now, or implement your pattern matching logic here
        // Example for wildcard: entry.urlPattern.replace('*', '.*') and use regex
        return entry.urlPattern === url;
    });
}

chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "mokku-content-script") {
        port.onMessage.addListener(async (data: IEventMessage) => {
            if (data.type === "CHECK_MOCK") {
                const message = data.message as ILog;
                let mock: IMockResponse | undefined = undefined;

                // 1. check for static
                mock = await db.findStaticMock(
                    message.request.url,
                    message.request.method,
                );

                // check with pathname
                if (!mock) {
                    const pathname = new URL(message.request.url).pathname;
                    mock = await db.findStaticMock(
                        pathname,
                        message.request.method,
                    );
                }

                if (!mock) {
                    // check with dynamic mocks
                    const dynamicMatch = findMatchingDynamicUrl(
                        message.request.url,
                        message.request.method,
                    );
                    if (dynamicMatch) {
                        mock = await db.findMockById(dynamicMatch.localId);
                    }
                }

                console.log("mock", mock);

                if (mock) {
                    port.postMessage({
                        mockResponse: mock,
                        id: data.id,
                        request: message.request,
                    });
                } else {
                    //todo: inform the panel
                    port.postMessage({
                        mockResponse: null,
                        id: data.id,
                        request: message.request,
                    });
                }
            }
        });
    }
});

console.log(db.getAllMocks().then(console.log).catch(console.log));

chrome.runtime.onMessageExternal.addListener(
    (request, sender, sendResponse) => {
        console.log("Received message from:", sender.url);
        console.log("Message:", request);

        if (request.type === "NEW_MOCK") {
            db.addMock(request.data);
        }

        // Check the message content and perform actions
        if (request.greeting === "Hello from the website!") {
            // Send a response back to the website
            sendResponse({ farewell: "Goodbye from the extension!" });
        }

        // Return true to indicate that you will be sending a response asynchronously.
        // This is important if you need to do some work before sending the response.
        return true;
    },
);
