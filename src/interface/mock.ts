export interface IResponse {
  status: number;
  response?: Record<string, any> | string;
  delay?: number;
  actions: (req: {
    body: Record<string, any>;
    params: Record<string, any>;
    queryParams: Record<string, any>;
  }) => IMock["response"];
}

export interface IMock {
  [url: string]: {
    [method: string]: IResponse;
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

/**
 * host -> {
 *  mocks: IMOCK[]
 *  collections: {
 *      app1: {
 *          mocks: IMOCK[]
 *      },
 *      app2: IMOCK[],
 *   }
 * }
 */
