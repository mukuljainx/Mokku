import type { SyncStatus } from "./common";

export interface IProject {
    name: string;
    id: number;
    slug: string;
    description?: string;
    createdAt: number;
    updatedAt?: number;
    lastOpened?: number;
    localId: number;
    isLocal?: boolean;
    syncStatus: SyncStatus;
}
