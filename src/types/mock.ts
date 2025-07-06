export type IMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export enum MethodEnum {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    PUT = "PUT",
    DELETE = "DELETE",
}

export enum MockStatusEnum {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

export type Headers = Array<{ name: string; value: string }>;

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
    mockResponse?: IMockResponse;
    id: number;
    // if the API response is mocked
    isMocked?: boolean;
    // will be used to fetch mock from store
    mockPath?: string;
    // mock's id in in server
    mockId?: string;
    // mock's projectId in in server
    projectId?: string;
}

export interface IMockResponse {
    localId?: number;
    method: IMethod;
    createdOn: number;
    url: string;
    status: number;
    response?: string;
    headers?: Headers;
    delay?: number;
    name?: string;
    id: string;
    projectId?: string;
    responseType?: "STATIC" | "FUNCTION";
    function?: string;
    dynamic?: boolean;
    active: boolean;
    description: string;
    responseBodyType?: "json" | "text" | "xml" | "html" | "binary";
}

export type IMockResponseRaw = Partial<IMockResponse>;

export interface IStore {
    active: boolean;
    theme: "dark" | "light";
    mocks: IMockResponse[];
    totalMocksCreated: number;
    activityInfo: {
        promoted: boolean;
    };
    collections: Record<
        string,
        {
            mocks: IMockResponse[];
            id: number;
            active: boolean;
        }
    >;
}

export type DBNameType = "mokku.extension.main.db";

export type IDB = Record<DBNameType, IStore>;

export interface IURLMap {
    [url: string]: {
        [method: string]: string[];
    };
}

export interface IDynamicURLMap {
    [urlLength: number]: Array<{
        match: (
            s: string,
        ) => boolean | { path: string; params: Record<string, string> };
        method: string;
        getterKey: string;
        url: string;
    }>;
}
