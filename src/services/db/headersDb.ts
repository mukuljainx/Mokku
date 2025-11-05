import { IHeader, IMethod } from "@/types";
import { localDb } from ".";
import { StoredHeaders } from "./dbInit";
import { filterCollectionByQuery } from "@/scripts/utils";

export interface DynamicUrlEntry {
    localId: number;
    urlPattern: string; // The URL pattern stored for dynamic matching
    method: IMethod;
}

const getDynamicUrlPatterns = async (): Promise<DynamicUrlEntry[]> => {
    const activeDynamicHeaders = await localDb.headers
        .where({ dynamicKey: 1 }) // Uses the 'dynamic' index
        // .filter((header) => header.active === true) // Ensure only active headers are considered
        .toArray();

    return activeDynamicHeaders.map((header) => ({
        localId: header.localId, // localId is guaranteed by Dexie after retrieval
        urlPattern: header.url,
        method: header.method,
    }));
};

const getSortedByActive = (headers: StoredHeaders[]) =>
    headers.sort((a, b) => (b.active ? 1 : 0) - (a.active ? 1 : 0));

const findGraphQLHeaders = async ({
    url,
    operationName,
}: {
    url: string;
    operationName: string;
}): Promise<StoredHeaders[] | undefined> => {
    const headers = await localDb.headers
        .where({ url, operationName })
        .toArray();
    const z = getSortedByActive(headers);
    return z;
};

const findStaticHeaders = async (
    url: string,
    method: IMethod // Original function signature included method, but query didn't use it.
    // If method matching is needed, add 'method: method' to where clause.
): Promise<StoredHeaders[] | undefined> => {
    // Find active, non-dynamic headers matching the URL.
    // This query uses the [url+dynamic] compound index.
    const headers = await localDb.headers
        .where({ url, dynamicKey: 0, method })
        .toArray();
    const z = getSortedByActive(headers);
    return z;
};

const getAllHeaders = async (): Promise<StoredHeaders[]> => {
    return localDb.headers.toArray();
};

const getHeaderByLocalId = async (
    localId: number
): Promise<StoredHeaders | undefined> => {
    return localDb.headers.get(localId);
};

const updateHeader = async (
    localId: number,
    updates: Partial<StoredHeaders>
) => {
    // If 'dynamic' or 'active' are being updated, convert to keys
    if (updates.dynamic !== undefined) {
        updates.dynamicKey = updates.dynamic ? 1 : 0;
    }
    if (updates.active !== undefined) {
        updates.activeKey = updates.active ? 1 : 0;
    }
    await localDb.headers.update(localId, updates);
    return getHeaderByLocalId(localId);
};

const createHeader = async (headerData: IHeader): Promise<IHeader> => {
    const StoredHeaders: StoredHeaders = {
        ...headerData, // Spread
        dynamicKey: headerData.dynamic ? 1 : 0,
        activeKey: headerData.active ? 1 : 0,
    };

    const headerId = await localDb.headers.add(StoredHeaders);
    await updateHeader(headerId, { localId: headerId });

    return {
        ...StoredHeaders,
        localId: headerId,
    };
};

const _deleteAll = async (): Promise<void> => {
    await localDb.headers.clear();
};

export const getHeaders = async ({
    page,
    limit,
    active,
    dynamic,
    search,
    projectLocalId,
}: {
    page: number;
    limit: number;
    active?: boolean;
    dynamic?: boolean;
    search?: string;
    projectLocalId: number;
}) => {
    try {
        let collection = localDb.headers.orderBy("localId").reverse();

        collection = filterCollectionByQuery(collection, {
            projectLocalId,
            ...(active !== undefined ? { activeKey: active ? 1 : 0 } : {}),
            ...(dynamic !== undefined ? { dynamicKey: dynamic ? 1 : 0 } : {}),
        }) as typeof collection;

        if (search) {
            const lowerCaseSearch = search.toLowerCase();
            collection = collection.filter((header) =>
                Boolean(
                    header.name?.toLowerCase().includes(lowerCaseSearch) ||
                        header.url?.toLowerCase().includes(lowerCaseSearch)
                )
            );
        }

        const filteredHeadersCount = await collection.count();

        const filteredHeaders = await collection
            .offset(page * limit)
            .limit(limit)
            .toArray();

        const data = filteredHeaders.map(
            ({ dynamicKey: _d, activeKey: _a, ...StoredHeaders }) => ({
                ...StoredHeaders,
            })
        );

        return {
            headers: data,
            total: filteredHeadersCount,
        };
    } catch (error) {
        return { error };
    }
};

const deleteHeaderByLocalId = async (localId: number): Promise<void> => {
    await localDb.headers.delete(localId);
};

export const headersDb = {
    getDynamicUrlPatterns,
    findStaticHeaders,
    getHeaderByLocalId,
    createHeader,
    getAllHeaders,
    findGraphQLHeaders,
    _deleteAll,
    getHeaders,
    updateHeader,
    deleteHeaderByLocalId,
};

console.log(
    "Mokku DB: headersDb initialized and ready for use.",
    headersDb.getAllHeaders()
);
