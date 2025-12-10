import { MessageService } from "@/lib";
import { IMessage } from "@/types";

console.log("Mokku app_script: init");

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

messageService.listen((message) => {
    console.log("Mokku app_script: received message from web app", message);

    messageService
        .send("SERVICE_WORKER", message)
        .then((resp) => {
            console.log("Mokku app_script: received response from SW", resp);
            // forward to web app
            sentMessageToApp({
                ...resp,
                _mokku: {
                    destination: "APP",
                    source: "APP_SCRIPT",
                },
            });
        })
        .catch(() => {
            sentMessageToApp({
                data: {
                    isError: true,
                    error: {
                        message: "Service Worker not responding",
                        status: 500,
                    },
                },
                type: message.type,
                id: message.id,
            });
        });

    // port.postMessage({
    //     ...message,
    //     _mokku: {
    //         source: "APP_SCRIPT",
    //         destination: "SERVICE_WORKER",
    //     },
    // } as IMessage);
});

setTimeout(() => {
    sentMessageToApp({
        data: {
            isError: false,
        },
        type: "APP_SCRIPT_READY",
        extensionName: "MOKKU",
        _mokku: {
            destination: "APP",
            source: "APP_SCRIPT",
        },
    });
}, 500);
