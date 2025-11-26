import {
    IHeader,
    IHeaderCreate,
    IMock,
    IMockCreate,
    IProject,
    IProjectCreate,
} from "@/types";
import { localDb } from ".";
import { filterArrayByQuery } from "@/scripts/utils/filter-array-by-query";
import { StoredHeaders, StoredMock } from "./dbInit";

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
): Promise<IProject> => {
    await localDb.projects.update(localId, updates);
    return getProjectById(localId);
};
const deleteProject = async (localId: number): Promise<void> => {
    await localDb.transaction(
        "rw",
        localDb.mocks,
        localDb.headers,
        localDb.projects,
        async () => {
            await localDb.mocks.where({ projectLocalId: localId }).delete();
            await localDb.headers.where({ projectLocalId: localId }).delete();
            await localDb.projects.delete(localId);
        }
    );
};

const getProjectsWithAllData = async ({
    localId,
    mocks: exportMocks,
    headers: exportHeaders,
}: {
    localId: number;
    mocks?: boolean;
    headers?: boolean;
}) => {
    let mocksPromise;
    let headersPromise;

    if (exportMocks) {
        mocksPromise = localDb.mocks
            .where({ projectLocalId: localId })
            .toArray();
    }

    if (exportHeaders) {
        headersPromise = localDb.headers
            .where({ projectLocalId: localId })
            .toArray();
    }

    const projectsPromise = localDb.projects.where({ localId }).toArray();

    const [projects = [], mocks = [], headers = []] = await Promise.all([
        projectsPromise,
        mocksPromise,
        headersPromise,
    ]);

    return { projects, mocks, headers };
};

const addBulkDataToProject = async ({
    headers,
    localId: projectLocalId,
    mocks,
}: {
    localId: number;
    mocks: Partial<IMock>[];
    headers: Partial<IHeader>[];
}): Promise<void> => {
    const mocksWithProjectId = mocks.map((mock) => ({
        projectLocalId,
        active: mock.active,
        name: mock.name,
        description: mock.description,
        dynamic: mock.dynamic,
        requestType: mock.requestType,
        method: mock.method,
        url: mock.url,
        operationName: mock.operationName,
        responseType: mock.responseType,
        responseBodyType: mock.responseBodyType,
        response: mock.response,
        status: mock.status,
        headers: mock.headers,
        delay: mock.delay,
        function: mock.function,
        activeKey: mock.active ? 1 : 0,
        dynamicKey: mock.dynamic ? 1 : 0,
    })) as StoredMock[];

    const headersWithProjectId = headers.map((header) => ({
        ...header,
        projectLocalId,
        activeKey: header.active ? 1 : 0,
    })) as StoredHeaders[];

    await localDb.transaction(
        "rw",
        localDb.mocks,
        localDb.headers,
        async () => {
            if (mocksWithProjectId.length > 0) {
                await localDb.mocks.bulkAdd(mocksWithProjectId);
            }
            if (headersWithProjectId.length > 0) {
                await localDb.headers.bulkAdd(headersWithProjectId);
            }
        }
    );
};

export const projectsDb = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getProjectsWithAllData,
    addBulkDataToProject,
};

console.log(
    "Mokku Service Worker: projectsDb initialized",
    projectsDb.getProjects()
);
