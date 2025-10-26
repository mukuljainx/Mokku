import Dexie, { EntityTable } from "dexie";
import { IMock, IProject, IOrganization, IHeader } from "@/types";

export interface StoredMock extends IMock {
    dynamicKey: number;
    activeKey: number; // 1 for active, 0 for inactive
}

export interface StoredHeaders extends IHeader {
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
    headers: EntityTable<StoredHeaders, "localId">;
};

// Schema declaration:
localDb.version(6).stores({
    mocks: "++localId, [url+dynamicKey+method], dynamicKey, &name, projectLocalId",
    projects: "++localId, name, lastOpened, slug&", // '&' makes 'slug' unique
    organizations: "++localId, name, slug&", // '&' makes 'slug' unique
    headers: "++localId, &name, projectId, dynamicKey, projectLocalId",
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

localDb.headers.hook("creating", function (primKey, obj, trans) {
    obj.createdOn = Date.now();
    if (!obj.id) {
        obj.id = crypto.randomUUID();
    }
    if (obj.synced === undefined) {
        obj.synced = false;
    }
});

localDb.headers.hook("updating", function (modifications) {
    // Headers don't have updatedAt, but we could track when they were last modified
    // if needed in the future
});

export async function deleteAllTables() {
    await localDb.transaction(
        "rw",
        localDb.mocks,
        localDb.projects,
        localDb.organizations,
        localDb.headers,
        async () => {
            await localDb.mocks.clear();
            await localDb.projects.clear();
            await localDb.organizations.clear();
            await localDb.headers.clear();
        }
    );
}
