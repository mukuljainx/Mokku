import { create } from "zustand";

export enum ViewEnum {
  MOCKS = "MOCKS",
  LOGS = "LOGS",
}

export type useGlobalStoreState = {
  view: "MOCKS" | "LOGS";
  setView: (view: ViewEnum) => void;
  search: string;
  setSearch: (search: string) => void;
  recording: boolean;
  toggleRecording: () => void;
  meta: {
    host: string;
    tab?: chrome.tabs.Tab;
    active: boolean;
    storeKey: string;
  };
  setMeta: (meta: useGlobalStoreState["meta"]) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const useGlobalStore = create<useGlobalStoreState>((set, get) => ({
  view: ViewEnum.MOCKS,
  setView: (view: ViewEnum) => set({ view: view }),
  search: "",
  setSearch: (search: string) => set({ search: search }),
  toggleRecording: () => set({ recording: !get().recording }),
  recording: false,
  meta: {
    active: false,
    host: "",
    storeKey: "",
  },
  setMeta: (meta) => set({ meta: meta }),
}));
