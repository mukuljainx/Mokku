import { create } from "zustand";

export type useMockStoreState = {
  searchText: string;
  mocks: any[];
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const useMockStore = create<useMockStoreState>((set, get) => ({
  searchText: "",
  mocks: [],
}));
