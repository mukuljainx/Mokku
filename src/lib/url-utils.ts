const protocolRegex = /^[A-Za-z][A-Za-z0-9+.-]*:$/;
const protocolSet = {
    has: (segment: string) => protocolRegex.test(segment),
};

export const isSegmentDynamic = (segment = "") => {
    return segment.includes("*") || segment.includes(":");
};

export const isUrlDynamic = (param = "") => {
    let url = param.trim();
    const urlParts = url.split("/");
    const protocolMatch = url.match(urlParts[0]);
    if (protocolMatch) {
        urlParts.shift();
        url = urlParts.join("/");
    }
    return url.includes("*") || url.includes(":");
};

export const getSegmentInfo = (
    segment: string,
): {
    error: string | null;
    dynamic: boolean;
    value: string;
    param?: string;
} => {
    if (protocolSet.has(segment)) {
        return { error: null, dynamic: false, value: segment };
    }

    const dynamic = isSegmentDynamic(segment);

    if (!dynamic) {
        return { error: null, dynamic: false, value: segment };
    }

    if (segment.endsWith("*") || segment.endsWith(":")) {
        return {
            error: `URL is invalid, missing parameter name after "${segment}"`,
            dynamic,
            value: segment,
        };
    }

    if (
        (segment.includes("*") && segment.includes(":")) ||
        segment.indexOf(":") !== segment.lastIndexOf(":") ||
        segment.indexOf("*") !== segment.lastIndexOf("*")
    ) {
        return {
            error: `URL is invalid, multiple identifier found for "${segment}"`,
            dynamic,
            value: segment,
        };
    }

    return {
        value: segment,
        dynamic,
        error: null,
        param: segment[0] === ":" ? segment.slice(1) : undefined,
    };
};

export const getUrlInfo = (paramUrl: string) => {
    const url = paramUrl.trim();

    const segments = url.split("/");

    const paramsSet = new Set<string>();
    const segmentInfos = [];
    let error = "";

    for (const segment of segments) {
        const info = getSegmentInfo(segment);
        if (info.param) {
            if (paramsSet.has(info.param)) {
                error = `URL is invalid, duplicate parameter name "${info.param}" found`;
                info.error = error;
            }
            paramsSet.add(info.param);
        }
        if (info.error) {
            error = info.error;
        }
        segmentInfos.push(info);
    }

    return { valid: !error, error, segmentInfos };
};
