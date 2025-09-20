import { IOrganization, IOrganizationCreate } from "@/types";
import { localDb } from ".";
import Dexie from "dexie";
import { filterArrayByQuery } from "@/scripts/utils/filter-array-by-query";

const getOrganizations = async (
    query: Partial<IOrganization>,
): Promise<IOrganization[]> => {
    const allOrganizations = await localDb.organizations.toArray();
    return filterArrayByQuery(allOrganizations, query);
};

const getOrganizationById = async (
    localId: number,
): Promise<IOrganization | undefined> => {
    return await localDb.organizations.get(localId);
};

const createOrganization = async (
    organizationData: Omit<IOrganizationCreate, "localId">,
): Promise<number | undefined> => {
    return await localDb.organizations.add(organizationData);
};

const updateOrganization = async (
    localId: number,
    updates: Partial<IOrganization>,
): Promise<number | undefined> => {
    const updatedCount = await localDb.organizations.update(localId, updates);
    return updatedCount > 0 ? localId : undefined;
};
const deleteOrganization = async (localId: number): Promise<void> => {
    await localDb.organizations.delete(localId);
};

export const organizationsDb = {
    getOrganizations,
    getOrganizationById,
    createOrganization,
    updateOrganization,
    deleteOrganization,
};
