import type { SyncStatus } from "./common";

export type IMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
export type Headers = Array<{ name: string; value: string }>;

export interface IMock {
    createdAt: number;
    updatedAt?: number; // Optional, for tracking updates

    id: number;
    active: boolean;
    name: string;
    projectId: number;
    description?: string;
    dynamic?: boolean;

    requestType: "GRAPHQL" | "REST";
    method: IMethod;
    url: string;
    operationName?: string;

    responseType: "STATIC" | "FUNCTION";
    responseBodyType?: "json" | "text" | "xml" | "html" | "binary";
    response?: string;
    status: number;
    headers?: Headers;
    delay?: number;

    function?: string;

    localId: number;
    projectLocalId: number;
    syncStatus: SyncStatus;

    // app states
    isUpdating?: boolean;
}

export interface ILog {
    request?: {
        url: string;
        method: IMethod;
        body?: string;
        queryParams?: string;
        headers: Headers;
        time: number;
    };
    response?: {
        status: number;
        response: string;
        headers: Headers;
        time: number;
    };
    mockResponse?: IMock;
    id?: number;
    // if the API response is mocked
    isMocked?: boolean;
    // will be used to fetch mock from store
    mockPath?: string;
    projectId?: number;
}

export type IMockCreate = Partial<IMock>;
