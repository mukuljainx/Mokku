import { ILog } from "./mock";

export type Process = "HOOK" | "CONTENT" | "PANEL" | "SERVICE_WORKER" | "ALL";

export type APP_MESSAGE_TYPE =
    | "APP_CONNECTED"
    | "NEW_MOCK"
    | "MIGRATE_MOCKS"
    | "ADD_EDIT_MOCK";

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
        | "MOKKU_ACTIVATED"
        | APP_MESSAGE_TYPE;
    message: ILog | Record<string, any> | string | number;
    origin?: Process;
}
