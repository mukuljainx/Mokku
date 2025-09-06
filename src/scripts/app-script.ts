import { MessageService } from "@/lib";
import { getStore, setIsMigrated } from "@/services/oldDb";
import { APP_MESSAGE_TYPE, IMessage } from "@/types";
import { createForcedAlivePort } from "./utils/forced-alive-port";

console.log("Mokku app_script: init");

const port = createForcedAlivePort("mokku-content-script");

const messageService = new MessageService("APP_SCRIPT");

// this sends request to web app using window context!
const sentMessageToApp = (message: IMessage) => {
    messageService.send("APP", message);
};

// receives message from the mokku app
chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
    sentMessageToApp(request);
    sendResponse(true);
});

window.addEventListener("message", (event) => {
    if (event.source !== window) return;

    const message = event.data as IMessage;

    if (message._mokku?.destination !== "APP_SCRIPT") return; // to avoid loopback

    console.log("Mokku app_script: received message from web app", event.data);

    port.postMessage({
        ...message,
        _mokku: {
            source: "APP_SCRIPT",
            destination: "SERVICE_WORKER",
        },
    } as IMessage);
});

port.onMessage.addListener(async (message) => {
    console.log("Mokku app_script: Received message from SW", message);
    // forward to web app
    sentMessageToApp({
        ...message,
        _mokku: {
            destination: "APP",
            source: "APP_SCRIPT",
        },
    });
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
