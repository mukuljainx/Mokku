import type { SyncStatus } from "./common";

export interface IOrganization {
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
}

export type IOrganizationCreate = Pick<
    IOrganization,
    "name" | "slug" | "description" | "isLocal"
>;
