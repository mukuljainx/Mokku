import { IMessage } from "@/types";
import { mockCheckHandler } from "./mock-check-handler";
import { projectHandler } from "./project-handler";
import { organizationHandler } from "./organization-handler";
import { mockHandler } from "./mock-handler";
import { headerHandler } from "./headers-handler";
import { MessageService } from "@/lib";
import { headerCheckHandler } from "./headers-check-handler";

// Initialize on service worker startup
// chrome.runtime.onStartup.addListener(() => {
//     console.log("Mokku: Service worker started on browser startup.");
//     mockCheckHandler.init();
// });

// Also initialize when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    console.log("Mokku: Extension installed/updated.");
    mockCheckHandler.init?.();
    organizationHandler.init?.();
    headerHandler.init?.();
});

const operations = {
    ...mockCheckHandler,
    ...headerCheckHandler,
    ...projectHandler,
    ...organizationHandler,
    ...mockHandler,
    ...headerHandler,
};

const messageService = new MessageService("SERVICE_WORKER");

messageService.listen(async (message, _, sendResponse) => {
    console.log("Mokku SW: received message from app script", message._mokku);
    const messageSource = message._mokku.source as "APP_SCRIPT" | "CONTENT";
    if (operations[message.type] === undefined) {
        console.log("Mokku SW: No handler for message", message);

        sendResponse({
            type: message.type,
            data: {
                isError: true,
                error: {
                    message: "Operation not supported",
                    status: 404,
                },
            },
            id: message.id,
        } as IMessage);

        return true;
    }

    try {
        await operations[message.type]?.(message, (message) => {
            sendResponse(message);
        });
        return true;
    } catch (err) {
        console.log("Mokku SW: Error handling message   ", err.message);
        sendResponse({
            type: message.type,
            data: {
                isError: true,
                error: {
                    message: err?.message || "Something went wrong",
                    status: 500,
                    error: err,
                },
            },
            id: message.id,
            _mokku: {
                source: "SERVICE_WORKER",
                destination: message._mokku.source,
            },
        } as IMessage);
        return true;
    }
});

// chrome.runtime.onConnect.addListener((port) => {
//     if (port.name === "mokku-content-scriptxx") {
//         port.onMessage.addListener(async (message: IMessage | "PING") => {
//             if (message === "PING") {
//                 return;
//             }

//             const portPostMessage = (message: IMessage) =>
//                 port.postMessage(message);

//             console.log(
//                 "Mokku SW: received message from content script",
//                 message
//             );

//             if (operations[message.type] === undefined) {
//                 console.log("Mokku SW: No handler for message", message);

//                 portPostMessage({
//                     type: message.type,
//                     data: {
//                         isError: true,
//                         error: {
//                             message: "Operation not supported",
//                             status: 404,
//                         },
//                     },
//                     id: message.id,
//                     _mokku: {
//                         source: "SERVICE_WORKER",
//                         destination: message._mokku.source,
//                     },
//                 } as IMessage);

//                 return;
//             }

//             try {
//                 await operations[message.type]?.(message, portPostMessage);
//             } catch (err) {
//                 console.log("Mokku SW: Error handling message   ", err.message);
//                 portPostMessage({
//                     type: message.type,
//                     data: {
//                         isError: true,
//                         error: {
//                             message: err?.message || "Something went wrong",
//                             status: 500,
//                             error: err,
//                         },
//                     },
//                     id: message.id,
//                     _mokku: {
//                         source: "SERVICE_WORKER",
//                         destination: message._mokku.source,
//                     },
//                 } as IMessage);
//             }
//         });
//     }
// });

// chrome.runtime.onConnect.addListener((port) => {
//     if (port.name === "mokku-content-script") {
//         port.onMessage.addListener(async (data: IMessage) => {
//             // REQUEST_CHECKPOINT_3: service worker received message from content script
//         });
//     }
// });
