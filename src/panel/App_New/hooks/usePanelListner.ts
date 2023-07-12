import { IEventMessage } from "../../../interface/message";
import messageService from "../service/messageService";
import { ILog } from "@mokku/types";
import { useLogStore } from "../store";
import { useState } from "react";
import { IAppProps } from "../App_New";

const checkIfSameTab = (sender: chrome.tabs.Tab, tab: chrome.tabs.Tab) => {
  return sender.index === tab.index && sender.windowId === tab.windowId;
};

export const usePanelListener = (props: IAppProps) => {
  const upsertLog = useLogStore((state) => state.upsertLog);
  const [state, setState] = useState(props);
  messageService.listen("PANEL", (message: IEventMessage, sender: any) => {
    if (!checkIfSameTab(sender.tab, props.tab)) {
      return;
    }

    switch (message.type) {
      case "LOG": {
        const newLog = message.message as ILog;
        upsertLog(newLog);
        break;
      }
      case "INIT": {
        if (message.message !== props.host) {
          const host = message.message as string;
          const storeKey = `mokku.extension.active.${host}`;
          const isLocalhost = host.includes("http://localhost");
          chrome.storage.local.get([storeKey], (result) => {
            let active = result[storeKey];
            if (isLocalhost && active === undefined) {
              active = true;
            }
            setState((prev) => ({ ...prev, active, host }));
          });
        }
      }
    }
  });

  return state;
};
