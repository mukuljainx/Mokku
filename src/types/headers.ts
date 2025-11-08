import { IMethod } from "./mock";

export interface IHeader {
    id: string;
    name: string;
    method: IMethod;
    active: boolean;
    headers: Array<{ name: string; value: string }>;
    createdOn: number;
    projectId?: string;
    localId: number;
    projectLocalId: number;
    synced?: boolean;
    url: string;
    dynamic?: boolean;
    description?: string;
}

export interface IHeaderCreate {
    name: string;
    method: IMethod;
    active: boolean;
    headers: Array<{ name: string; value: string }>;
    projectLocalId?: number;
    url: string;
    dynamic?: boolean;
    description?: string;
}
