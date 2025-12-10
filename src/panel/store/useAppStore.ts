import { create } from "zustand";
import { IErrorData } from "../../types";
import { createSelectors } from "@/utils/store";

interface AppState {
    host: string;
    setHost: (host: string) => void;
    tab: chrome.tabs.Tab | null;
    setTab: (tab: chrome.tabs.Tab | null) => void;
    error: IErrorData | null;
    setError: (error: IErrorData | null) => void;
    active?: boolean;
    setActive: (active: boolean) => void;
    loading?: boolean;
    setLoading: (loading: boolean) => void;
}

const useAppStoreBase = create<AppState>((set) => ({
    host: "",
    setHost: (host: string) => set({ host }),
    tab: null,
    setTab: (tab: chrome.tabs.Tab | null) => set({ tab }),
    error: null,
    setError: (error: IErrorData | null) => set({ error }),
    active: false,
    setActive: (active: boolean) => set({ active }),
    loading: false,
    setLoading: (loading: boolean) => set({ loading }),
}));

export const useAppStore = createSelectors(useAppStoreBase);
