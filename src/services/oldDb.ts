import { IDynamicURLMap, IMockResponse, IStore, IURLMap } from "@/types";

const storeName = "mokku.extension.main.db";

export const getDefaultStore = (): IStore => ({
    theme: "light",
    active: false,
    mocks: [],
    totalMocksCreated: 0,
    collections: {},
    activityInfo: {
        promoted: false,
    },
    isMigrated: false,
});

export const getStore = (name = storeName) => {
    return new Promise<{
        store: IStore;
    }>((resolve) => {
        chrome.storage.local.get([name], function (result) {
            const store = { ...getDefaultStore(), ...result[name] } as IStore;

            resolve({
                store,
            });
        });
    });
};

export const addMocks = (
    oldStore: IStore,
    dirtyNewMock: IMockResponse | IMockResponse[],
) => {
    const store = { ...oldStore };

    // standardize mock
    const newMocks = Array.isArray(dirtyNewMock)
        ? dirtyNewMock
        : [dirtyNewMock];

    newMocks.forEach((mock) => {
        const dynamic = mock.url.includes("(.*)") || mock.url.includes("/:");
        store.mocks = [...store.mocks, { ...mock, dynamic }];
        store.totalMocksCreated++;
    });

    return store;
};

export const setIsMigrated = () => {
    getStore().then(({ store }) => {
        const newStore = { ...store, isMigrated: true };
        chrome.storage.local.set({ [storeName]: newStore }, () => {
            console.log("Mokku: Store migration completed");
        });
    });
};
