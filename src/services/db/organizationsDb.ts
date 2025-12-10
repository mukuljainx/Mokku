import { IOrganization, IOrganizationCreate } from "@/types";
import { localDb } from ".";
import { filterArrayByQuery } from "@/scripts/utils/filter-array-by-query";

const getOrganizations = async (
    query: Partial<IOrganization>
): Promise<IOrganization[]> => {
    const allOrganizations = await localDb.organizations.toArray();
    return filterArrayByQuery(allOrganizations, query);
};

const getOrganizationById = async (
    localId: number
): Promise<IOrganization | undefined> => {
    return await localDb.organizations.get(localId);
};

const getOrganizationBySlug = async (
    slug: string
): Promise<IOrganization | undefined> => {
    return await localDb.organizations
        .where("slug")
        .equalsIgnoreCase(slug)
        .first();
};

const createOrganization = async (
    organizationData: Omit<IOrganizationCreate, "localId">
): Promise<IOrganization> => {
    try {
        const orgId = await localDb.organizations.add(organizationData);
        await updateOrganization(orgId, { id: orgId });
        return {
            ...organizationData,
            id: orgId,
            localId: orgId,
        };
    } catch (error) {
        if (error.name === "ConstraintError") {
            throw new Error(
                `Organization with slug '${organizationData.slug}' already exists`
            );
        }
        throw error;
    }
};

const updateOrganization = async (
    localId: number,
    updates: Partial<IOrganization>
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
    getOrganizationBySlug,
};
