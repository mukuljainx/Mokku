import { IMethod, IMock } from "@/types";
import { localDb } from "./";
import { StoredMock } from "./dbInit";

export interface DynamicUrlEntry {
    localId: number;
    urlPattern: string; // The URL pattern stored for dynamic matching
}

const getDynamicUrlPatterns = async (): Promise<DynamicUrlEntry[]> => {
    const activeDynamicMocks = await localDb.mocks
        .where({ dynamicKey: 1 }) // Uses the 'dynamic' index
        // .filter((mock) => mock.active === true) // Ensure only active mocks are considered
        .toArray();

    return activeDynamicMocks.map((mock) => ({
        localId: mock.localId!, // localId is guaranteed by Dexie after retrieval
        urlPattern: mock.url,
    }));
};

const getSortedMockByActive = (mocks: StoredMock[]) =>
    mocks.sort((a, b) => (b.active ? 1 : 0) - (a.active ? 1 : 0));

const findGraphQLMocks = async ({
    url,
    operationName,
}: {
    url: string;
    operationName: string;
}): Promise<StoredMock[] | undefined> => {
    const mocks = await localDb.mocks.where({ url, operationName }).toArray();
    return getSortedMockByActive(mocks);
};

const findStaticMocks = async (
    url: string,
    method: IMethod, // Original function signature included method, but query didn't use it.
    // If method matching is needed, add 'method: method' to where clause.
): Promise<StoredMock[] | undefined> => {
    // Find active, non-dynamic mocks matching the URL.
    // This query uses the [url+dynamic] compound index.
    const mocks = await localDb.mocks
        .where({ url, dynamicKey: 0, method })
        .toArray();
    return getSortedMockByActive(mocks);
};

const getAllMocks = async (): Promise<StoredMock[]> => {
    return localDb.mocks.toArray();
};

const findMockById = async (
    localId: number,
): Promise<StoredMock | undefined> => {
    return localDb.mocks.get(localId);
};

const addMock = async (mockData: IMock): Promise<number | undefined> => {
    const storedMock: StoredMock = {
        ...mockData, // Spread
        dynamicKey: mockData.dynamic ? 1 : 0,
        activeKey: mockData.active ? 1 : 0,
    };

    return localDb.mocks.add(storedMock);
};

const _deleteAll = async (): Promise<void> => {
    await localDb.mocks.clear();
};

export const mocksDb = {
    getDynamicUrlPatterns,
    findStaticMocks,
    findMockById,
    addMock,
    getAllMocks,
    findGraphQLMocks,
    _deleteAll,
};
