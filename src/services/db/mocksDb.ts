import { IMethod, IMock, IMockCreate } from "@/types";
import { localDb } from "./";
import { StoredMock } from "./dbInit";
import { filterCollectionByQuery } from "@/scripts/utils";
import { Collection } from "dexie";

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
    method: IMethod // Original function signature included method, but query didn't use it.
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
    localId: number
): Promise<StoredMock | undefined> => {
    return localDb.mocks.get(localId);
};

const updateMock = async (localId: number, updates: Partial<StoredMock>) => {
    await localDb.mocks.update(localId, updates);
};

const createMock = async (mockData: IMock): Promise<IMock> => {
    const storedMock: StoredMock = {
        ...mockData, // Spread
        dynamicKey: mockData.dynamic ? 1 : 0,
        activeKey: mockData.active ? 1 : 0,
    };

    const mockId = await localDb.mocks.add(storedMock);
    await updateMock(mockId, { id: mockId });

    return {
        ...storedMock,
        id: mockId,
        localId: mockId,
    };
};

const _deleteAll = async (): Promise<void> => {
    await localDb.mocks.clear();
};

export const getMocks = async ({
    page,
    limit,
    active,
    dynamic,
    search,
    projectId,
}: {
    page: number;
    limit: number;
    active?: boolean;
    dynamic?: boolean;
    search?: string;
    projectId: string;
}) => {
    try {
        let collection = localDb.mocks.orderBy("localId").reverse();

        collection = filterCollectionByQuery(collection, {
            projectId,
            ...(active !== undefined ? { activeKey: active ? 1 : 0 } : {}),
            ...(dynamic !== undefined ? { dynamicKey: dynamic ? 1 : 0 } : {}),
        }) as typeof collection;

        if (search) {
            const lowerCaseSearch = search.toLowerCase();
            collection = collection.filter((mock) =>
                Boolean(
                    mock.name?.toLowerCase().includes(lowerCaseSearch) ||
                        mock.url?.toLowerCase().includes(lowerCaseSearch)
                )
            );
        }

        const filteredMocksCount = await collection.count();

        const filteredMocks = await collection
            .offset(page * limit)
            .limit(limit)
            .toArray();

        const data = filteredMocks.map(
            ({ dynamicKey: _d, activeKey: _a, ...storedMock }) => ({
                ...storedMock,
            })
        );

        return {
            mocks: data,
            total: filteredMocksCount,
        };
    } catch (error) {
        return { error };
    }
};

export const mocksDb = {
    getDynamicUrlPatterns,
    findStaticMocks,
    findMockById,
    createMock,
    getAllMocks,
    findGraphQLMocks,
    _deleteAll,
    getMocks,
};
