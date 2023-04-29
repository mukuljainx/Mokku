import { create } from "zustand";

export enum ViewEnum {
  MOCKS = "MOCKS",
  LOGS = "LOGS",
}

export type useViewStoreState = {
  searchText: string;
  mocks: any[];
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const useMockStore = create<useViewStoreState>((set, get) => ({
  searchText: "",
  mocks: [],
}));

export const viewSelector = (state: useViewStoreState) => ({});
