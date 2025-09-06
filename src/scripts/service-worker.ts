import { ILog, IMessage, IMock } from "@/types";
import { type DynamicUrlEntry } from "@/services";
import { parseJSONIfPossible } from "@/lib/parseJson";
import { mocksDb } from "@/services/db/mocksDb";

let dynamicUrlPatterns: DynamicUrlEntry[] = [];

async function initializeDynamicUrls() {
    try {
        dynamicUrlPatterns = await mocksDb.getDynamicUrlPatterns();
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
        port.onMessage.addListener(async (data: IMessage) => {
            if (data.type === "CHECK_MOCK") {
                console.log("Mokku SW: received CHECK_MOCK", data);
                const log = data.data as ILog;
                let mock: IMock | undefined = undefined;
                const request = log.request as ILog["request"];
                try {
                    // REQUEST_CHECKPOINT_3: service worker received message from content script

                    if (!request) {
                        return port.postMessage({
                            type: "MOCK_CHECKED",
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
                        const { json, parsed } = parseJSONIfPossible(
                            request.body,
                        );

                        if (parsed) {
                            if (
                                json.operationName &&
                                typeof json.operationName === "string"
                            ) {
                                mock = await mocksDb.findGraphQLMocks({
                                    url: request.url,
                                    operationName: json.operationName,
                                })[0];
                            }
                        }
                    }

                    // if no mock or mock is inactive
                    // 2. check for static
                    if (!mock || !mock.active) {
                        const staticMock = await mocksDb.findStaticMocks(
                            request.url,
                            request.method,
                        )[0];

                        // either we didn't had the mock
                        // if we had the mock it was inactive
                        if (!mock || staticMock?.active) {
                            mock = staticMock;
                        }
                    }
                    // 3. check with pathname
                    if (!mock || !mock.active) {
                        const pathname = new URL(request.fullUrl).pathname;
                        const pathnameMock = await mocksDb.findStaticMocks(
                            pathname,
                            request.method,
                        )[0];

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
                            const dynamicMock = await mocksDb.findMockById(
                                dynamicMatch.localId,
                            );

                            if (!mock || dynamicMock?.active) {
                                mock = dynamicMock;
                            }
                        }
                    }
                    // REQUEST_CHECKPOINT_4: service worker informs content script about mock
                    console.log(
                        "Mokku SW: Found mock for request:",
                        request,
                        mock,
                    );
                    if (mock) {
                        port.postMessage({
                            type: "MOCK_CHECKED",
                            data: {
                                mockResponse: mock,
                                request: request,
                            },
                            messageId: data.messageId,
                        });
                    } else {
                        console.log(
                            81144,
                            "No mock found for request:",
                            request,
                        );
                        //todo: inform the panel
                        port.postMessage({
                            type: "MOCK_CHECKED",
                            data: {
                                request: request,
                                mockResponse: null,
                            },
                            messageId: data.messageId,
                        });
                    }
                } catch (err) {
                    console.error("Mokku SW: Error processing CHECK_MOCK", err);
                    port.postMessage({
                        type: "MOCK_CHECKED",
                        data: {
                            mockResponse: null,
                            request: request,
                        },
                        messageId: data.messageId,
                    } as IMessage);
                    port.postMessage({
                        type: "MOCK_CHECK_ERROR",
                    } as IMessage);
                }
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

console.log(911, mocksDb.getAllMocks());
