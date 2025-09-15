import { runFunction } from "../function-executor";
import inject from "../utils/inject-to-dom";
import { ILog, IMessage, IMock, MESSAGE_TYPE } from "@/types";
import { MessageService } from "@/lib";
import { createForcedAlivePort } from "../utils/forced-alive-port";

const messageService = new MessageService("CONTENT");
const port = createForcedAlivePort("mokku-content-script");

const init = () => {
    port.onMessage.addListener(async (message) => {
        // messaged received from service worker

        console.log("Mokku Content: Received message from SW", message);

        switch (message.type) {
            case "MOCK_CHECKED": {
                const data = message?.data as {
                    mockResponse: IMock | null;
                    log: ILog;
                };
                const mock = data.mockResponse as IMock;
                const request = data.log.request;

                if (!mock) {
                    // REQUEST_CHECKPOINT_5_1: sending mock response to hook
                    messageService.send("HOOK", {
                        data: message,
                        id: message.id,
                        type: "CHECK_MOCK",
                    });
                } else {
                    if (
                        mock.responseType === "FUNCTION" &&
                        mock.function &&
                        mock.active
                    ) {
                        const result = await runFunction(
                            mock.function,
                            request.queryParams,
                            request.body,
                        );
                        mock.response = result as string;
                    }

                    // REQUEST_CHECKPOINT_5_2: sending mock response to hook
                    messageService.send("HOOK", {
                        data: message,
                        id: message.id,
                        type: "LOG",
                    });

                    messageService.send("PANEL", {
                        type: "LOG_MOCK_STATUS",
                        data: {
                            isMocked: true,
                            log: data.log,
                            projectId: mock.projectId,
                            mockId: mock.id,
                        },
                        id: message.id,
                    });
                }
                break;
            }
            case "MOCK_CHECK_ERROR": {
                messageService.send("PANEL", {
                    type: "LOG_MOCK_STATUS",
                    data: {
                        log: message.data.log,
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
    });

    messageService.listen((data: IMessage) => {
        if (data.type === "MOKKU_ACTIVATED") {
            inject();
            init();
        }
        if (data.type === "CHECK_MOCK") {
            // REQUEST_CHECKPOINT_2: Content received mock check request from hook
            // Forward the message to the service worker
            console.log("Mokku Inject: Forwarding CHECK_MOCK to SW", data);
            port.postMessage(data);
        }

        if (data.type === "LOG") {
            messageService.send("PANEL", {
                type: "LOG",
                data: data.data,
                id: data.id,
            });
        }

        if (data.type === MESSAGE_TYPE.ERROR) {
            // Forward xhook error to panel for user notification
            messageService.send("PANEL", {
                type: MESSAGE_TYPE.ERROR,
                data: data.data,
                messageId: data.messageId,
            });
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
        // tell the panel about the new injection (host might have changed)
        messageService.send("PANEL", {
            data: host,
            type: "INIT",
        });
    } catch (error) {
        console.error(811, "Mokku Inject: Error during initialization:", error);
    }
});
