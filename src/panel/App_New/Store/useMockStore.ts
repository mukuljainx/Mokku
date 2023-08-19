import { IStore, IURLMap, IDynamicURLMap, IMockResponse } from "@mokku/types";
import { getStore, getDefaultStore } from "../service/storeActions";
import { create } from "zustand";

export type StoreProperties = {
  store: IStore;
  urlMap: IURLMap;
  dynamicUrlMap: IDynamicURLMap;
};

export interface useChromeStoreState extends StoreProperties {
  init: () => void;
  setStoreProperties: (properties: StoreProperties) => void;
  selectedMock?: IMockResponse;
  setSelectedMock: (mock?: Partial<IMockResponse>) => void;
}

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const useChromeStore = create<useChromeStoreState>((set, get) => ({
  store: getDefaultStore(),
  dynamicUrlMap: {},
  urlMap: {},
  init: async () => {
    const { dynamicUrlMap, store, urlMap } = await getStore();
    console.log(811, store);
    set({ dynamicUrlMap, store, urlMap });
  },
  setStoreProperties: ({ dynamicUrlMap, store, urlMap }) => {
    set({ dynamicUrlMap, store, urlMap });
  },
  selectedMock: undefined,
  setSelectedMock: (mock?: IMockResponse) => {
    set({ selectedMock: mock });
  },
}));
