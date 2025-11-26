import { projectsDb } from "@/services/db/projectsDb";
import { OperationHandlers } from "../type";
import { IHeader, IMock, IProject, IProjectCreate } from "@/types";

export const projectHandler: OperationHandlers = {
    PROJECTS_GET_ALL: async (message, postMessage) => {
        const projects = await projectsDb.getProjects();
        postMessage({
            type: "PROJECTS_GET_ALL",
            data: projects,
            id: message.id,
        });
    },
    PROJECT_GET_ALL_DATA: async (message, postMessage) => {
        const data = await projectsDb.getProjectsWithAllData(
            message.data as {
                localId: number;
                mocks?: boolean;
                headers?: boolean;
            }
        );
        postMessage({
            type: "PROJECT_GET_ALL_DATA",
            data: data,
            id: message.id,
        });
    },
    PROJECT_ADD_BULK_DATA: async (message, postMessage) => {
        const data = message.data as {
            localId: number;
            mocks: IMock[];
            headers: IHeader[];
        };

        try {
            await projectsDb.addBulkDataToProject(data);
        } catch (error) {
            console.error(error);
            const firstError = error.failures[0];

            if (String(firstError).includes("ConstraintError")) {
                throw new Error(
                    "Duplicate name found while adding bulk data, please ensure all mock and header names are unique within the project."
                );
            } else {
                throw new Error(
                    "Error adding bulk data to project: " + firstError
                );
            }
        }

        postMessage({
            type: "PROJECT_ADD_BULK_DATA",
            data: {},
            id: message.id,
        });
    },
    PROJECT_GET: async (message, postMessage) => {
        const partialProject = message.data as Partial<IProject>;

        const project = await projectsDb.getProjects(partialProject);

        if (project[0]) {
            postMessage({
                type: "PROJECT_GET",
                data: project[0],
                id: message.id,
            });
        } else {
            postMessage({
                type: "PROJECT_GET",
                data: {
                    isError: true,
                    error: {
                        message: "Project not found",
                        status: 404,
                    },
                },
                id: message.id,
            });
        }
    },
    PROJECT_DELETE: async (message, postMessage) => {
        const data = message.data as { localId: number };
        await projectsDb.deleteProject(data.localId);
        postMessage({
            type: "PROJECT_DELETE",
            data: {},
            id: message.id,
        });
    },
    PROJECT_CREATE: async (message, postMessage) => {
        const data = message.data as IProjectCreate;

        if (!data.organizationLocalId) {
            return postMessage({
                type: "PROJECT_CREATE",
                data: {
                    isError: true,
                    error: {
                        message: "Organization Id is required",
                        status: 400,
                    },
                },
                id: message.id,
            });
        }

        if (data.isLocal) {
            const project = await projectsDb.createProject(data);
            postMessage({
                type: "PROJECT_CREATE",
                data: project,
                id: message.id,
            });
        }

        return postMessage({
            type: "PROJECT_CREATE",
            data: {
                isError: true,
                error: {
                    message: "Cloud project are not supported yet.",
                    status: 400,
                },
            },
            id: message.id,
        });
    },
    PROJECT_UPDATE: async (message, postMessage) => {
        const { localId, project } = message.data as {
            localId: number;
            project: Partial<IProject>;
        };
        const updatedProject = await projectsDb.updateProject(localId, project);
        postMessage({
            type: "PROJECT_UPDATE",
            data: updatedProject,
            id: message.id,
        });
    },
};
