import { get } from "lodash";

export const postBodyValidator = <T>(body: T, requiredFields: (keyof T)[]) => {
    const missingFields = [];
    requiredFields.forEach((field) => {
        const value = get(body, field);
        if (value === undefined || value === null) {
            missingFields.push(field);
        }
    });

    return missingFields;
};
