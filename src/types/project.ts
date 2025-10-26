import type { SyncStatus } from "./common";

export interface IProject {
    name: string;
    id?: number;
    slug: string;
    description?: string;
    createdAt?: number;
    updatedAt?: number;
    lastOpened?: number;
    localId: number;
    isLocal?: boolean;
    syncStatus?: SyncStatus;
    organizationId?: number;
    organizationLocalId: number;
}

export type IProjectCreate = Pick<
    IProject,
    "name" | "slug" | "description" | "isLocal" | "organizationId"
>;
