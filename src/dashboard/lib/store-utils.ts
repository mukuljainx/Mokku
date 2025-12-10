import type { StoreApi, UseBoundStore } from "zustand";

type WithSelectors<S> = S extends { getState: () => infer T }
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
    _store: S,
) => {
    const store = _store as WithSelectors<typeof _store>;
    store.use = {};
    for (const k of Object.keys(store.getState())) {
        // @ts-expect-error we don't know the type
        (store.use as unknown)[k] = () => store((s) => s[k as keyof typeof s]);
    }

    return store;
};

export interface LoadingState {
    loading?: boolean;
    setLoading: (x: boolean) => void;
}

export interface ErrorState {
    error?: string | null;
    setError: (x: ErrorState["error"]) => void;
}
