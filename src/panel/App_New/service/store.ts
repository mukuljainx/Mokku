import { match as getMatcher } from "path-to-regexp";
import {
  IDynamicURLMap,
  IMockResponse,
  IMockResponseRaw,
  IStore,
  IURLMap,
} from "@mokku/types";

const getNetworkMethodMap = () => ({
  GET: null,
  POST: null,
  PATCH: null,
  PUT: null,
  DELETE: null,
});

const storeName = "mokku.extension.main.db";

export const createMock = (mock: IMockResponseRaw) => {
  return {
    createdOn: new Date().getTime(),
    method: mock.method,
    url: mock.url,
    status: mock.status || 200,
    response: mock.response || "",
    headers: mock.headers || [],
    delay: mock.delay,
    id: mock.id,
    dynamic: mock.dynamic,
    active: mock.active,
    description: mock.description,
    name: mock.name,
  };
};

export const getDefaultStore = (): IStore => ({
  active: false,
  mocks: [],
  totalMocksCreated: 0,
  collections: {},
  activityInfo: {
    promoted: false,
  },
});

export const getStore = (name = storeName) => {
  return new Promise<{
    store: IStore;
    urlMap: IURLMap;
    dynamicUrlMap: IDynamicURLMap;
  }>((resolve) => {
    chrome.storage.local.get([name], function (result) {
      const store = { ...getDefaultStore(), ...result[name] } as IStore;
      const { urlMap, dynamicUrlMap } = getURLMapWithStore(store);

      resolve({
        store: store,
        urlMap: urlMap,
        dynamicUrlMap,
      });
    });
  });
};

export const updateStoreInDB = (store: IStore) => {
  return new Promise<{ store: IStore; urlMap: IURLMap; dynamicUrlMap }>(
    (resolve, reject) => {
      try {
        chrome.storage.local.set({ [storeName]: store }, () => {
          const { dynamicUrlMap, urlMap } = getURLMapWithStore(store);
          resolve({
            store: store as IStore,
            urlMap: urlMap,
            dynamicUrlMap: dynamicUrlMap,
          });
        });
      } catch (error) {
        reject(error);
      }
    },
  );
};

export const getURLMapWithStore = (store: IStore) => {
  const urlMap: IURLMap = {};
  const dynamicUrlMap: IDynamicURLMap = {};

  store.mocks.forEach((mock, index) => {
    if (mock.dynamic) {
      const url = mock.url.replace("://", "-");
      const key = url.split("/").length;
      const matcher: IDynamicURLMap[number][0] = {
        getterKey: `mocks[${index}]`,
        method: mock.method,
        url: url,
        match: getMatcher(url, { decode: window.decodeURIComponent }),
      };
      if (dynamicUrlMap[key]) {
        dynamicUrlMap[key].push(matcher);
      } else {
        dynamicUrlMap[key] = [matcher];
      }
      return;
    }
    if (!urlMap[mock.url]) {
      urlMap[mock.url] = getNetworkMethodMap();
    }

    if (urlMap[mock.url]) {
      urlMap[mock.url][mock.method] = `mocks[${index}]`;
    }
  });

  Object.keys(store.collections).forEach((collection) => {
    const mocks = store.collections[collection].mocks;
    mocks.forEach((mock, index) => {
      if (!urlMap[mock.url]) {
        urlMap[mock.url] = getNetworkMethodMap();
      }

      if (urlMap[mock.url]) {
        urlMap[mock.url][mock.method] = `${collection}.mocks[${index}]`;
      }
    });
  });

  return { urlMap, dynamicUrlMap, store };
};

export const addMocks = (
  oldStore: IStore,
  dirtyNewMock: IMockResponse | IMockResponse[],
) => {
  const store = { ...oldStore };

  // standardize mock
  const newMocks = Array.isArray(dirtyNewMock) ? dirtyNewMock : [dirtyNewMock];

  newMocks.forEach((mock) => {
    const dynamic = mock.url.includes("(.*)") || mock.url.includes("/:");
    store.mocks = [...store.mocks, { ...mock, dynamic }];
    store.totalMocksCreated++;
  });

  return store;
};

type PartialMockWithId = { id: IMockResponse["id"] } & Partial<IMockResponse>;
export const updateMocks = (
  oldStore: IStore,
  dirtyNewMock: PartialMockWithId | Array<PartialMockWithId>,
) => {
  const store = { ...oldStore };

  // standardize mock
  const newMocks = Array.isArray(dirtyNewMock) ? dirtyNewMock : [dirtyNewMock];

  const newMocksMap: Record<string, PartialMockWithId> = {};
  newMocks.forEach((mock) => {
    newMocksMap[mock.id] = mock;
  });

  const newStoreMocks = store.mocks.map((storeMock) => {
    const mockToBeUpdated = newMocksMap[storeMock.id];
    if (mockToBeUpdated) {
      const dynamic =
        mockToBeUpdated.url.includes("(.*)") ||
        mockToBeUpdated.url.includes("/:");
      return { ...storeMock, ...mockToBeUpdated, dynamic };
    } else {
      return storeMock;
    }
  });

  store.mocks = newStoreMocks;
  return { ...store, mocks: newStoreMocks };
};

export const deleteMocks = (
  draftStore: IStore,
  dirtyMockId: string | string[],
) => {
  const mockIdsSet = Array.isArray(dirtyMockId)
    ? new Set(dirtyMockId)
    : new Set([dirtyMockId]);

  const mocks = draftStore.mocks.filter((mock) => {
    if (mockIdsSet.has(mock.id)) {
      return false;
    }
    return true;
  });

  const store = {
    ...draftStore,
    mocks,
  };

  return store;
};
