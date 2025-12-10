import { IMessage } from "@/types";
import { mockCheckHandler, headerCheckHandler } from "./request-checker";
import {
    organizationHandler,
    headerHandler,
    migrationHandler,
    mockHandler,
    projectHandler,
} from "./operations-handler";
import { MessageService } from "@/lib";

const init = async () => {
    console.log("Mokku: Extension installed/updated.");
    await organizationHandler.init?.();
    mockCheckHandler.init?.();
    headerCheckHandler.init?.();
    migrationHandler.init?.();
};

init();

// Also initialize when the extension is installed or updated
chrome.runtime.onInstalled.addListener(async () => {
    const updatePageUrl = "https://mokku.app/welcome";

    // Open a new tab with the specified URL
    chrome.tabs.create({ url: updatePageUrl }, (tab) => {
        console.log("Update page launched:", updatePageUrl);
    });
});

const operations = {
    ...mockCheckHandler,
    ...headerCheckHandler,
    ...projectHandler,
    ...organizationHandler,
    ...mockHandler,
    ...headerHandler,
    ...migrationHandler,
};

const messageService = new MessageService("SERVICE_WORKER");

messageService.listen(async (message, _, sendResponse) => {
    console.log("Mokku SW: received message from app script", message._mokku);

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
