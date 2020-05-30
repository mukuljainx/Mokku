import { IMock, IResponse } from "./mock";

export interface IEventMessage {
  to: "HOOK_SCRIPT" | "CONTENT_SCRIPT";
  from: IEventMessage["to"];
  extenstionName: "MOKU";
  id?: number;
  message?: {
    method: string;
    url: string;
    response?: IResponse;
  };
}

export interface IPortMessage {
  to: "BACKROUND" | "CONTENT" | "POPUP" | "PANEL";
  from: IPortMessage["to"];
  message?: Record<string, any>;
}
