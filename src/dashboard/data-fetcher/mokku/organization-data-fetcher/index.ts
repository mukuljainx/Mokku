import { sendMessageToMokku } from "@/dashboard/service/mokkuMessenger";
import type { IOrganization } from "@/dashboard/types";

let id = 0;
const getId = () => "app-organization-" + id++;

export const getOrganizations = async () => {
    return sendMessageToMokku({
        type: "ORGANIZATION_GET_ALL",
        extensionName: "MOKKU",
        id: getId(),
    }).then((response) => {
        const data = response?.data as IOrganization[];
        return data;
    });
};

export const getOrganization = async (args: Partial<IOrganization>) => {
    return sendMessageToMokku({
        type: "ORGANIZATION_GET",
        extensionName: "MOKKU",
        id: getId(),
        data: args,
    }).then((response) => {
        const data = response?.data as IOrganization;
        return data;
    });
};

export const createOrganization = async (args: Partial<IOrganization>) => {
    return sendMessageToMokku({
        type: "ORGANIZATION_CREATE",
        extensionName: "MOKKU",
        id: getId(),
        data: args,
    }).then((response) => {
        const data = response?.data as IOrganization;
        return data;
    });
};
