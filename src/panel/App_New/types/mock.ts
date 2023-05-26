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
  };
  response?: {
    status: number;
    response: string;
    headers: Headers;
  };
  mockResponse?: IMockResponse;
  id: number | string;
  // if the API response is mocked
  isMocked?: boolean;
  // will be used to fetch mock from store
  mockPath?: string;
}

export interface IMockResponse {
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
  }) => IMockResponse["response"];
}

export type IMockResponseRaw = Partial<IMockResponse>;

export interface IStore {
  active: boolean;
  mocks: IMockResponse[];
  id: number;
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
    [method: string]: string;
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
