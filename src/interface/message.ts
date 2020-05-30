import { IMock, IResponse } from "./mock";

export interface IEventMessage {
  to: "HOOK_SCRIPT" | "CONTENT_SCRIPT";
  from: IEventMessage["to"];
  extenstionName: "MOKU";
  id?: number;
  type: "XHOOK_AFTER" | "XHOOK_BEFORE";
  message?: {
    method: string;
    url: string;
    response?: IResponse;
    text?: string;
    status?: number;
    id?: number;
  };
}

export interface IPortMessage {
  to: "BACKROUND" | "CONTENT" | "POPUP" | "PANEL";
  from: IPortMessage["to"];
  message?: Record<string, any>;
}
