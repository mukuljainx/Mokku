import { sendMessageToMokku } from "@/dashboard/service/mokkuMessenger";
import type { IMock, IMockCreate } from "@/dashboard/types";

let id = 0;
const getId = () => "app-mock-" + id++;

interface GetMocksArgs {
    page: number;
    limit: number;
    active?: boolean;
    dynamic?: boolean;
    search?: string;
    projectLocalId?: number;
}

export const getMocks = async (args: GetMocksArgs) => {
    return sendMessageToMokku({
        type: "MOCK_GET_ALL",
        extensionName: "MOKKU",
        id: getId(),
        data: args,
    }).then((response) => {
        return response?.data as { mocks: IMock[]; total: number };
    });
};

export const getMock = async (args: Partial<IMock>) => {
    return sendMessageToMokku({
        type: "MOCK_GET",
        extensionName: "MOKKU",
        data: args,
        id: getId(),
    }).then((response) => {
        return response?.data as IMock;
    });
};

export const createMock = async (args: IMockCreate) => {
    return sendMessageToMokku({
        type: "MOCK_CREATE",
        extensionName: "MOKKU",
        data: args,
        id: getId(),
    }).then((response) => {
        return response?.data as IMock;
    });
};

export const deleteMock = async ({ localId }: { localId: number }) => {
    return sendMessageToMokku({
        type: "MOCK_DELETE",
        extensionName: "MOKKU",
        data: { localId },
        id: getId(),
    }).then((response) => {
        return response?.data;
    });
};

export const updateMock = async (args: {
    localId: number;
    mock: Partial<IMock>;
}) => {
    return sendMessageToMokku({
        type: "MOCK_UPDATE",
        extensionName: "MOKKU",
        data: args,
        id: getId(),
    }).then((response) => {
        return response?.data;
    });
};

export const getCountByStatus = async (projectLocalId: number) => {
    return sendMessageToMokku({
        type: "MOCK_COUNT_BY_STATUS",
        extensionName: "MOKKU",
        data: { projectLocalId },
        id: getId(),
    }).then((response) => {
        return response?.data as {
            active: number;
            total: number;
            dynamic: number;
        };
    });
};

export const mocksService = {
    getMocks,
    getMock,
    createMock,
    deleteMock,
    updateMock,
    getCountByStatus,
};
