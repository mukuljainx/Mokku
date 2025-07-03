import { isNull } from "lodash";

interface IParseJSONResult {
    json: Record<string, unknown>;
    parsed: boolean;
    original: string | object;
}

export const parseJSONIfPossible = (
    original: string | object,
): IParseJSONResult => {
    let result = { json: {}, parsed: false, original };

    if (typeof original !== "string") {
        return result;
    }

    try {
        const json = JSON.parse(original);
        result = {
            original,
            parsed: typeof json === "object" && !isNull(json),
            json,
        };
    } catch {
        result = { original, parsed: false, json: {} };
    }
    return result;
};
