import { IMessage } from "@/types";

export type OperationHandler = (
    message: IMessage,
    postMessage: (message: IMessage) => void,
) => void;

export type OperationHandlers = Record<string, OperationHandler> & {
    init?: () => Promise<void>;
};
