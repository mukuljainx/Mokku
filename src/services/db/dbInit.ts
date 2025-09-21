import Dexie, { EntityTable } from "dexie";
import { IMock, IProject, IOrganization } from "@/types";

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
    organizations: EntityTable<IOrganization, "localId">;
};

// Schema declaration:
localDb.version(3).stores({
    mocks: "++localId, [url+dynamicKey+method], dynamicKey",
    projects: "++localId, name, lastOpened, slug&", // '&' makes 'slug' unique
    organizations: "++localId, name, slug&", // '&' makes 'slug' unique
});

// Add hooks to automatically set timestamps
localDb.mocks.hook("creating", function (primKey, obj, trans) {
    obj.createdAt = Date.now();
    if (!obj.updatedAt) {
        obj.updatedAt = Date.now();
    }
});

localDb.mocks.hook("updating", function (modifications) {
    (modifications as any).updatedAt = Date.now();
});

localDb.projects.hook("creating", function (primKey, obj, trans) {
    obj.createdAt = Date.now();
    if (!obj.updatedAt) {
        obj.updatedAt = Date.now();
    }
});

localDb.projects.hook("updating", function (modifications) {
    (modifications as any).updatedAt = Date.now();
});

localDb.organizations.hook("creating", function (primKey, obj, trans) {
    obj.createdAt = Date.now();
    if (!obj.updatedAt) {
        obj.updatedAt = Date.now();
        obj.syncStatus = "PENDING";
    }
});

localDb.organizations.hook("updating", function (modifications) {
    (modifications as any).updatedAt = Date.now();
});

export async function deleteAllTables() {
    localDb.delete();
}
