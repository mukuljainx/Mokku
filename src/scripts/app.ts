import { messageService } from "@/lib";

console.log("Web app content script");

chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
    messageService.send({
        from: "CONTENT",
        to: "HOOK",
        extensionName: "MOKKU",
        message: request.data,
        type: request.type,
    });
    sendResponse(true);
});
