import { IEventMessage } from "../../interface/message";
/**
 *
 * Inject
 *     -> Content Script
 *
 * Content script is bridge between panel and inject for communication
 * as it has both windows event listener and chrome runtime message listener
 * Content Script
 *     -> Panel
 *     -> Hook
 *
 * Panel
 *     -> Content Script
 */

const tunnelMap = {
  "HOOK:CONTENT": "window",
  "CONTENT:HOOK": "window",
  "CONTENT:PANEL": "tab",
  "PANEL:CONTENT": "runtime",
};

type ISendProps = Omit<IEventMessage, "extensionName">;

const send = (props: ISendProps, tabId?: number) => {
  const path = tunnelMap[`${props.to}:${props.from}`];
  const service = {
    window: () =>
      window.postMessage(
        {
          ...props,
          extensionName: "MOKKU",
        },
        "*"
      ),
    runtime: () =>
      chrome.runtime.sendMessage({
        ...props,
        extensionName: "MOKKU",
      }),
    tab: () => {
      chrome.tabs.sendMessage(tabId, props);
    },
  };

  service[path](props);
};

const listen = (
  entity: IEventMessage["from"],
  callback: (props: IEventMessage, sender?: any, sendResponse?: any) => void
) => {
  const service = {
    runtime: () => {
      chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
        if (message.to !== entity) return;
        callback(message, _sender, sendResponse);
      });
    },
    window: () => {
      window.addEventListener("message", (event) => {
        // We only accept messages from ourselves
        if (event.source !== window) return;
        const data: IEventMessage = event.data;
        if (data.to !== entity) return;

        callback(data);
      });
    },
  };

  switch (entity) {
    case "HOOK": {
      service["window"]();
      return;
    }
    case "CONTENT": {
      service["window"]();
      service["runtime"]();
      return;
    }
    case "PANEL": {
      service["runtime"]();
      return;
    }
  }
};

export default { send, listen };
