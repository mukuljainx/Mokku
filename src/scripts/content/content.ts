import { runFunction } from "../functionExecutor";
import inject from "../injectToDom";
import { ILog, IMessage, IMockResponse } from "@/types";
import { MessageService } from "@/lib";
import { createServiceWorkerMessenger } from "./serviceWorkerMessenger";

const messageService = new MessageService("CONTENT");

export const contentScriptV2 = () => {
    const init = () => {
        const serviceWorkerMessenger = createServiceWorkerMessenger();
        serviceWorkerMessenger.onMessage.addListener(
            async (
                message: IMessage<
                    "CONTENT",
                    {
                        mockResponse: IMockResponse | null;
                        request: ILog["request"];
                    }
                >,
            ) => {
                // messaged received from service worker
                const mock = message?.data.mockResponse as IMockResponse;
                const request = message?.data.request;

                if (!mock) {
                    // REQUEST_CHECKPOINT_5_1: sending mock response to hook
                    messageService.send("HOOK", {
                        data: message,
                        messageId: message.messageId,
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
                        messageId: message.messageId,
                        type: "LOG",
                    });

                    messageService.send("PANEL", {
                        type: "LOG_MOCK_STATUS",
                        data: {
                            isMocked: true,
                            id: message.messageId,
                            projectId: mock.projectId,
                            mockId: mock.id,
                        },
                        messageId: message.messageId,
                    });
                }
            },
        );

        messageService.listen((data: IMessage<"CONTENT">) => {
            if (data.type === "MOKKU_ACTIVATED") {
                inject();
                init();
            }
            if (data.type === "CHECK_MOCK") {
                // REQUEST_CHECKPOINT_2: Content received mock check request from hook
                // Forward the message to the service worker
                serviceWorkerMessenger.postMessage(data);
            }

            if (data.type === "LOG") {
                messageService.send("PANEL", {
                    type: "LOG",
                    data: data.data,
                    messageId: data.messageId,
                });
            }
        });

        // messageService.listen("PANEL", (data: IEventMessage) => {
        //     if (data.type === "MOKKU_ACTIVATED") {
        //         inject();
        //         init();
        //     }
        // });
    };

    const host = location.host;
    const isLocalhost = location.href.includes("http://localhost");

    chrome.storage.local.get(
        [`mokku.extension.active.${host}`],
        function (result) {
            let active = result[`mokku.extension.active.${host}`];
            if (isLocalhost && active === undefined) {
                active = true;
            }

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
        },
    );
};

contentScriptV2();
