import { get } from "lodash";

import inject from "../contentScript/injectToDom";
import { IEventMessage } from "@mokku/types";
import { IDynamicURLMap, ILog } from "../interface/mock";
import { getStore } from "../panel/App/service/storeActions";
import { messageService } from "../panel/App/service";
import { runFunction } from "./functionExecutor";

console.log("Content Script v2");
const port = chrome.runtime.connect({ name: "mokku-content-script" });

export const contentScriptV2 = () => {
    const init = () => {
        port.onMessage.addListener(async (message) => {
            // messaged received from service worker
            const mock = message?.mockResponse;
            const request = message?.request;

            if (!mock) {
                messageService.send({
                    from: "CONTENT",
                    to: "HOOK",
                    extensionName: "MOKKU",
                    message,
                    id: message.id,
                });
            } else {
                if (mock.type === "FUNCTION" && mock.function && mock.active) {
                    const result = await runFunction(
                        mock.function,
                        request.queryParams,
                        request.body,
                    );
                    mock.response = result;
                }

                messageService.send({
                    from: "CONTENT",
                    to: "HOOK",
                    extensionName: "MOKKU",
                    message,
                    id: message.id,
                });

                messageService.send({
                    from: "CONTENT",
                    to: "PANEL",
                    extensionName: "MOKKU",
                    type: "LOG_MOCK_STATUS",
                    message: {
                        isMocked: true,
                        id: message.id,
                    },
                    id: message.id,
                });
            }
        });

        messageService.listen("CONTENT", (data: IEventMessage) => {
            if (data.type === "CHECK_MOCK") {
                port.postMessage(data);
            }

            if (data.type === "LOG") {
                messageService.send({
                    ...data,
                    from: "CONTENT",
                    to: "PANEL",
                });
            }
        });
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
            messageService.send({
                message: host,
                type: "INIT",
                from: "CONTENT",
                to: "PANEL",
                extensionName: "MOKKU",
            });
        },
    );
};
