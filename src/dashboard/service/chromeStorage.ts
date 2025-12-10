type LocalStorageKeyValue = {
    sideBarOpen: boolean;
    activeTabsMinimized: boolean | null;
    isLoggedIn: boolean;
};

const get = <T extends keyof LocalStorageKeyValue>(
    k: T,
): Promise<LocalStorageKeyValue[T] | undefined> => {
    return chrome.storage?.local.get(k).then((value) => value[k]);
};

const getMany = <T extends keyof LocalStorageKeyValue>(
    k: T[],
): Promise<Record<T, LocalStorageKeyValue[T] | undefined>> => {
    return chrome.storage?.local
        .get(k)
        .then(
            (value) => value as Record<T, LocalStorageKeyValue[T] | undefined>,
        );
};

const remove = <T extends keyof LocalStorageKeyValue>(k: T) => {
    return chrome.storage?.local.remove(k);
};

const set = <K extends keyof LocalStorageKeyValue>(
    k: K,
    data: LocalStorageKeyValue[K],
) => {
    return chrome.storage?.local.set({ [k]: data });
};

const extension = { get, set, remove, getMany };

const browser = {
    get: <T extends keyof LocalStorageKeyValue>(
        k: T,
    ): Promise<LocalStorageKeyValue[T] | undefined> => {
        const value = localStorage.getItem(k);
        return Promise.resolve(value ? JSON.parse(value) : undefined);
    },

    getMany: <T extends keyof LocalStorageKeyValue>(
        k: T[],
    ): Promise<Record<T, LocalStorageKeyValue[T] | undefined>> => {
        const result = {} as Record<T, LocalStorageKeyValue[T] | undefined>;
        k.forEach((key) => {
            const value = localStorage.getItem(key);
            result[key] = value ? JSON.parse(value) : undefined;
        });
        return Promise.resolve(result);
    },

    remove: <T extends keyof LocalStorageKeyValue>(k: T) => {
        localStorage.removeItem(k);
        return Promise.resolve();
    },

    set: <K extends keyof LocalStorageKeyValue>(
        k: K,
        data: LocalStorageKeyValue[K],
    ) => {
        localStorage.setItem(k, JSON.stringify(data));
        return Promise.resolve();
    },
};

export const chromeStorage = chrome?.storage ? extension : browser;
