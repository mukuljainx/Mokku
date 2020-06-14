import { get } from "lodash";

import inject from "./contentScript/injectToDom";
import { IEventMessage } from "./interface/message";
import { getDefaultStore, getURLMap } from "./services/collection";
import { IStore, DBNameType, IMockResponse, IURLMap } from "./interface/mock";
const init = () => {
  let store: IStore;
  let urlMap: IURLMap = {};

  const setStore = () => {
    const DBName: DBNameType = "mokku.extension.main.db";
    chrome.storage.local.get([DBName], function (result) {
      store = result["mokku.extension.main.db"] || getDefaultStore();
      urlMap = getURLMap(store);
    });
  };

  const getMockPath = (url: string, method: string) => {
    if (urlMap[url]) {
      if (urlMap[url][method]) {
        return urlMap[url][method];
      }
    }
  };

  const getMock = (path: string) => {
    return get(store, path, null);
  };

  // get initial store
  setStore();

  // From xhook to content Script
  window.addEventListener("message", function (event) {
    // We only accept messages from ourselves
    if (event.source !== window) return;

    const data: IEventMessage = event.data;

    if (data.to !== "CONTENT_SCRIPT") return;

    if (data.type === "LOG") {
      const message = data.message;
      const mockPath = getMockPath(message.request.url, message.request.method);
      const mock = getMock(mockPath) as IMockResponse;

      if (mock) {
        message.isMocked = mock.active;
        message.mockPath = mockPath;
      }

      chrome.runtime.sendMessage({
        message,
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
      extenstionName: "MOKKU",
      message: {},
    };

    const request = data.message.request;
    const mockPath = getMockPath(request.url, request.method);
    const mock = getMock(mockPath) as IMockResponse;

    if (mock && mock.active) {
      response.message.mockResponse = mock;
    }

    window.postMessage(response, "*");
  });

  chrome.runtime.onMessage.addListener((message, sender, response) => {
    //!this.checkIfSameTab(sender.tab)) return;
    if (message.to !== "CONTENT") return;

    if (message.type === "UPDATE_STORE") {
      setStore();
    }
  });
};

const host = location.host;
const isLocalhost = location.href.includes("http://localhost");

chrome.storage.local.get([`mokku.extension.active.${host}`], function (result) {
  let active = result[`mokku.extension.active.${host}`];
  if (isLocalhost && active === undefined) {
    active = true;
  }
  if (active) {
    // injects script to page's DOM
    inject();
    init();
  }
});
