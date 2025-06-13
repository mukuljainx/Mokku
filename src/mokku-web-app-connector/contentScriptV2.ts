import { get } from "lodash";

import inject from "../contentScript/injectToDom";
import { IEventMessage } from "@mokku/types";
import { IDynamicURLMap, ILog } from "../interface/mock";
import { getStore } from "../panel/App/service/storeActions";
import { messageService } from "../panel/App/service";

console.log("Content Script v2");

export const contentScriptV2 = () => {
    const init = () => {
        var port = chrome.runtime.connect({ name: "mokku-content-script" });

        port.onMessage.addListener((message) => {});

        messageService.listen("CONTENT", (data: IEventMessage) => {
            if (data.type === "LOG") {
                const message = data.message as ILog;

                console.log("Sending to panel");
                messageService.send({
                    message,
                    type: "LOG",
                    from: "CONTENT",
                    to: "PANEL",
                    extensionName: "MOKKU",
                });

                console.log("Sending to service worker");

                port.postMessage(data);
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
