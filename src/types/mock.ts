export type IMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
export type Headers = Array<{ name: string; value: string }>;
type SyncStatus = "PENDING" | "SYNCING" | "SYNCED" | "FAILED";

export interface ILog {
    request?: {
        fullUrl: string;
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
    id: number;
    // if the API response is mocked
    // will be used to fetch mock from store
    mockPath?: string;
    // mock's id in in server
    mockId?: string;
    // mock's projectId in in server
    projectId?: string;
    // project local id

    //
    status?: "MOCKED" | "HEADERS_MODIFIED" | "XXX";

    headerData?: {
        localId: number;
        projectLocalId: number;
    };
    mockData?: {
        localId: number;
        projectLocalId: number;
    };
}

export interface IMock {
    createdAt: number;
    updatedAt?: number; // Optional, for tracking updates

    id: number;
    active: boolean;
    name: string;
    projectId: string;
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
}

export type IMockCreate = Partial<IMock>;
