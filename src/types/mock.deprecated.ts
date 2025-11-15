import { IMethod } from "./mock";

export interface ILog_Deprecated {
    request?: {
        url: string;
        method: IMethod;
        body?: string;
        queryParams?: string;
        headers: Headers;
    };
    response?: {
        status: number;
        response: string;
        headers: Headers;
    };
    mockResponse?: IMockResponse_Deprecated;
    id?: number;
    // if the API response is mocked
    isMocked?: boolean;
    // will be used to fetch mock from store
    mockPath?: string;
}

export interface IMockResponse_Deprecated {
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
        body: Record<string, any>;
        params: Record<string, any>;
        queryParams: Record<string, any>;
    }) => IMockResponse_Deprecated["response"];
}

export type IMockResponseRaw_Deprecated = Partial<IMockResponse_Deprecated>;

export interface IStore {
    theme: "light" | "dark";
    active: boolean;
    mocks: IMockResponse_Deprecated[];
    totalMocksCreated: number;
    id: number;
    activityInfo: {
        promoted: boolean;
    };
    collections: Record<
        string,
        {
            mocks: IMockResponse_Deprecated[];
            id: number;
            active: boolean;
        }
    >;
    isMigrated?: boolean; // Indicates if the store has been migrated to the new schema
}

export type DBNameType = "mokku.extension.main.db";

export type IDB = Record<DBNameType, IStore>;

export interface IURLMap {
    [url: string]: {
        [method: string]: string;
    };
}

export interface IDynamicURLMap {
    [urlLength: number]: Array<{
        match: (
            s: string
        ) => boolean | { path: string; params: Record<string, string> };
        method: string;
        getterKey: string;
        url: string;
    }>;
}
