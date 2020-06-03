import { IMethod } from "./network";

export interface ILog {
  request?: {
    url: string;
    method: string;
  };
  response?: {
    status: number;
    response: string;
  };
  mockResponse?: IMockResponse;
  id?: number;
  isMocked?: boolean;
}

export interface IMockResponse {
  method: IMethod;
  createdOn: number;
  url: string;
  status: number;
  response?: string;
  delay?: number;
  id: number;
  active: boolean;
  action?: (req: {
    body: Record<string, any>;
    params: Record<string, any>;
    queryParams: Record<string, any>;
  }) => IMockResponse["response"];
}

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

export type DBNameType = "moku.extension.main.db";

export type IDB = Record<DBNameType, IStore>;
