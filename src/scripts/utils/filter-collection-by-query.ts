import { Collection } from "dexie";

export const filterCollectionByQuery = <T>(
    collection: Collection<T>,
    query: Partial<Record<keyof T, any>>
): Collection<T> => {
    if (Object.keys(query).length === 0) {
        return collection;
    }

    return Object.entries(query).reduce((col, [key, value]) => {
        if (value === undefined) {
            return col;
        }

        return col.filter((item) => {
            try {
                return (
                    (item as any)[key] === value ||
                    (item as any)[key]?.toLowerCase().includes(value)
                );
            } catch (e) {
                return false;
            }
        });
    }, collection);
};
