import { organizationsDb } from "@/services/db";
import { OperationHandlers } from "./type";
import { IOrganizationCreate } from "@/types";

export const orgHandler: OperationHandlers = {
    ORGANIZATION_GET_ALL: async (message, postMessage) => {
        console.log("Mokku Project_handler: received GET_PROJECTS", message);
        const projects = await organizationsDb.getOrganizations();
        postMessage({
            type: "GET_PROJECTS",
            data: projects,
            id: message.id,
        });
    },
    ORGANIZATION_CREATE: async (message, postMessage) => {
        console.log("Mokku Org_handler: received ORGANIZATION_CREATE", message);
        const orgData = message.data as IOrganizationCreate;
        const localId = await organizationsDb.createOrganization(orgData);
        postMessage({
            type: "ORGANIZATION_CREATE",
            data: { ...orgData, localId },
            id: message.id,
        });
    },
};
