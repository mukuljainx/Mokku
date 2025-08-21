import { StoredMock } from "./dbInit";
export interface DynamicUrlEntry {
    localId: number;
    urlPattern: string;
}
export declare const mocksDb: {
    getDynamicUrlPatterns: () => Promise<DynamicUrlEntry[]>;
    findStaticMocks: (url: string, method: IMethod) => Promise<StoredMock[] | undefined>;
    findMockById: (localId: number) => Promise<StoredMock | undefined>;
    addMock: (mockData: IMock) => Promise<number | undefined>;
    getAllMocks: () => Promise<StoredMock[]>;
    findGraphQLMocks: ({ url, operationName, }: {
        url: string;
        operationName: string;
    }) => Promise<StoredMock[] | undefined>;
    _deleteAll: () => Promise<void>;
};
