import { IStore, DBNameType, IURLMap } from "../interface/mock";
import { IMethod } from "../interface/network";

export const getDefaultStore = (): IStore => ({
  active: false,
  mocks: [],
  id: 0,
  collections: {},
});

export const updateStore = (store: IStore) => {
  return new Promise((reslove, reject) => {
    const key: DBNameType = "moku.extension.main.db";
    try {
      chrome.storage.local.set({ [key]: store }, () => {
        reslove(store);
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
