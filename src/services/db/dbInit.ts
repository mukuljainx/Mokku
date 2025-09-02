import Dexie, { EntityTable } from "dexie";
import { IMock, IProject } from "@/types";

export interface StoredMock extends IMock {
    dynamicKey: number;
    activeKey: number; // 1 for active, 0 for inactive
}

export const localDb = new Dexie("MokkuConnectorDB") as Dexie & {
    mocks: EntityTable<
        StoredMock, // Use the stricter type for the table
        "localId" // Primary key is 'localId'
    >;
    projects: EntityTable<IProject, "localId">;
};

// Schema declaration:
localDb.version(1).stores({
    // 'localId' is the auto-incrementing primary key.
    // '[url+dynamicKey+method]' for specific mock lookups.
    // 'dynamicKey' as a simple index for queries like where({ dynamic: true }).
    mocks: "++localId, [url+dynamicKey+method], dynamicKey",
    projects: "++localId, name, lastOpened",
});
