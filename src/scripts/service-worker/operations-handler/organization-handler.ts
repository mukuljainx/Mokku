import { organizationsDb } from "@/services/db";
import { OperationHandlers } from "../type";
import { IOrganization, IOrganizationCreate } from "@/types";

const organizationHandlerInit = async () => {
    /**
     * if there are no organizations, create a default one for offline use
     */
    try {
        const orgs = await organizationsDb.getOrganizations({});
        if (orgs.length === 0) {
            await organizationsDb.createOrganization({
                name: "Users Organization",
                slug: "users-organization",
                description:
                    "This is a default organization created for offline use.",
                isLocal: true,
            });
            console.log("Mokku: Default organization created");
        }
    } catch (error) {
        // Check if it's a constraint error for duplicate slug
        if (
            error.name === "ConstraintError" &&
            error.message.includes("slug")
        ) {
            console.log("Mokku: Default organization already exists");
        } else {
            console.error("Mokku: Error creating default organization:", error);
        }
    }

    console.log(
        "Mokku: Organization handler initialized",
        organizationsDb.getOrganizations({})
    );
};

export const organizationHandler: OperationHandlers = {
    init: organizationHandlerInit,
    ORGANIZATION_GET_ALL: async (message, postMessage) => {
        const organizations = await organizationsDb.getOrganizations(
            message.data || {}
        );
        postMessage({
            type: "ORGANIZATION_GET_ALL",
            data: organizations,
            id: message.id,
        });
    },
    ORGANIZATION_CREATE: async (message, postMessage) => {
        const orgData = message.data as IOrganizationCreate;
        const organization = await organizationsDb.createOrganization(orgData);
        postMessage({
            type: "ORGANIZATION_CREATE",
            data: organization,
            id: message.id,
        });
    },
    ORGANIZATION_GET: async (message, postMessage) => {
        const partialOrgData = message.data as Partial<IOrganization>;

        const organizations =
            await organizationsDb.getOrganizations(partialOrgData);

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
