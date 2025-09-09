import { parseJSONIfPossible } from "@/lib";
import { mocksDb } from "@/services/db/mocksDb";
import { ILog, IMessage, IMock } from "@/types";

export interface DynamicUrlEntry {
    localId: number;
    urlPattern: string; // The URL pattern stored for dynamic matching
}

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

export const mockHandlerInit = () => {
    initializeDynamicUrls();
};

export const mockHandler = {
    CHECK_MOCK: async (
        message: IMessage,
        portPostMessage: (message: IMessage) => void,
    ) => {
        console.log("Mokku SW: received CHECK_MOCK", message);
        const log = message.data as ILog;
        let mock: IMock | undefined = undefined;
        const request = log.request as ILog["request"];
        try {
            // REQUEST_CHECKPOINT_3: service worker received message from content script

            if (!request) {
                return portPostMessage({
                    type: "MOCK_CHECKED",
                    data: {
                        mockResponse: null,
                        log,
                    },
                    id: message.id,
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
            console.log("Mokku SW: Found mock for request:", request, mock);
            if (mock) {
                portPostMessage({
                    type: "MOCK_CHECKED",
                    data: {
                        mockResponse: mock,
                        log,
                    },
                    id: message.id,
                });
            } else {
                console.log("Mokku SW: No mock found for request:", request);
                //todo: inform the panel
                portPostMessage({
                    type: "MOCK_CHECKED",
                    data: {
                        log,
                        mockResponse: null,
                    },
                    id: message.id,
                });
            }
        } catch (err) {
            console.error("Mokku SW: Error processing CHECK_MOCK", err);
            portPostMessage({
                type: "MOCK_CHECKED",
                data: {
                    mockResponse: null,
                    log,
                },
                id: message.id,
            } as IMessage);
            portPostMessage({
                type: "MOCK_CHECK_ERROR",
                log,
            } as IMessage);
        }
    },
};
