import xhook from "xhook";
import { parse } from "query-string";

import IdFactory from "./services/idFactory";
import MessageBus from "./services/message/messageBus";
import { IEventMessage } from "@mokku/types";
import { IMockResponse, ILog } from "./interface/mock";
import { getHeaders } from "./services/helper";
import { IMethod } from "@mokku/types";
import { messageService } from "./panel/App/service";

const messageBus = new MessageBus();
const messageIdFactory = new IdFactory();
const logIdFactory = new IdFactory();

messageService.listen("HOOK", (data) => {
    messageBus.dispatch(data.id, data.message);
});

/**
 * Promisify post message from window to window
 * ackRequired, if false, no id will be assigned hence, no method will be added in message
 * message id was not the problem but function in message bus was
 * @returns A promise that resolves with the response message if ackRequired is true, otherwise undefined.
 */
const postMessage = (
    message: IEventMessage["message"],
    type: IEventMessage["type"],
    ackRequired: boolean,
): Promise<any> | undefined => {
    const messageId = ackRequired ? messageIdFactory.getId() : null;

    const messageObject: IEventMessage = {
        id: messageId,
        message,
        to: "CONTENT",
        from: "HOOK",
        extensionName: "MOKKU",
        type,
    };

    messageService.send(messageObject);

    if (messageId !== null) {
        return new Promise((resolve) => {
            messageBus.addLister(messageId, resolve);
        });
    }
    return undefined;
};

// Helper to convert request body to a string representation
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

// Helper to parse URL and extract query parameters
function parseUrlAndQuery(
    requestUrlInput: Request | URL | string,
): { url: string; queryParams?: string } {
    let requestUrlStr = "";
    if (requestUrlInput instanceof URL) {
        requestUrlStr = requestUrlInput.href;
    } else if (
        typeof Request !== "undefined" &&
        requestUrlInput instanceof Request
    ) {
        requestUrlStr = requestUrlInput.url;
    } else {
        requestUrlStr = requestUrlInput as string;
    }

    const separator = requestUrlStr.indexOf("?");
    const url =
        separator !== -1
            ? requestUrlStr.substring(0, separator)
            : requestUrlStr;
    const queryParams =
        separator !== -1
            ? JSON.stringify(parse(requestUrlStr.substring(separator)))
            : undefined;
    return { url, queryParams };
}

const getLogObject = (
    request: {
        headers: Record<string, string>;
        url: Request | URL | string;
        method?: string;
        body?: any;
        mokku?: {
            id: number;
        };
    },
    response?: ILog["response"],
): ILog => {
    const { url, queryParams } = parseUrlAndQuery(request.url);
    const requestBody = getRequestBodyAsString(request.body);

    return {
        id: request.mokku?.id, // Preserving original behavior of string ID, casting due to ILog.id: number.
        request: {
            url,
            body: requestBody,
            queryParams,
            method: (request.method?.toUpperCase() || "GET") as IMethod,
            headers: getHeaders(request.headers),
        },
        response,
    };
};

async function processMockingRequest(
    request: any,
    callback: (response?: any) => void,
) {
    const logEntry = getLogObject(request);

    // Send initial log (fire and forget)
    postMessage(logEntry, "LOG", false);

    try {
        const mockServiceResponsePromise = postMessage(
            logEntry,
            "CHECK_MOCK",
            true,
        );
        if (!mockServiceResponsePromise) {
            // Should not happen if ackRequired is true
            callback();
            return;
        }
        const mockServiceResponse = (await mockServiceResponsePromise) as {
            mockResponse?: IMockResponse;
        };
        console.log("Hook: ", mockServiceResponse);

        if (mockServiceResponse && mockServiceResponse.mockResponse) {
            const mock = mockServiceResponse.mockResponse;

            const headers = mock.headers
                ? mock.headers.reduce<Record<string, string>>(
                      (final, header) => {
                          final[header.name] = header.value;
                          return final;
                      },
                      {},
                  )
                : { "content-type": "application/json; charset=UTF-8" }; // Default headers

            const finalMockedResponse = {
                status: mock.status,
                text: mock.response ?? "",
                headers,
            };

            if (mock.delay && mock.delay > 0) {
                setTimeout(() => {
                    callback(finalMockedResponse);
                }, mock.delay);
            } else {
                callback(finalMockedResponse);
            }
        } else {
            callback(); // No mock, proceed with original request
        }
    } catch (error) {
        console.error("Mokku Inject: Error during mock processing:", error);
        callback(); // Proceed with original request on error
    }
}

xhook.before(function (request, callback) {
    // Ensure a unique ID is associated with the request object for logging/correlation.
    if (!request.mokku) {
        request.mokku = { id: logIdFactory.getId() };
    }
    processMockingRequest(request, callback);
});

async function sendLogAfterRequest(request: any, originalResponse: any) {
    let responseText: string | undefined;
    const responseStatus: number = originalResponse.status || 0;
    const responseHeaders: Record<string, string> =
        originalResponse.headers || {};

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

    const logEntry = getLogObject(request, {
        status: responseStatus,
        response: responseText,
        headers: getHeaders(responseHeaders),
    });
    postMessage(logEntry, "LOG", false);
}

xhook.after(function (request, originalResponse) {
    // Ensure request.mokku.id is available (should be set in 'before' hook)
    if (!request.mokku) {
        // This case should ideally not be hit if 'before' always runs and sets it.
        request.mokku = { id: logIdFactory.getId() };
        console.warn(
            "Mokku Inject: request.mokku.id was not set in xhook.before, new ID generated in xhook.after.",
        );
    }
    sendLogAfterRequest(request, originalResponse);
});
