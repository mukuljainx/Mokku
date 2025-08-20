import { ILog } from "./mock";

export type Process =
    | "HOOK"
    | "CONTENT"
    | "PANEL"
    | "SERVICE_WORKER"
    | "APP_SCRIPT"
    | "APP";

export type APP_MESSAGE_TYPE =
    | "APP_CONNECTED"
    | "NEW_MOCK"
    | "MIGRATE_MOCKS"
    | "ADD_EDIT_MOCK";

export type Tunnel = "WINDOW" | "RUNTIME";

export type MessageType = {
    HOOK: "CHECK_MOCK" | "LOG";
    CONTENT: "LOG" | "CHECK_MOCK" | "MOKKU_ACTIVATED";
    PANEL: "LOG_MOCK_STATUS" | "LOG" | "INIT";
    SERVICE_WORKER: "CHECK_MOCK";
    APP_SCRIPT: APP_MESSAGE_TYPE;
    APP: APP_MESSAGE_TYPE;
};

export interface IMessage<T extends Process, U = unknown> {
    type: MessageType[T];
    data?: U;
    messageId?: number;
}
