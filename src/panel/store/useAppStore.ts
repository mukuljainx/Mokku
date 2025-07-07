import { create } from "zustand";

interface AppState {
    host: string;
    setHost: (host: string) => void;
    tab: chrome.tabs.Tab | null;
    setTab: (tab: chrome.tabs.Tab | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
    host: "",
    setHost: (host: string) => set({ host }),
    tab: null,
    setTab: (tab: chrome.tabs.Tab | null) => set({ tab }),
}));
