import {
    createSelectors,
    type ErrorState,
    type LoadingState,
} from "@/dashboard/lib";
import type { IMock } from "@/dashboard/types";
import { create } from "zustand";

export interface useMockStore extends LoadingState, ErrorState {
    mocks: IMock[];
}

export const useMockStoreBase = create<useMockStore>()((set) => ({
    setLoading: (x) => set({ loading: x }),
    setError: (x) => set({ error: x }),
    error: "",
    loading: true,
    mocks: [],
    setMocks: (mocks: IMock[]) => set({ mocks }),
}));

export const useMockStore = createSelectors(useMockStoreBase);
