import { runFunction } from "../function-executor";
import inject from "../utils/inject-to-dom";
import { IHeader, ILog, IMessage, IMock, MESSAGE_TYPE } from "@/types";
import { MessageService, parseJSONIfPossible } from "@/lib";
import { match as getMatcher } from "path-to-regexp";
import { getUrlWithoutProtocol } from "../utils/get-url-without-protocol";

const messageService = new MessageService("CONTENT");

const init = () => {
    const handleResponseFromServiceWorker = async (message: IMessage) => {
        switch (message.type) {
            case "MOCK_CHECKED": {
                const data = message?.data as {
                    mock: IMock | null;
                    log: ILog;
                };

                const mock = data.mock as IMock | undefined;
                const request = data.log.request;

                if (!mock) {
                    // REQUEST_CHECKPOINT_5_1: sending mock response to hook
                    messageService.send("HOOK", {
                        data,
                        id: message.id,
                        type: "CHECK_MOCK",
                    });
                } else {
                    if (
                        mock.responseType === "FUNCTION" &&
                        mock.function &&
                        mock.active
                    ) {
                        try {
                            let urlParams: Record<string, any> = {};
                            if (mock.dynamic) {
                                // get the url params
                                const pathname = new URL(request.fullUrl)
                                    .pathname;
                                const url = request.url.replace(/\/$/, "");
                                const urlWithoutProtocol =
                                    getUrlWithoutProtocol(url);
                                const mockUrlWithoutProtocol =
                                    getUrlWithoutProtocol(mock.url);

                                const matcher = getMatcher(
                                    mockUrlWithoutProtocol,
                                    {
                                        decode: window.decodeURIComponent,
                                    }
                                );
                                const matchResult =
                                    matcher(urlWithoutProtocol) ||
                                    matcher(pathname);
                                if (matchResult) {
                                    urlParams = matchResult.params;
                                }
                            }

                            const result = await runFunction(mock.function, {
                                urlParams,
                                searchQuery:
                                    parseJSONIfPossible(request.queryParams)
                                        .json || {},
                                body:
                                    parseJSONIfPossible(request.body).json ||
                                    {},
                            });
                            mock.response = JSON.stringify(result) as string;
                        } catch (error) {
                            console.error(
                                "Mokku Inject: Error executing mock function:",
                                error
                            );
                            messageService.send("HOOK", {
                                data: { log: data.log },
                                id: message.id,
                                type: "CHECK_MOCK",
                            });
                        }
                    }

                    // REQUEST_CHECKPOINT_5_2: sending mock response to hook
                    messageService.send("HOOK", {
                        data,
                        id: message.id,
                        type: "CHECK_MOCK",
                    });
                }
                messageService.send("PANEL", {
                    type: "LOG_MOCK_STATUS",
                    data: {
                        mock,
                        log: data.log,
                    },
                    id: message.id,
                });
                break;
            }
            case "HEADER_CHECKED": {
                const data = message?.data as {
                    header: IHeader | null;
                    log: ILog;
                };

                messageService.send("PANEL", {
                    type: "LOG_HEADER_STATUS",
                    data,
                    id: message.id,
                });

                messageService.send("HOOK", {
                    data: data,
                    id: message.id,
                    type: "CHECK_HEADER",
                });

                break;
            }
            case "MOCK_CHECK_ERROR": {
                messageService.send("PANEL", {
                    type: "LOG_MOCK_STATUS",
                    data: {
                        log: message.data,
                        isError: true,
                        id: message.id,
                    },
                    id: message.id,
                });
                console.error("Mokku Inject: Error checking mock", message);
                break;
            }
            default: {
                break;
            }
        }
    };

    messageService.listen((data: IMessage) => {
        switch (data.type) {
            case "MOKKU_ACTIVATED": {
                inject();
                init();
                break;
            }
            case "CHECK_MOCK": {
                // REQUEST_CHECKPOINT_2: Content received mock check request from hook
                // Forward the message to the service worker
                console.log("Mokku Inject: Forwarding CHECK_MOCK to SW", data);
                messageService
                    .send("SERVICE_WORKER", data)
                    .then(handleResponseFromServiceWorker)
                    .catch(() => {
                        messageService.send("HOOK", {
                            data: data,
                            id: data.id,
                            type: "CHECK_MOCK",
                        });
                    });
                break;
            }
            case "CHECK_HEADER": {
                messageService
                    .send("SERVICE_WORKER", data)
                    .then(handleResponseFromServiceWorker)
                    .catch(() => {
                        messageService.send("HOOK", {
                            data: data,
                            id: data.id,
                            type: "CHECK_HEADER",
                        });
                    });
            }
            case "LOG": {
                messageService.send("PANEL", {
                    type: "LOG",
                    data: data.data,
                    id: data.id,
                });
                break;
            }
            case MESSAGE_TYPE.ERROR: {
                // Forward xhook error to panel for user notification
                messageService.send("PANEL", {
                    type: MESSAGE_TYPE.ERROR,
                    data: data.data,
                    id: data.id,
                });
                break;
            }
            default:
                break;
        }
    });
};

const host = location.host;
const isLocalhost = location.href.includes("http://localhost");

chrome.storage.local.get([`mokku.extension.active.${host}`], function (result) {
    let active = result[`mokku.extension.active.${host}`];
    if (isLocalhost && active === undefined) {
        active = true;
    }

    console.log(8114, "Mokku Inject: Active status for", host, "is", active);

    try {
        if (active) {
            // injects script to page's DOM
            inject();
            init();
        }
        messageService.send("PANEL", {
            data: host,
            type: "RESET",
        });
        // tell the panel about the new injection (host might have changed)
    } catch (error) {
        console.error(811, "Mokku Inject: Error during initialization:", error);
    }
});
