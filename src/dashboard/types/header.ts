export interface IHeader {
    id: string;
    name: string;
    active: boolean;
    createdOn: number;
    projectId?: string;
    localId: number;
    projectLocalId: number;
    synced?: boolean;
    description?: string;
    priority: number;
    action: chrome.declarativeNetRequest.RuleAction;
    condition: chrome.declarativeNetRequest.RuleCondition;
    filterType?: "regex" | "pattern";
}

export type IHeaderCreate = Omit<
    IHeader,
    "id" | "localId" | "createdOn" | "synced" | "projectId"
>;
