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
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const useGlobalStore = create<useGlobalStoreState>((set, get) => ({
  //   setGraph: (fn) => {
  //     const { nodes, edges } = fn(get().nodes, get().edges);
  //     set({ nodes, edges });
  //   },
  view: ViewEnum.MOCKS,
  setView: (view: ViewEnum) => set({ view: view }),
  search: "",
  setSearch: (search: string) => set({ search: search }),
  toggleRecording: () => set({ recording: !get().recording }),
  recording: false,
}));
