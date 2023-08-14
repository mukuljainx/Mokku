import { v4 as uuidv4 } from "uuid";
import { IEventMessage } from "../../../../interface/message";
import messageService from "../../service/messageService";
import { ILog } from "@mokku/types";
import { useGlobalStore, useLogStore } from "../../store";
import { useEffect, useRef, useState } from "react";
import { IAppProps } from "../../App_New";
import { getMockFromLog } from "../../Logs/log.util";
import { useAddBulkMock } from "./addBulkMock";

const checkIfSameTab = (sender: chrome.tabs.Tab, tab: chrome.tabs.Tab) => {
  return sender.index === tab.index && sender.windowId === tab.windowId;
};

export const usePanelListener = (props: IAppProps) => {
  const upsertLog = useLogStore((state) => state.upsertLog);
  const [state, setState] = useState(props);
  const isRecording = useGlobalStore((state) => state.recording);
  const recordings = useRef([]);
  const addBulkMock = useAddBulkMock();

  useEffect(() => {
    if (!isRecording) {
      if (recordings.current.length) {
        addBulkMock(recordings.current);
        recordings.current = [];
      }
    }
    const destroyers = messageService.listen(
      "PANEL",
      (message: IEventMessage, sender: any) => {
        if (!checkIfSameTab(sender.tab, props.tab)) {
          return;
        }

        switch (message.type) {
          case "LOG": {
            const newLog = message.message as ILog;
            upsertLog(newLog);

            if (newLog.response && isRecording) {
              const mock = getMockFromLog(newLog);
              mock.name = `Recorded ${new Date().toLocaleDateString()}`;
              mock.id = uuidv4();
              recordings.current.push(mock);
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
            break;
          }
        }
      },
    );

    return () => {
      destroyers.forEach((destroyer) => destroyer());
    };
  }, [isRecording]);

  return state;
};
