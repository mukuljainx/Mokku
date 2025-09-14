import { projectsDb } from "@/services/db/projectsDb";
import { OperationHandlers } from "./type";

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
        })[0];

        if (project) {
            postMessage({
                type: "PROJECT_GET",
                data: project,
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
};
