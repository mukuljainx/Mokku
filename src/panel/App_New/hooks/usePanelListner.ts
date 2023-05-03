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
  const addLog = useLogStore((state) => state.addLog);
  const updateLog = useLogStore((state) => state.updateLog);
  const [state, setState] = useState(props);
  messageService.listen("PANEL", (message: IEventMessage, sender: any) => {
    if (!checkIfSameTab(sender.tab, props.tab)) {
      return;
    }

    switch (message.type) {
      case "LOG": {
        const newLog = message.message as ILog;
        if (!newLog.response) {
          addLog(newLog);
        } else if (newLog.id) {
          updateLog(newLog);
        }
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
