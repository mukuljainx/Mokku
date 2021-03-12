import { match as getMatcher } from "path-to-regexp";

import {
  IDynamicURLMap,
  IMockResponse,
  IStore,
  IURLMap,
} from "../../interface/mock";
import { getNetworkMethodMap } from "../constants";

const storeName = "mokku.extension.main.db";

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
  options: { notify?: (x: string) => void; bulk?: boolean }
) => {
  const store = { ...oldStore };

  switch (action) {
    case "add": {
      const sameMock = !!store.mocks.find(
        (mock) => mock.url === newMock.url && mock.method === newMock.method
      );
      if (sameMock) {
        if (!options.bulk && options.notify) {
          options.notify("Mock already exist");
        }
        return;
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
      store.mocks = store.mocks.map((item) =>
        item.id === newMock.id
          ? {
              ...item,
              ...newMock,
              dynamic,
            }
          : item
      );
      break;
    }

    case "delete": {
      store.mocks = store.mocks.filter((item) => item.id !== newMock.id);
      break;
    }
  }

  return store;
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
    }
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
