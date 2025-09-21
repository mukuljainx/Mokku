import { projectsDb } from "@/services/db/projectsDb";
import { OperationHandlers } from "./type";
import { IProjectCreate } from "@/types";

export const projectHandler: OperationHandlers = {
    PROJECTS_GET_ALL: async (message, postMessage) => {
        const projects = await projectsDb.getProjects();
        postMessage({
            type: "PROJECTS_GET_ALL",
            data: projects,
            id: message.id,
        });
    },
    PROJECT_GET: async (message, postMessage) => {
        const { slug, id } = message.data as { slug: string; id: number };

        const project = await projectsDb.getProjects({
            slug,
            id,
        });

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
    PROJECT_CREATE: async (message, postMessage) => {
        const data = message.data as IProjectCreate;

        if (!data.organizationId) {
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
};
