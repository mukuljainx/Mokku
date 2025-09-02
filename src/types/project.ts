import type { SyncStatus } from "./common";

export interface IProject {
    name: string;
    id: number;
    description?: string;
    createdAt: number;
    updatedAt?: number;
    lastOpened?: number;
    localId: number;
    syncStatus: SyncStatus;
}
