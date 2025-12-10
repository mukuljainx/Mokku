import {
    createSelectors,
    type ErrorState,
    type LoadingState,
} from "@/dashboard/lib";
import { create } from "zustand";

export interface AppStoreState extends LoadingState, ErrorState {
    setIsConnected: (x: boolean) => void;
    isConnected: boolean;
}

export const useAppStoreBase = create<AppStoreState>()((set) => ({
    setLoading: (x) => set({ loading: x }),
    setError: (x) => set({ error: x }),
    error: "",
    loading: true,
    isConnected: false,
    setIsConnected: (x) => set({ isConnected: x }),
}));

export const useAppStore = createSelectors(useAppStoreBase);
