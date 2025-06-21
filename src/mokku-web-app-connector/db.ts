import Dexie, { EntityTable } from "dexie";
import { IMockResponse, IMethod } from "@mokku/types";

// Define a stricter type for objects stored in Dexie.
// This ensures 'dynamic' is always a boolean for reliable indexing
// and clarifies the role of 'localId' vs the original 'id'.
interface StoredMock extends IMockResponse {
    localId?: number; // Dexie's auto-incremented primary key
    dynamicKey: number;
}

export interface DynamicUrlEntry {
    localId: number;
    urlPattern: string; // The URL pattern stored for dynamic matching
}

// Rename database for clarity (e.g., from "FriendsDatabase")
const localDb = new Dexie("MokkuConnectorDB") as Dexie & {
    mocks: EntityTable<
        StoredMock, // Use the stricter type for the table
        "localId" // Primary key is 'localId'
    >;
};

// Schema declaration:
localDb.version(1).stores({
    // 'localId' is the auto-incrementing primary key.
    // '[url+dynamicKey+method]' for specific mock lookups.
    // 'dynamicKey' as a simple index for queries like where({ dynamic: true }).
    mocks: "++localId, [url+dynamicKey+method], dynamicKey",
});

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

const findStaticMock = async (
    url: string,
    method: IMethod, // Original function signature included method, but query didn't use it.
    // If method matching is needed, add 'method: method' to where clause.
): Promise<StoredMock | undefined> => {
    // Find active, non-dynamic mocks matching the URL.
    // This query uses the [url+dynamic] compound index.
    return (
        localDb.mocks
            .where({ url, dynamicKey: 0, method })
            // .filter((mock) => mock.active === true) // Ensure only active mocks are considered
            .first()
    );
};

const getAllMocks = async (): Promise<StoredMock[]> => {
    return localDb.mocks.toArray();
};

const findMockById = async (
    localId: number,
): Promise<StoredMock | undefined> => {
    return localDb.mocks.get(localId);
};

const addMock = async (mockData: IMockResponse): Promise<number> => {
    const storedMock: StoredMock = {
        ...mockData, // Spread
        dynamicKey: mockData.dynamic ? 1 : 0,
    };

    return localDb.mocks.add(storedMock);
};

export const db = {
    getDynamicUrlPatterns,
    findStaticMock,
    findMockById,
    addMock,
    getAllMocks,
};
