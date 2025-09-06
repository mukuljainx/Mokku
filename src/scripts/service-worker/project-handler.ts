import { projectsDb } from "@/services/db/projectsDb";
import { OperationHandlers } from "./type";

export const projectHandler: OperationHandlers = {
    GET_PROJECTS: async (message, postMessage) => {
        console.log("Mokku Project_handler: received GET_PROJECTS", message);
        const projects = await projectsDb.getProjects();
        postMessage({
            type: "GET_PROJECTS",
            data: projects,
            id: message.id,
        });
    },
};
