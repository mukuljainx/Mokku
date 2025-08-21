import Dexie, { EntityTable } from "dexie";
import { IMock } from "@/types";
export interface StoredMock extends IMock {
    dynamicKey: number;
    activeKey: number;
}
export declare const localDb: Dexie & {
    mocks: EntityTable<StoredMock, // Use the stricter type for the table
    "localId">;
};
