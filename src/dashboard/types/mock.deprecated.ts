import type { IMethod } from "./mock";

export interface IMockResponse_Deprecated {
    name: string;
    method: IMethod;
    createdOn: number;
    url: string;
    status: number;
    response?: string;
    headers?: Headers;
    delay?: number;
    id: number;
    dynamic?: boolean;
    active: boolean;
    description: string;
    action?: (req: {
        body: Record<string, unknown>;
        params: Record<string, unknown>;
        queryParams: Record<string, unknown>;
    }) => IMockResponse_Deprecated["response"];
}
