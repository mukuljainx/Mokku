import inject from "./contentScript/injectToDom";
import { IEventMessage, IPortMessage } from "./interface/message";
import { getDefultStore } from "./services/collection";
import { IStore } from "./interface/mock";

// injects script to page's DOM
inject();

// background script to content script
const port = chrome.runtime.connect({ name: "extension:moku" });
const url = location.host;

let store: IStore;

chrome.storage.local.get([url], function (result) {
  store = result.url || getDefultStore();
});

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

  console.log(data.message);
  if (store.mocks[data.message?.url]) {
    if (store.mocks[data.message?.url][data.message?.method]) {
      response.message.response =
        store.mocks[data.message?.url][data.message?.method];
    }
  }

  window.postMessage(response, "*");
});

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
