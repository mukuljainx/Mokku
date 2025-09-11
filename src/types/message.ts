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

export enum MESSAGE_TYPE {
    LOG = "LOG",
    CHECK_MOCK = "CHECK_MOCK",
    MOKKU_ACTIVATED = "MOKKU_ACTIVATED",
    LOG_MOCK_STATUS = "LOG_MOCK_STATUS",
    INIT = "INIT",
    ERROR = "ERROR",
}

export type MessageType = {
    HOOK: MESSAGE_TYPE.CHECK_MOCK | MESSAGE_TYPE.LOG | MESSAGE_TYPE.ERROR;
    CONTENT:
        | MESSAGE_TYPE.LOG
        | MESSAGE_TYPE.CHECK_MOCK
        | MESSAGE_TYPE.MOKKU_ACTIVATED;
    PANEL: MESSAGE_TYPE.LOG_MOCK_STATUS | MESSAGE_TYPE.LOG | MESSAGE_TYPE.INIT;
    SERVICE_WORKER: MESSAGE_TYPE.CHECK_MOCK;
    APP_SCRIPT: APP_MESSAGE_TYPE;
    APP: APP_MESSAGE_TYPE;
};

export interface IMessage<T = unknown> {
    type: string;
    data?: T;
    messageId?: number | string;
    // repliedToId?: number | string;
    extensionName?: "MOKKU";
    _mokku?: {
        // for debugging purposes
        destination: Process;
        source: Process;
    };
}
