export interface IEventMessage {
  to: "HOOK_SCRIPT" | "CONTENT_SCRIPT";
  from: IEventMessage["to"];
  extenstionName: "MOKU";
  id?: number;
  message?: Record<string, any>;
}

export interface IPortMessage {
  to: "BACKROUND" | "CONTENT" | "POPUP" | "PANEL";
  from: IPortMessage["to"];
  message?: Record<string, any>;
}
