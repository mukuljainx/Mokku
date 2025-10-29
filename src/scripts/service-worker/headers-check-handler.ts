import { parseJSONIfPossible } from "@/lib";
import { headersDb } from "@/services/db";
import { IHeader, ILog, IMessage } from "@/types";
import { OperationHandlers } from "./type";

export interface DynamicUrlEntry {
    localId: number;
    urlPattern: string; // The URL pattern stored for dynamic matching
}

let dynamicUrlPatterns: DynamicUrlEntry[] = [];

async function initializeDynamicUrls() {
    try {
        dynamicUrlPatterns = await headersDb.getDynamicUrlPatterns();
        console.log(
            "Mokku: Dynamic URL patterns loaded for headers:",
            dynamicUrlPatterns.length
        );
    } catch (error) {
        console.error("Mokku: Error loading dynamic URL patterns:", error);
    }
}

function findMatchingDynamicUrl(
    url: string
    // method: string,
): DynamicUrlEntry | undefined {
    // This is a very basic matcher.
    // For more complex patterns (e.g., /users/:id), you'd need a robust path-to-regexp like library.
    return dynamicUrlPatterns.find((entry) => {
        // Simple exact match for now, or implement your pattern matching logic here
        // Example for wildcard: entry.urlPattern.replace('*', '.*') and use regex
        return entry.urlPattern === url;
    });
}

export const headerHandlerInit = async () => {
    initializeDynamicUrls();
};

export const headerCheckHandler: OperationHandlers = {
    init: headerHandlerInit,
    CHECK_HEADER: async (
        message: IMessage,
        portPostMessage: (message: IMessage) => void
    ) => {
        console.log("Mokku SW: received CHECK_HEADER", message);
        const log = message.data as ILog;
        let header: IHeader | undefined = undefined;
        const request = log.request as ILog["request"];
        try {
            // REQUEST_CHECKPOINT_3: service worker received message from content script

            if (!request) {
                return portPostMessage({
                    type: "HEADER_CHECKED",
                    data: {
                        header: null,
                        log,
                    },
                    id: message.id,
                });
            }

            // if no header or header is inactive
            // 2. check for static
            if (!header || !header.active) {
                const staticHeader = await headersDb.findStaticHeaders(
                    request.url,
                    request.method
                )[0];

                // assign whatever we found
                header = staticHeader;
            }

            // 3. check with pathname
            if (!header || !header.active) {
                const pathname = new URL(request.fullUrl).pathname;
                const all = await headersDb.findStaticHeaders(
                    pathname,
                    request.method
                );
                const pathnameHeader = all[0];

                header = pathnameHeader;
            }

            // 4. check with dynamic headers
            if (!header || !header.active) {
                const dynamicMatch = findMatchingDynamicUrl(
                    request.url
                    // request.method,
                );

                if (dynamicMatch) {
                    const dynamicHeader = await headersDb.getHeaderByLocalId(
                        dynamicMatch.localId
                    );

                    header = dynamicHeader;
                }
            }
            // REQUEST_CHECKPOINT_4: service worker informs content script about header
            console.log("Mokku SW: Found header for request:", {
                request,
                header,
            });
            if (header) {
                portPostMessage({
                    type: "HEADER_CHECKED",
                    data: {
                        header,
                        log,
                    },
                    id: message.id,
                });
            } else {
                portPostMessage({
                    type: "HEADER_CHECKED",
                    data: {
                        log,
                        header: null,
                    },
                    id: message.id,
                });
            }
        } catch (err) {
            console.error("Mokku SW: Error processing CHECK_HEADER", err);
            portPostMessage({
                type: "HEADER_CHECKED",
                data: {
                    header: null,
                    log,
                },
                id: message.id,
            } as IMessage);
            portPostMessage({
                type: "HEADER_CHECKED_ERROR",
                log,
            } as IMessage);
        }
    },
};
