type PathImpl<T, K extends keyof T> = K extends string
    ? T[K] extends Record<string, any>
        ?
              | `${K}.${PathImpl<T[K], Exclude<keyof T[K], keyof any[]>> & string}`
              | K
        : K
    : never;

type Path<T> = PathImpl<T, keyof T> | keyof T;

export const removeEmptyArray = <T extends object>(data: T, path: Path<T>) => {
    const keys = (path as string).split(".");
    let current: any = data;

    for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
        if (current === undefined) {
            return;
        }
    }

    const lastKey = keys[keys.length - 1];
    const value = current[lastKey];

    if (Array.isArray(value) && value.length === 0) {
        delete current[lastKey];
    }
};
