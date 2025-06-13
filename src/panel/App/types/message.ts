import { ILog } from "./mock";

export type Process = "HOOK" | "CONTENT" | "PANEL" | "SERVICE_WORKER" | "ALL";

export interface IEventMessage {
    to: Process;
    from: Process;
    extensionName: "MOKKU";
    id?: number;
    type?: "LOG" | "NOTIFICATION" | "INIT" | "CHECK_MOCK";
    message: ILog | Record<string, any> | string | number;
    origin?: Process;
}
