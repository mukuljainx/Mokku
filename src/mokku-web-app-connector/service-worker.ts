import { ILog } from "@mokku/types";
import { messageService } from "../panel/App/service";
import { db, DynamicUrlEntry } from "./db";
import { ApiCallDetails, Mock } from "./types";

let dynamicUrlPatterns: DynamicUrlEntry[] = [];

async function initializeDynamicUrls() {
    try {
        dynamicUrlPatterns = await db.getDynamicUrlPatterns();
        console.log(
            "Mokku: Dynamic URL patterns loaded:",
            dynamicUrlPatterns.length,
        );
    } catch (error) {
        console.error("Mokku: Error loading dynamic URL patterns:", error);
    }
}

// Initialize on service worker startup
chrome.runtime.onStartup.addListener(() => {
    console.log("Mokku: Service worker started on browser startup.");
    initializeDynamicUrls();
});

// Also initialize when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    console.log("Mokku: Extension installed/updated.");
    initializeDynamicUrls();
});

/**
 * Placeholder for executing a function string.
 * In a real scenario, this would need careful implementation,
 * possibly using an offscreen document for safer execution if DOM/window access is needed,
 * or a sandboxed iframe. For simple data transformation, new Function() might be used
 * with caution.
 */
async function executeFunction(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _functionBody: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _request: ApiCallDetails,
): Promise<any> {
    console.warn(
        "Mokku: executeFunction is a placeholder and not fully implemented.",
    );
    // Example: const fn = new Function('request', `return (${functionBody})(request)`);
    // return fn(request);
    return { message: "Function execution placeholder result" };
}

function findMatchingDynamicUrl(
    url: string,
    method: string,
): DynamicUrlEntry | undefined {
    // This is a very basic matcher.
    // For more complex patterns (e.g., /users/:id), you'd need a robust path-to-regexp like library.
    return dynamicUrlPatterns.find((entry) => {
        // Simple exact match for now, or implement your pattern matching logic here
        // Example for wildcard: entry.urlPattern.replace('*', '.*') and use regex
        return entry.urlPattern === url;
    });
}

chrome.runtime.onConnect.addListener((port) => {
    console.log(port.name);
    if (port.name === "mokku-content-script") {
        port.onMessage.addListener((data) => {
            console.log("port: ", data);
            if (data.type === "CHECK_MOCK") {
                (async () => {
                    const message = data.message as ILog;
                    let mock = undefined;
                    // 1. check for static
                    mock = await db.findStaticMock(
                        message.request.url,
                        message.request.method,
                    );

                    if (!mock) {
                        // check with dynamic mocks
                        const dynamicMatch = findMatchingDynamicUrl(
                            message.request.url,
                            message.request.method,
                        );
                        if (dynamicMatch) {
                            mock = await db.findMockById(dynamicMatch.localId);
                        }
                    }
                    if (mock) {
                        //todo: inform the panel
                        if (mock.type === "STATIC") {
                            port.postMessage({ mockResponse: mock });
                        } else if (mock.type === "FUNCTION" && mock.function) {
                            const result = await executeFunction(
                                mock.function,
                                message.request,
                            );
                            port.postMessage({ mockResponse: result });
                        }
                    } else {
                        //todo: inform the panel
                        port.postMessage({ mockResponse: undefined });
                    }
                })();
            }
        });
    }
});
