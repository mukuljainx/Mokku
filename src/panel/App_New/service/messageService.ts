import { IEventMessage } from "../types";
/**
 *
 * Inject
 *     -> Content Script
 *
 * Content script is bridge between panel and inject for communication
 * as it has both windows event listern and chrome runtime message listner
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
        "*",
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
  callback: (props: IEventMessage, sender?: any, sendResponse?: any) => void,
) => {
  const service = {
    runtime: () => {
      const func = (message, _sender, sendResponse) => {
        if (message.to !== entity) return;
        callback(message, _sender, sendResponse);
      };
      chrome.runtime.onMessage.addListener(func);
      return () => chrome.runtime.onMessage.removeListener(func);
    },
    window: () => {
      const func = (event) => {
        // We only accept messages from ourselves
        if (event.source !== window) return;
        const data: IEventMessage = event.data;
        if (data.to !== entity) return;

        callback(data);
      };
      window.addEventListener("message", func);
      return () => window.removeEventListener("message", func);
    },
  };

  switch (entity) {
    case "HOOK": {
      return [service["window"]()];
    }
    case "CONTENT": {
      return [service["window"](), service["runtime"]()];
    }
    case "PANEL": {
      return [service["runtime"]()];
    }
  }
};

export default { send, listen };
