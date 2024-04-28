import { create } from "zustand";
import { ILog } from "@mokku/types";

export type useLogStoreState = {
  logs: ILog[];
  addLog: (log: ILog) => void;
  updateLog: (log: ILog) => void;
  upsertLog: (log: ILog) => void;
  clearLogs: () => void;
  selectedLog?: ILog;
  setSelectedLog: (log?: ILog) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const useLogStore = create<useLogStoreState>((set, get) => ({
  logs: [],
  addLog: (log: ILog) => {
    set({
      logs: [log, ...get().logs],
    });
  },
  updateLog: (log: ILog) => {
    set({
      logs: get().logs.map((item) => (item.id === log.id ? log : item)),
    });
  },
  upsertLog: (log: ILog) => {
    const logExist = get().logs.find(({ id }) => id === log.id);
    if (logExist) {
      set({
        logs: get().logs.map((item) => (item.id === log.id ? log : item)),
      });
    } else {
      set({
        logs: [log, ...get().logs],
      });
    }
  },
  clearLogs: () => {
    set({ logs: [] });
  },
  selectedLog: undefined,
  setSelectedLog: (log?: ILog) => {
    set({ selectedLog: log });
  },
}));
