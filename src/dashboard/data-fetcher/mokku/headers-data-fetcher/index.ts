import { sendMessageToMokku } from "@/dashboard/service/mokkuMessenger";
import type { IHeader, IHeaderCreate } from "@/dashboard/types";

let id = 0;
const getId = () => "app-header-" + id++;

interface GetHeadersArgs {
    page: number;
    limit: number;
    active?: boolean;
    dynamic?: boolean;
    search?: string;
    projectLocalId?: number;
}

export const getHeaders = async (args: GetHeadersArgs) => {
    return sendMessageToMokku({
        type: "HEADER_GET_ALL",
        extensionName: "MOKKU",
        id: getId(),
        data: args,
    }).then((response) => {
        return response?.data as { headers: IHeader[]; total: number };
    });
};

export const getHeader = async (args: Partial<IHeader>) => {
    return sendMessageToMokku({
        type: "HEADER_GET",
        extensionName: "MOKKU",
        data: args,
        id: getId(),
    }).then((response) => {
        return response?.data as IHeader;
    });
};

export const createHeader = async (args: IHeaderCreate) => {
    return sendMessageToMokku({
        type: "HEADER_CREATE",
        extensionName: "MOKKU",
        data: args,
        id: getId(),
    }).then((response) => {
        return response?.data as IHeader;
    });
};

export const updateHeader = async (args: {
    localId: number;
    header: Partial<IHeader>;
}) => {
    return sendMessageToMokku({
        type: "HEADER_UPDATE",
        extensionName: "MOKKU",
        data: args,
        id: getId(),
    }).then((response) => {
        return response?.data as IHeader;
    });
};

export const deleteHeader = async (args: { localId: number }) => {
    return sendMessageToMokku({
        type: "HEADER_DELETE",
        extensionName: "MOKKU",
        data: args,
        id: getId(),
    }).then((response) => {
        return response?.data;
    });
};

export const headersService = {
    getHeaders,
    getHeader,
    createHeader,
    updateHeader,
    deleteHeader,
};
