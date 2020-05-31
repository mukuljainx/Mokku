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
}

export interface IMockResponse {
  method: IMethod;
  url: string;
  status: number;
  response?: string;
  delay?: number;
  action?: (req: {
    body: Record<string, any>;
    params: Record<string, any>;
    queryParams: Record<string, any>;
  }) => IMock["response"];
}

export interface IMock {
  [url: string]: {
    [method: string]: IMockResponse;
  };
}

export interface IStore {
  active: boolean;
  mocks: IMock;
  collections: Record<
    string,
    {
      mocks: IMock;
      active: boolean;
    }
  >;
}

export type IDB = Record<string, IStore>;
