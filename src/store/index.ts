import { IMockResponse, IStore, IURLMap } from "../interface/mock";
import { getNetworkMethodMap } from "../services/constants";

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

      store.mocks = [...store.mocks, { ...newMock, id }];
      store.id++;
      break;
    }

    case "edit": {
      store.mocks = store.mocks.map((item) =>
        item.id === newMock.id
          ? {
              ...item,
              ...newMock,
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
