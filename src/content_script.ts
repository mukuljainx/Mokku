import inject from "./contentScript/injectToDom";
import { IEventMessage, IPortMessage } from "./interface/message";
import { getDefultStore } from "./services/collection";
import { IStore } from "./interface/mock";

// injects script to page's DOM
inject();

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

  if (data.type === "XHOOK_AFTER") {
    chrome.runtime.sendMessage({
      message: data.message,
      type: "LOG",
      from: "CONTENT",
      to: "PANEL",
    });
    return;
  }

  const response: Omit<IEventMessage, "type"> = {
    id: data.id,
    from: "CONTENT_SCRIPT",
    to: "HOOK_SCRIPT",
    extenstionName: "MOKU",
    message: {},
  };

  const request = data.message.request;

  if (store.mocks[request.url]) {
    if (store.mocks[request.url][request.url]) {
      response.message.mockResponse = store.mocks[request.url][request.url];
    }
  }

  window.postMessage(response, "*");
});

console.log("Current tab: ", location.host);
