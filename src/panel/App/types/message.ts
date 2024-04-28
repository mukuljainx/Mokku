import { ILog } from "./mock";

export type Process =
  | "HOOK"
  | "CONTENT"
  | "PANEL"
  | "ALL"
  | "BACKROUND"
  | "PANEL";

export interface IEventMessage {
  to: Process;
  from: Process;
  extensionName: "MOKKU";
  id?: number;
  type?: "LOG" | "NOTIFICATION" | "INIT";
  message: ILog | Record<string, any> | string | number;
}
