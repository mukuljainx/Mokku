import inject from "./contentScript/injectToDom";
import { IEventMessage, IPortMessage } from "./interface/message";
import { getDefultStore } from "./services/collection";
import { IStore, DBNameType } from "./interface/mock";

// injects script to page's DOM
inject();

let store: IStore;
const DBName: DBNameType = "moku.extension.main.db";
chrome.storage.local.get([DBName], function (result) {
  store = result["moku.extension.main.db"] || getDefultStore();
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

  const mock = store.mocks.find(
    (item) =>
      request.url === item.url && request.method === item.method && item.active
  );
  if (mock) {
    response.message.mockResponse = mock;
  }

  // if (store.mocks[request.url]) {
  //   if (store.mocks[request.url][request.url]) {
  //     response.message.mockResponse = store.mocks[request.url][request.url];
  //   }
  // }

  window.postMessage(response, "*");
});

chrome.runtime.onMessage.addListener((message, sender, response) => {
  //!this.checkIfSameTab(sender.tab)) return;
  if (message.to !== "CONTENT") return;

  if (message.type === "UPDATE_STORE") {
    chrome.storage.local.get([DBName], function (result) {
      store = result["moku.extension.main.db"] || getDefultStore();
    });
  }
});
