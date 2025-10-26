import { IProject, IProjectCreate } from "@/types";
import { localDb } from ".";
import Dexie from "dexie";
import { filterArrayByQuery } from "@/scripts/utils/filter-array-by-query";

const getProjects = async (
    query: Partial<IProject> = {}
): Promise<IProject[]> => {
    const allProjects = await localDb.projects.toArray();
    return filterArrayByQuery(allProjects, query);
};

const getProjectById = async (
    localId: number
): Promise<IProject | undefined> => {
    return await localDb.projects.get(localId);
};

const createProject = async (data: IProjectCreate): Promise<IProject> => {
    try {
        const projectId = await localDb.projects.add(data);
        await updateProject(projectId, { id: projectId });
        return {
            ...data,
            id: projectId,
            localId: projectId,
        };
    } catch (error) {
        if (error.name === "ConstraintError") {
            throw new Error(`Project with slug '${data.slug}' already exists`);
        }
        throw error;
    }
};

const updateProject = async (
    localId: number,
    updates: Partial<IProject>
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
    createProject,
    updateProject,
    deleteProject,
};

console.log(
    "Mokku Service Worker: projectsDb initialized",
    projectsDb.getProjects()
);
