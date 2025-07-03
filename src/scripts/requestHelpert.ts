export const isValidJSON = (
    json: string,
): { error?: string; position?: number; lineNumber?: number } => {
    try {
        JSON.parse(json);
        return { error: undefined };
    } catch (e) {
        let position = undefined;
        let lineNumber = undefined;
        const jsonErrorRegex = new RegExp(/(?<=\bposition\s)(\w+)/g);
        const stringifiedError = (e as any).toString();
        if (stringifiedError !== "Unexpected end of JSON input") {
            const x = jsonErrorRegex.exec(stringifiedError);
            position = x && x.length > 0 ? parseInt(x[0], 10) : undefined;
            if (position) {
                lineNumber = 1;
                for (let i = 0; i < json.length; i++) {
                    if (i === position) {
                        break;
                    }
                    if (json[i] === "\n") {
                        lineNumber++;
                    }
                }
            }

            jsonErrorRegex.lastIndex = 0;
        }
        return {
            error: `${stringifiedError}${
                lineNumber ? " and at line number " + lineNumber : ""
            }`,
            position,
            lineNumber,
        };
    }
};

export const getError = (errors: Record<string, string | string[]>) => {
    const keys = Object.keys(errors);
    if (keys.length === 0) {
        return;
    } else {
        return errors[keys[0]];
    }
};

export const getHeaders = (headers: Record<string, string>) => {
    if (typeof headers === "object") {
        return Object.keys(headers).map((name) => ({
            name,
            value: headers[name],
        }));
    }
    return [];
};
