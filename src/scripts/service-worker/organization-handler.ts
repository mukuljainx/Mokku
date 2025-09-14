import { organizationsDb } from "@/services/db";
import { OperationHandlers } from "./type";
import { IOrganizationCreate } from "@/types";

export const organizationHandlerInit = async () => {
    /**
     * if there are no organizations, create a default one for offline use
     */
    const orgs = await organizationsDb.getOrganizations({});
    if (orgs.length === 0) {
        await organizationsDb.createOrganization({
            name: "Users Organization",
            slug: "users-organization",
            description:
                "This is a default organization created for offline use.",
            isLocal: true,
        });
    }
};

export const organizationHandler: OperationHandlers = {
    init: organizationHandlerInit,
    ORGANIZATION_GET_ALL: async (message, postMessage) => {
        const organizations = await organizationsDb.getOrganizations(
            message.data || {},
        );
        postMessage({
            type: "ORGANIZATION_GET_ALL",
            data: organizations,
            id: message.id,
        });
    },
    ORGANIZATION_CREATE: async (message, postMessage) => {
        const orgData = message.data as IOrganizationCreate;
        const localId = await organizationsDb.createOrganization(orgData);
        postMessage({
            type: "ORGANIZATION_CREATE",
            data: { ...orgData, localId },
            id: message.id,
        });
    },
    ORGANIZATION_GET: async (message, postMessage) => {
        const { slug, id } = message.data as { slug: string; id: number };

        const organizations = await organizationsDb.getOrganizations({
            slug,
            id,
        });

        if (organizations[0]) {
            postMessage({
                type: "ORGANIZATION_GET",
                data: organizations[0],
                id: message.id,
            });
        } else {
            postMessage({
                type: "ORGANIZATION_GET",
                data: {
                    isError: true,
                    error: {
                        message: "Organization not found",
                        status: 404,
                    },
                },
                id: message.id,
            });
        }
    },
};
