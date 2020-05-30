export interface IMock {
  status: number;
  response?: Record<string, any> | string;
  delay?: number;
  actions: (req: {
    body: Record<string, any>;
    params: Record<string, any>;
    queryParams: Record<string, any>;
  }) => IMock["response"];
}

export interface ICollection {
  url: {
    active: boolean;
    mocks: IMock[];
    collections: Record<
      string,
      {
        mocks: IMock[];
        active: boolean;
      }
    >;
  };
}

/**
 * url -> {
 *  mocks: IMOCK[]
 *  collections: {
 *      app1: {
 *          mocks: IMOCK[]
 *      },
 *      app2: IMOCK[],
 *   }
 * }
 */
