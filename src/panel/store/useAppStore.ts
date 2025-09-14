import { create } from "zustand";
import { IErrorData } from "../../types";

interface AppState {
    host: string;
    setHost: (host: string) => void;
    tab: chrome.tabs.Tab | null;
    setTab: (tab: chrome.tabs.Tab | null) => void;
    error: IErrorData | null;
    setError: (error: IErrorData | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
    host: "",
    setHost: (host: string) => set({ host }),
    tab: null,
    setTab: (tab: chrome.tabs.Tab | null) => set({ tab }),
    error: null,
    setError: (error: IErrorData | null) => set({ error }),
}));
