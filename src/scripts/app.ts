import { messageService } from "@/lib";
import { getStore, setIsMigrated } from "@/services/oldDb";
import { APP_MESSAGE_TYPE } from "@/types";

// this sends request to web app using window context!
const sentMessageToApp = (request: {
    data: unknown;
    type: APP_MESSAGE_TYPE;
}) => {
    messageService.send({
        from: "CONTENT",
        to: "HOOK",
        extensionName: "MOKKU",
        message: request.data,
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
