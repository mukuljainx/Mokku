export type Process =
    | "HOOK"
    | "CONTENT"
    | "PANEL"
    | "ALL"
    | "SERVICE_WORKER"
    | "PANEL"
    | "APP"
    | "APP_SCRIPT";

export type APP_MESSAGE_TYPE =
    | "APP_CONNECTED"
    | "NEW_MOCK"
    | "MIGRATE_MOCKS"
    | "ADD_EDIT_MOCK";

export interface IMessage {
    type: string;
    data?: unknown;
    id?: number | string;
    // repliedToId?: number | string;
    extensionName?: "MOKKU";
    _mokku?: {
        // for debugging purposes
        destination: Process;
        source: Process;
    };
}

export interface IMessageErrorData {
    isError: true;
    error: { message: string; code: number };
}
