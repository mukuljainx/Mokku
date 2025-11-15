import { IMethod, IMock } from "@/types";
import { localDb } from "./";
import { StoredMock } from "./dbInit";
import { filterCollectionByQuery } from "@/scripts/utils";

const getDynamicUrlPatterns = async () => {
    const activeDynamicMocks = await localDb.mocks
        .where({ dynamicKey: 1 }) // Uses the 'dynamic' index
        // .filter((mock) => mock.active === true) // Ensure only active mocks are considered
        .toArray();

    return activeDynamicMocks.map((mock) => ({
        localId: mock.localId!, // localId is guaranteed by Dexie after retrieval
        urlPattern: mock.url,
        method: mock.method,
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
    const z = getSortedMockByActive(mocks);
    return z;
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
    const z = getSortedMockByActive(mocks);
    return z;
};

const getAllMocks = async (): Promise<StoredMock[]> => {
    return localDb.mocks.toArray();
};

const getMockByLocalId = async (
    localId: number
): Promise<StoredMock | undefined> => {
    return localDb.mocks.get(localId);
};

const updateMock = async (localId: number, updates: Partial<StoredMock>) => {
    // If 'dynamic' or 'active' are being updated, convert to keys
    if (updates.dynamic !== undefined) {
        updates.dynamicKey = updates.dynamic ? 1 : 0;
    }
    if (updates.active !== undefined) {
        updates.activeKey = updates.active ? 1 : 0;
    }
    await localDb.mocks.update(localId, updates);
    return getMockByLocalId(localId);
};

const createMock = async (mockData: IMock): Promise<IMock> => {
    const storedMock: StoredMock = {
        ...mockData, // Spread
        dynamicKey: mockData.dynamic ? 1 : 0,
        activeKey: mockData.active ? 1 : 0,
    };

    const mockId = await localDb.mocks.add(storedMock);
    await updateMock(mockId, { localId: mockId });

    return {
        ...storedMock,
        id: mockId,
        localId: mockId,
    };
};

const addMocks = async (mocks: IMock[]): Promise<void> => {
    const storedMocks: StoredMock[] = mocks.map((mock) => ({
        ...mock,
        dynamicKey: mock.dynamic ? 1 : 0,
        activeKey: mock.active ? 1 : 0,
    }));

    await localDb.mocks.bulkAdd(storedMocks);
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
    projectLocalId,
}: {
    page: number;
    limit: number;
    active?: boolean;
    dynamic?: boolean;
    search?: string;
    projectLocalId: number;
}) => {
    try {
        let collection = localDb.mocks.orderBy("localId").reverse();

        collection = filterCollectionByQuery(collection, {
            projectLocalId,
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

const deleteMockByLocalId = async (localId: number): Promise<void> => {
    await localDb.mocks.delete(localId);
};

const getCountByStatus = async (projectLocalId: number) => {
    const [active, dynamic, total] = await Promise.all([
        localDb.mocks.where({ activeKey: 1, projectLocalId }).count(),
        localDb.mocks.where({ dynamicKey: 1, projectLocalId }).count(),
        localDb.mocks.where({ projectLocalId }).count(),
    ]);

    return {
        active,
        dynamic,
        total,
    };
};

export const mocksDb = {
    getDynamicUrlPatterns,
    findStaticMocks,
    getMockByLocalId,
    createMock,
    getAllMocks,
    findGraphQLMocks,
    _deleteAll,
    getMocks,
    updateMock,
    deleteMockByLocalId,
    getCountByStatus,
    addMocks,
};

console.log(
    "Mokku DB: mocksDb initialized and ready for use.",
    mocksDb.getAllMocks()
);
