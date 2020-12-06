import { IStore, DBNameType, IURLMap } from "../interface/mock";
import { IMethod } from "../interface/network";

const storeName = "mokku.extension.main.db";

export const getDefaultStore = (): IStore => ({
  active: false,
  mocks: [],
  id: 1,
  collections: {},
});

export const getStore = (name = storeName) => {
  let store;
  let urlMap;
  return new Promise<{ store: IStore; urlMap: IURLMap }>((resolve) => {
    chrome.storage.local.get([name], function (result) {
      store = result[name] || getDefaultStore();
      urlMap = getURLMap(store);
      resolve({ store: store as IStore, urlMap: urlMap as IURLMap });
    });
  });
};

export const updateStore = (store: IStore) => {
  return new Promise<{ store: IStore; urlMap: IURLMap }>((resolve, reject) => {
    try {
      chrome.storage.local.set({ [storeName]: store }, () => {
        resolve({
          store: store as IStore,
          urlMap: getURLMap(store) as IURLMap,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getNetworkMethodList = (): IMethod[] => [
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
];

export const getNetworkMethodMap = () => ({
  GET: null,
  POST: null,
  PATCH: null,
  PUT: null,
  DELETE: null,
});

export const getURLMap = (store: IStore) => {
  const urlMap: IURLMap = {};
  store.mocks.forEach((mock, index) => {
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

  return urlMap;
};
