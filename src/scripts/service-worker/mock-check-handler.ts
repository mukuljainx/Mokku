import { parseJSONIfPossible } from "@/lib";
import { mocksDb } from "@/services/db/mocksDb";
import { ILog, IMessage, IMethod, IMock } from "@/types";
import { OperationHandlers } from "./type";
import { DynamicUrlHandler } from "./dynamic-url-handler";

const mockDynamicUrlHandler = new DynamicUrlHandler(
    mocksDb.getDynamicUrlPatterns.bind(mocksDb)
);

export const mockHandlerInit = async () => {
    mockDynamicUrlHandler.init();
};

export const mockCheckHandler: OperationHandlers = {
    init: mockHandlerInit,
    CHECK_MOCK: async (
        message: IMessage,
        portPostMessage: (message: IMessage) => void
    ) => {
        console.log("Mokku SW: received CHECK_MOCK", message);
        const log = message.data as ILog;
        let mock: IMock | undefined = undefined;
        const request = log.request as ILog["request"];
        // removes the trailing slash for uniformity
        const url =
            request && request.url ? request.url.replace(/\/$/, "") : "";
        try {
            // REQUEST_CHECKPOINT_3: service worker received message from content script

            if (!request) {
                return portPostMessage({
                    type: "MOCK_CHECKED",
                    data: {
                        mock: null,
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
                        const all = await mocksDb.findGraphQLMocks({
                            url,
                            operationName: json.operationName,
                        });
                        mock = all?.[0];
                    }
                }
            }

            // if no mock or mock is inactive
            // 2. check for static
            if (!mock || !mock.active) {
                const staticMock = await mocksDb.findStaticMocks(
                    url,
                    request.method
                )[0];

                // assign whatever we found
                mock = staticMock;
            }

            let pathname = "";
            // 3. check with pathname
            if (!mock || !mock.active) {
                try {
                    pathname = new URL(request.fullUrl).pathname;
                } catch (e) {
                    // log eventual error but continue
                }
                if (pathname) {
                    const all = await mocksDb.findStaticMocks(
                        pathname,
                        request.method
                    );
                    const pathnameMock = all[0];

                    mock = pathnameMock;
                }
            }

            // 4. check with dynamic mocks
            if (!mock || !mock.active) {
                const dynamicMatch =
                    await mockDynamicUrlHandler.findMatchingUrl(
                        url,
                        pathname,
                        request.method
                    );

                if (dynamicMatch) {
                    const dynamicMock = await mocksDb.getMockByLocalId(
                        dynamicMatch.localId
                    );

                    mock = dynamicMock;
                }
            }
            // REQUEST_CHECKPOINT_4: service worker informs content script about mock
            console.log("Mokku SW: Found mock for request:", { request, mock });
            if (mock) {
                portPostMessage({
                    type: "MOCK_CHECKED",
                    data: {
                        mock: mock,
                        log,
                    },
                    id: message.id,
                });
            } else {
                portPostMessage({
                    type: "MOCK_CHECKED",
                    data: {
                        log,
                        mock: null,
                    },
                    id: message.id,
                });
            }
        } catch (err) {
            console.error("Mokku SW: Error processing CHECK_MOCK", err);
            portPostMessage({
                type: "MOCK_CHECKED",
                data: {
                    mock: null,
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
