import { create } from "zustand";
import { ILog } from "@mokku/types";

export type useLogStoreState = {
  search: string;
  logs: ILog[];
  addLog: (log: ILog) => void;
  updateLog: (log: ILog) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const useLogStore = create<useLogStoreState>((set, get) => ({
  search: "",
  logs: [],
  addLog: (log: ILog) => {
    set({
      logs: [...get().logs, log],
    });
  },
  updateLog: (log: ILog) => {
    set({
      logs: get().logs.map((item) => (item.id === log.id ? log : item)),
    });
  },
}));
