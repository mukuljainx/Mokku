export const filterArrayByQuery = <T>(
    array: T[],
    query: Partial<Record<keyof T, any>>,
): T[] => {
    if (Object.keys(query).length === 0) {
        return array;
    }

    return array.filter((item) => {
        try {
            for (const [key, value] of Object.entries(query)) {
                if (!value) {
                    continue;
                }

                if (
                    (item as any)[key] === value ||
                    (item as any)[key]?.includes(value)
                ) {
                    return true;
                }
            }
            return false;
        } catch (e) {
            return false;
        }
    });
};
