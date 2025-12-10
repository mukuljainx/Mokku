import { localDb } from "./dbInit";
import { IMock, IProject, IOrganization } from "@/types";

/**
 * Helper functions to automatically add timestamps when creating records
 */

export const createMockWithTimestamp = async (mockData: Omit<IMock, 'createdAt' | 'localId'>) => {
    const now = Date.now();
    const mockWithTimestamp = {
        ...mockData,
        createdAt: now,
        updatedAt: mockData.updatedAt || now,
    };
    
    return localDb.mocks.add(mockWithTimestamp as any);
};

export const createProjectWithTimestamp = async (projectData: Omit<IProject, 'createdAt' | 'localId'>) => {
    const now = Date.now();
    const projectWithTimestamp = {
        ...projectData,
        createdAt: now,
        updatedAt: projectData.updatedAt || now,
    };
    
    return localDb.projects.add(projectWithTimestamp);
};

export const createOrganizationWithTimestamp = async (orgData: Omit<IOrganization, 'createdAt' | 'localId'>) => {
    const now = Date.now();
    const orgWithTimestamp = {
        ...orgData,
        createdAt: now,
        updatedAt: orgData.updatedAt || now,
    };
    
    return localDb.organizations.add(orgWithTimestamp);
};

export const updateWithTimestamp = async <T extends { localId: number }>(
    table: any,
    id: number,
    updates: Partial<T>
) => {
    const updatesWithTimestamp = {
        ...updates,
        updatedAt: Date.now(),
    };
    
    return table.update(id, updatesWithTimestamp);
};
