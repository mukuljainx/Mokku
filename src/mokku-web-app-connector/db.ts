import Dexie, { EntityTable } from "dexie";
import { IMockResponse } from "@mokku/types";

export interface DynamicUrlEntry {
    localId: number;
    urlPattern: string; // The URL pattern stored for dynamic matching
}

const localDb = new Dexie("FriendsDatabase") as Dexie & {
    mocks: EntityTable<
        IMockResponse,
        "localId" // primary key "id" (for the typings only)
    >;
};

// Schema declaration:
localDb.version(1).stores({
    mocks: "++localId, [url+method]", // primary key "id" (for the runtime!)
});

const getDynamicUrlPatterns = () => {
    return localDb.mocks
        .where({ dynamic: true, mocked: true }) // Only active dynamic mocks
        .toArray()
        .then((mocks) =>
            mocks.map((mock) => ({
                localId: mock.localId!,
                urlPattern: mock.url,
            })),
        );
};

const findStaticMock = async (
    url: string,
    method: string,
): Promise<IMockResponse | undefined> => {
    // Find active, non-dynamic mocks matching the URL
    return localDb.mocks
        .where({ url: url, dynamic: false, mocked: true })
        .first();
};

const findMockById = async (id: number): Promise<IMockResponse | undefined> => {
    return localDb.mocks.get(id);
};

export const db = {
    getDynamicUrlPatterns,
    findStaticMock,
    findMockById,
};
