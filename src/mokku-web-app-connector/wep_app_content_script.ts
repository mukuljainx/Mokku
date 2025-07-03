import { messageService } from "../panel/App/service/messageService";

console.log("Web app content script");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    messageService.send({
        from: "CONTENT",
        to: "HOOK",
        extensionName: "MOKKU",
        message: request.data,
        type: request.type,
    });
    sendResponse(true);
});
