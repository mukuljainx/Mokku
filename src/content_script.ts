import inject from "./contentScript/injectToDom";
import { IEventMessage, IPortMessage } from "./interface/message";

// injects script to page's DOM
inject();

// From xhook to content Script
window.addEventListener("message", function (event) {
  // We only accept messages from ourselves
  if (event.source !== window) return;

  const data: IEventMessage = event.data;

  if (data.to !== "CONTENT_SCRIPT") return;

  const response: IEventMessage = {
    id: data.id,
    from: "CONTENT_SCRIPT",
    to: "HOOK_SCRIPT",
    extenstionName: "MOKU",
  };
  window.postMessage(response, "*");
});

// background script to content script
const port = chrome.runtime.connect({ name: "extension:moku" });

// background script to content script end
port.postMessage({
  message: { joke: "Knock knock" },
  from: "CONTENT",
  to: "BACKROUND",
} as IPortMessage);
port.onMessage.addListener((message: IPortMessage) => {
  console.log(message);
});

console.log("Current tab: ", location.host);
