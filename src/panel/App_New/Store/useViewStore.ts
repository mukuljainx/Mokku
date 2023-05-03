import { create } from "zustand";

export enum ViewEnum {
  MOCKS = "MOCKS",
  LOGS = "LOGS",
}

export type useViewStoreState = {
  view: "MOCKS" | "LOGS";
  setView: (view: ViewEnum) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const useViewStore = create<useViewStoreState>((set, get) => ({
  //   setGraph: (fn) => {
  //     const { nodes, edges } = fn(get().nodes, get().edges);
  //     set({ nodes, edges });
  //   },
  view: ViewEnum.LOGS,
  setView: (view: ViewEnum) => set({ view: view }),
}));

export const viewSelector = (state: useViewStoreState) => ({
  view: state.view,
  setView: state.setView,
});
