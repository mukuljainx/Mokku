import xhook from "xhook";
import qs from "qs";
import { IMethod } from "@/types";

export const getHeaders = (headers: Record<string, string>) => {
    if (typeof headers === "object") {
        return Object.keys(headers).map((name) => ({
            name,
            value: headers[name],
        }));
    }
    return [];
};

const parseUrlAndQuery = (
    requestUrlInput: Request | URL | string,
): {
    url: string;
    fullUrl: string;
    queryParams?: string;
} => {
    let requestUrlStr = "";
    if (requestUrlInput instanceof URL) {
        requestUrlStr = requestUrlInput.href;
    } else if (
        typeof Request !== "undefined" &&
        requestUrlInput instanceof Request
    ) {
        requestUrlStr = requestUrlInput.url;
    } else {
        requestUrlStr = new Request(requestUrlInput as string).url;
    }

    const separator = requestUrlStr.indexOf("?");

    const url =
        separator !== -1
            ? requestUrlStr.substring(0, separator)
            : requestUrlStr;

    const search = requestUrlStr.substring(separator + 1);
    const queryParamsObject = qs.parse(search);

    const queryParams =
        search && search.length > 0
            ? JSON.stringify(queryParamsObject)
            : undefined;

    return { url, queryParams, fullUrl: requestUrlStr };
};

function getRequestBodyAsString(body: any): string | undefined {
    if (body === null || body === undefined) {
        return undefined;
    }
    if (
        typeof ReadableStream !== "undefined" &&
        body instanceof ReadableStream
    ) {
        return "Unsupported body type: ReadableStream";
    }
    try {
        // JSON.stringify is primarily for plain objects/arrays.
        if (
            typeof body === "object" &&
            !(body instanceof FormData) &&
            !(body instanceof Blob) &&
            !(body instanceof ArrayBuffer) &&
            !(body instanceof URLSearchParams)
        ) {
            return JSON.stringify(body);
        }
        return String(body); // Fallback for primitives, FormData, etc.
    } catch (e) {
        console.error("Mokku Inject: Error stringifying request body", e);
        return "Unsupported body type: Error during stringification";
    }
}

export const getLogRequest = (request: xhook.Request) => {
    const { url, queryParams, fullUrl } = parseUrlAndQuery(request.url);
    const requestBody = getRequestBodyAsString(request.body);

    return {
        url,
        fullUrl,
        body: requestBody,
        queryParams,
        method: (request.method?.toUpperCase() || "GET") as IMethod,
        headers: getHeaders(request.headers),
        time: Date.now().valueOf(),
    };
};

const getResponseText = async (originalResponse: any) => {
    let responseText: string | undefined;
    try {
        if (typeof originalResponse.clone === "function") {
            // Likely a Fetch API Response
            const clonedResponse = originalResponse.clone();
            responseText = await clonedResponse.text();
        } else if (typeof originalResponse.text === "string") {
            // Direct text property
            responseText = originalResponse.text;
        } else if (originalResponse.data) {
            // Fallback to data property
            responseText =
                typeof originalResponse.data === "string"
                    ? originalResponse.data
                    : JSON.stringify(originalResponse.data);
        } else {
            responseText = "Mokku: Unable to determine response body.";
        }
    } catch (error) {
        console.error(
            "Mokku Inject: Error extracting response text in xhook.after:",
            error,
        );
        responseText = "Mokku: Error processing response text.";
    }

    return responseText || "";
};

export const getLogResponse = async (response?: xhook.Response) => {
    if (!response) {
        return {
            status: 0,
            response: "",
            headers: [],
            time: Date.now().valueOf(),
        };
    }
    const responseText = await getResponseText(response);

    console.log({ responseText });

    return {
        status: response.status || 0,
        response: responseText,
        headers: getHeaders(response.headers || {}),
        time: Date.now().valueOf(),
    };
};
