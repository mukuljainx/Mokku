import { IMethod } from "./network";

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
  id?: number;
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
  active: boolean;
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
