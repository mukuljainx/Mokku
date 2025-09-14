import { IProject } from "@/types";
import { localDb } from ".";
import Dexie from "dexie";
import { filterArrayByQuery } from "@/scripts/utils/filter-array-by-query";

const getProjects = async (
    query: Partial<IProject> = {},
): Promise<IProject[]> => {
    const allProjects = await localDb.projects.toArray();
    return filterArrayByQuery(allProjects, query);
};

const getProjectById = async (
    localId: number,
): Promise<IProject | undefined> => {
    return await localDb.projects.get(localId);
};

const addProject = async (
    projectData: Omit<IProject, "localId">,
): Promise<number | undefined> => {
    return await localDb.projects.add(projectData);
};

const updateProject = async (
    localId: number,
    updates: Partial<IProject>,
): Promise<number | undefined> => {
    const updatedCount = await localDb.projects.update(localId, updates);
    return updatedCount > 0 ? localId : undefined;
};
const deleteProject = async (localId: number): Promise<void> => {
    await localDb.projects.delete(localId);
};

export const projectsDb = {
    getProjects,
    getProjectById,
    addProject,
    updateProject,
    deleteProject,
};
