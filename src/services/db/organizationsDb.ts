import { IOrganization, IOrganizationCreate } from "@/types";
import { localDb } from ".";

const getOrganizations = async (): Promise<IOrganization[]> => {
    return await localDb.organizations.toArray();
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
