import { IStore, DBNameType } from "../interface/mock";
import { IMethod } from "../interface/network";

export const getDefultStore = (): IStore => ({
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
