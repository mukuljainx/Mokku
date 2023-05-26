import { match as getMatcher } from "path-to-regexp";
import {
  IDynamicURLMap,
  IMockResponse,
  IMockResponseRaw,
  IStore,
  IURLMap,
} from "../types";

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
  };
};

export const getDefaultStore = (): IStore => ({
  active: false,
  mocks: [],
  id: 1,
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
      const { urlMap, dynamicUrlMap } = getURLMap(store);

      resolve({
        store: store,
        urlMap: urlMap,
        dynamicUrlMap,
      });
    });
  });
};

export const updateStateStore = (
  action: "add" | "delete" | "edit" | "clear",
  newMock: IMockResponse,
  oldStore: IStore,
  options: { notify?: (x: string) => void; bulk?: boolean },
): { store: IStore; updated: boolean } => {
  const store = { ...oldStore };
  switch (action) {
    case "add": {
      // Find same mock
      const sameMockIndex = store.mocks.findIndex(
        (mock) => mock.url === newMock.url && mock.method === newMock.method,
      );
      if (sameMockIndex !== -1 && newMock.active) {
        // disable it silently if bulk is off
        // TODO: Test bulk
        if (!options.bulk) {
          store.mocks[sameMockIndex] = {
            ...store.mocks[sameMockIndex],
            active: false,
          };
        }
      }
      const id = store.id;
      const dynamic =
        newMock.url.includes("(.*)") || newMock.url.includes("/:");

      store.mocks = [...store.mocks, { ...newMock, dynamic, id }];
      store.id++;
      break;
    }

    case "edit": {
      const dynamic =
        newMock.url.includes("(.*)") || newMock.url.includes("/:");

      console.log("EDIT");

      const mockIndex = store.mocks.findIndex((item) => item.id === newMock.id);

      if (mockIndex === -1) {
        console.error("Mock not found");
        break;
      }
      // the mock status has been toggled from off to on
      // find the active mock with same url & method
      // and disable it
      let sameMockIndex = -1;
      if (newMock.active && !store.mocks[mockIndex].active) {
        sameMockIndex = store.mocks.findIndex(
          (mock) =>
            mock.url === newMock.url &&
            mock.method === newMock.method &&
            mock.active,
        );
      }

      store.mocks = store.mocks.map((item, index) => {
        if (index === sameMockIndex) {
          return {
            ...item,
            active: false,
          };
        } else if (item.id === newMock.id) {
          return {
            ...item,
            ...newMock,
            dynamic,
          };
        }
        return item;
      });
      break;
    }

    case "delete": {
      store.mocks = store.mocks.filter((item) => item.id !== newMock.id);
      break;
    }
  }

  return { store, updated: true };
};

export const updateStore = (store: IStore) => {
  return new Promise<{ store: IStore; urlMap: IURLMap; dynamicUrlMap }>(
    (resolve, reject) => {
      try {
        chrome.storage.local.set({ [storeName]: store }, () => {
          const { dynamicUrlMap, urlMap } = getURLMap(store);
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

export const getURLMap = (store: IStore) => {
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
