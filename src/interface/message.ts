import { ILog, IMockResponse } from "./mock";

export type Process =
    | "HOOK"
    | "CONTENT"
    | "PANEL"
    | "ALL"
    | "SERVICE_WORKER"
    | "PANEL";

export interface IEventMessage {
    to?: Process;
    from?: Process;
    extensionName: "MOKKU";
    id?: number;
    type?: "LOG" | "NOTIFICATION" | "INIT" | "CHECK_MOCK";
    message: ILog | Record<string, any> | string | number | IMockResponse;
}
