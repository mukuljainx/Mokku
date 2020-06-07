import { ILog } from "./mock";

export interface IEventMessage {
  to: "HOOK_SCRIPT" | "CONTENT_SCRIPT";
  from: IEventMessage["to"];
  extenstionName: "MOKKU";
  id?: number;
  type: "LOG" | "QUERY";
  message: ILog;
}

export interface IPortMessage {
  to: "BACKROUND" | "CONTENT" | "POPUP" | "PANEL";
  from: IPortMessage["to"];
  message?: Record<string, any>;
}
