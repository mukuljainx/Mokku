import { MessageService } from "@/lib";
import { getStore, setIsMigrated } from "@/services/oldDb";
import { APP_MESSAGE_TYPE } from "@/types";
import { createForcedAlivePort } from "./utils/forced-alive-port";

console.log("Mokku app_script: init");

const port = createForcedAlivePort("mokku-content-script");

const messageService = new MessageService("APP_SCRIPT");

// this sends request to web app using window context!
const sentMessageToApp = (request: {
    data: unknown;
    type: APP_MESSAGE_TYPE;
}) => {
    messageService.send("APP", {
        data: request.data,
        type: request.type,
    });
};

// receives message from the mokku app
chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
    sentMessageToApp(request);
    sendResponse(true);
});

window.addEventListener("message", (event) => {
    if (event.source !== window) return;

    if (event.data.type === "MIGRATE_MOCKS_DONE") {
        setIsMigrated();
    }

    console.log("Mokku app_script: received message from web app", event.data);

    port.postMessage(event.data);
});

setTimeout(() => {
    getStore().then(({ store }) => {
        if (store.mocks.length > 0 && store.isMigrated === false) {
            sentMessageToApp({
                type: "MIGRATE_MOCKS",
                data: store?.mocks || [],
            });
        } else if (store.isMigrated === false) {
            setIsMigrated();
        }
    });
}, 1000);
