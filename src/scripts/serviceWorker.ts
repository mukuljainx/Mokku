import { APP_MESSAGE_TYPE, ILog, IMessage, IMockResponse } from "@/types";
import { db, type DynamicUrlEntry } from "@/services";
import { parseJSONIfPossible } from "@/lib/parseJson";
import { getStore } from "@/services/oldDb";
import { sendMessageToApp } from "@/services/app";

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
    // method: string,
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
        port.onMessage.addListener(async (data: IMessage<"SERVICE_WORKER">) => {
            // REQUEST_CHECKPOINT_3: service worker received message from content script
            if (data.type === "CHECK_MOCK") {
                const log = data.data as ILog;
                let mock: IMockResponse | undefined = undefined;
                const request = log.request as ILog["request"];

                if (!request) {
                    return port.postMessage({
                        data: {
                            mockResponse: null,
                            request: request,
                        },

                        messageId: data.messageId,
                    });
                }

                /**
                 * 1. check for graphql mock
                 */
                if (request?.method === "POST") {
                    const { json, parsed } = parseJSONIfPossible(request.body);

                    if (parsed) {
                        if (
                            json.operationName &&
                            typeof json.operationName === "string"
                        ) {
                            mock = await db.findGraphQLMock({
                                url: request.url,
                                operationName: json.operationName,
                            });
                        }
                    }
                }

                // if no mock or mock is inactive
                // 2. check for static
                if (!mock || !mock.active) {
                    const staticMock = await db.findStaticMock(
                        request.url,
                        request.method,
                    );

                    // either we didn't had the mock
                    // if we had the mock it was inactive
                    if (!mock || staticMock?.active) {
                        mock = staticMock;
                    }
                }
                // 3. check with pathname
                if (!mock || !mock.active) {
                    const pathname = new URL(request.url).pathname;
                    const pathnameMock = await db.findStaticMock(
                        pathname,
                        request.method,
                    );

                    if (!mock || pathnameMock?.active) {
                        mock = pathnameMock;
                    }
                }

                // 4. check with dynamic mocks
                if (!mock || !mock.active) {
                    const dynamicMatch = findMatchingDynamicUrl(
                        request.url,
                        // request.method,
                    );

                    if (dynamicMatch) {
                        const dynamicMock = await db.findMockById(
                            dynamicMatch.localId,
                        );

                        if (!mock || dynamicMock?.active) {
                            mock = dynamicMock;
                        }
                    }
                }

                // REQUEST_CHECKPOINT_4: service worker informs content script about mock
                if (mock) {
                    port.postMessage({
                        data: {
                            mockResponse: mock,
                            request: request,
                        },
                        messageId: data.messageId,
                    });
                } else {
                    console.log(81144, "No mock found for request:", request);
                    //todo: inform the panel
                    port.postMessage({
                        data: {
                            request: request,
                            mockResponse: null,
                        },
                        messageId: data.messageId,
                    });
                }
            }
        });
    }
});

chrome.runtime.onMessageExternal.addListener((request, sender) => {
    console.log("Received message from:", sender.url);
    console.log("Message:", request);

    const tabId = sender.tab?.id;
    const type = request.type as APP_MESSAGE_TYPE;

    sendMessageToApp(tabId, {
        // @ts-ignore
        type: "MIGRATE_MOCKS_XXXX",
        data: [],
    });

    if (type === "APP_CONNECTED") {
        // check if there are mocks in oldDb
        getStore().then(({ store }) => {
            if (store.mocks.length > 0) {
                sendMessageToApp(tabId, {
                    type: "MIGRATE_MOCKS",
                    data: store.mocks,
                });
            }
        });
    }

    if (type === "NEW_MOCK") {
        db.addMock(request.data);
    }

    // Return true to indicate that you will be sending a response asynchronously.
    // This is important if you need to do some work before sending the response.
    return true;
});

console.log(911, db.getAllMocks());
