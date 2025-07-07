import { ILog } from "./mock";

export type Process = "HOOK" | "CONTENT" | "PANEL" | "SERVICE_WORKER" | "ALL";

export interface IEventMessage {
    to: Process;
    from: Process;
    extensionName: "MOKKU";
    id?: number;
    type?:
        | "LOG"
        | "NOTIFICATION"
        | "INIT"
        | "CHECK_MOCK"
        | "LOG_MOCK_STATUS"
        | "MOKKU_ACTIVATED";
    message: ILog | Record<string, any> | string | number;
    origin?: Process;
}
