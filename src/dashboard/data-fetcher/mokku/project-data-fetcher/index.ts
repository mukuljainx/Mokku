import { sendMessageToMokku } from "@/dashboard/service/mokkuMessenger";
import type {
    IHeader,
    IMock,
    IProject,
    IProjectCreate,
} from "@/dashboard/types";

let id = 0;
const getId = () => "app-project-" + id++;

export const getProjects = async () => {
    return sendMessageToMokku({
        type: "PROJECTS_GET_ALL",
        extensionName: "MOKKU",
        id: getId(),
    }).then((response) => {
        return response?.data as IProject[];
    });
};

export const getProject = async (args: Partial<IProject>) => {
    return sendMessageToMokku({
        type: "PROJECT_GET",
        extensionName: "MOKKU",
        data: args,
        id: getId(),
    }).then((response) => {
        return response?.data as IProject;
    });
};

export const createProject = async (args: IProjectCreate) => {
    return sendMessageToMokku({
        type: "PROJECT_CREATE",
        extensionName: "MOKKU",
        data: args,
        id: getId(),
    }).then((response) => {
        return response?.data as IProject;
    });
};

export const getAllProjectData = async (args: {
    localId: number;
    mocks?: boolean;
    headers?: boolean;
}) => {
    return sendMessageToMokku({
        type: "PROJECT_GET_ALL_DATA",
        extensionName: "MOKKU",
        data: args,
        id: getId(),
    }).then((response) => {
        return response?.data;
    });
};

export const addBulkProjectData = async ({
    localId,
    headers = [],
    mocks = [],
}: {
    localId: number;
    mocks?: Partial<IMock>[];
    headers?: Partial<IHeader>[];
}) => {
    return sendMessageToMokku({
        type: "PROJECT_ADD_BULK_DATA",
        extensionName: "MOKKU",
        data: {
            localId,
            headers,
            mocks,
        },
        id: getId(),
    }).then((response) => {
        return response?.data;
    });
};

const deleteProject = async (args: { localId: number }) => {
    return sendMessageToMokku({
        type: "PROJECT_DELETE",
        extensionName: "MOKKU",
        data: args,
        id: getId(),
    }).then((response) => {
        return response?.data as IProject;
    });
};

const updateProject = async (args: {
    localId: number;
    project: Partial<IProject>;
}) => {
    return sendMessageToMokku({
        type: "PROJECT_UPDATE",
        extensionName: "MOKKU",
        data: args,
        id: getId(),
    }).then((response) => {
        return response?.data as IProject;
    });
};

export const projectService = {
    getProjects,
    getProject,
    createProject,
    getAllProjectData,
    addBulkProjectData,
    deleteProject,
    updateProject,
};
