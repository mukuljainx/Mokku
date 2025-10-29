import {
    IMock,
    ILog,
    MessageType,
    MESSAGE_TYPE,
    IErrorData,
    IHeader,
} from "@/types";
import { MessageService } from "@/lib";
import { MessageBus } from "@/lib/messageBus";
import { IdFactory } from "@/lib/idFactory";
import { getLogRequest, getLogResponse } from "./request-helper";

const messageBus = new MessageBus();
const messageIdFactory = new IdFactory();
const logIdFactory = new IdFactory();

const messageService = new MessageService("HOOK");

messageService.listen((message) => {
    console.log("Mokku Inject: Received message from panel/content", message);
    if (message.id) {
        messageBus.dispatch(message.id, message.data);
    }
});

/**
 * Promisify post message from window to window
 * ackRequired, if false, no id will be assigned hence, no method will be added in message
 * message id was not the problem but function in message bus was
 * @returns A promise that resolves with the response message if ackRequired is true, otherwise undefined.
 */
const postMessage = (
    message: ILog | IErrorData,
    type: MessageType["HOOK"],
    ackRequired: boolean
): Promise<any> | undefined => {
    // Ensure message is serializable
    const safeMessage = JSON.parse(JSON.stringify(message));
    const messageId = ackRequired ? messageIdFactory.getId() : undefined;

    const messageObject = {
        id: messageId,
        data: safeMessage,
        type,
    };

    try {
        messageService.send("CONTENT", messageObject);

        if (messageId !== undefined) {
            return new Promise((resolve) => {
                messageBus.addLister(messageId, resolve);
            });
        }
    } catch (error) {
        console.error("Mokku Inject: Error in postMessage:", error);
    }

    return undefined;
};

let xhook;
try {
    /**
     * xhook tries to change api's on windows for mocking purpose
     * it is not allowed in YouTube and some other sites for ads protection
     * hence, we are wrapping it in try catch
     * so we can inform user that mokku cannot work on this site
     */
    xhook = require("xhook").default;
} catch (error) {
    console.error("Mokku Inject: xhook is not available:", error);

    // Inform user through panel that mokku cannot work on this site
    const errorMessage = {
        error: error.message || "xhook is not available on this site",
        site: location.hostname,
        reason: "This site blocks API mocking for security/ad protection",
        origin: "XHOOK",
    };

    postMessage(errorMessage, MESSAGE_TYPE.ERROR, false);
}

xhook.before(function (request, callback) {
    console.log(810, "Mokku Inject: xhook.before called", request);
    if (!request.mokku) {
        request.mokku = {
            id: logIdFactory.getId(),
        };
    }

    const logEntry = {
        id: request.mokku.id,
        request: getLogRequest(request),
    };

    // headers todo

    // REQUEST_CHECKPOINT_1: Before actual request
    // Send initial log (fire and forget)
    postMessage(logEntry, MESSAGE_TYPE.LOG, false);

    // Handle mock check in a Promise chain
    postMessage(logEntry, MESSAGE_TYPE.CHECK_MOCK, true)
        ?.then((mockServiceResponse) => {
            // REQUEST_CHECKPOINT_6: received mock response from service worker through hook
            if (mockServiceResponse?.mock && mockServiceResponse.mock.active) {
                const mock = mockServiceResponse.mock as IMock;
                console.log("Mokku Inject: Mock response found:", mock);

                const headers = mock.headers
                    ? mock.headers.reduce<Record<string, string>>(
                          (final, header) => {
                              final[header.name] = header.value;
                              return final;
                          },
                          {}
                      )
                    : { "content-type": "application/json; charset=UTF-8" }; // Default headers

                const finalMockedResponse = {
                    status: mock.status,
                    text: mock.response ?? "",
                    headers,
                };

                if (mock.delay && mock.delay > 0) {
                    setTimeout(() => {
                        // @ts-ignore
                        callback(finalMockedResponse as xhook.Response);
                    }, mock.delay);
                } else {
                    // @ts-ignore
                    callback(finalMockedResponse as xhook.Response);
                }
            } else {
                // check for headers here
                postMessage(logEntry, "CHECK_HEADER", true)
                    .then(({ header }: { log: ILog; header: IHeader }) => {
                        try {
                            if (header) {
                                // convert header.headers array to object
                                const headersObject: Record<
                                    string,
                                    string | number
                                > = {};

                                header.headers?.forEach((h) => {
                                    headersObject[h.name] = h.value;
                                });

                                request.headers = {
                                    ...request.headers,
                                    ...headersObject,
                                };
                            }
                            callback();
                        } catch (e) {
                            callback();
                        }
                    })
                    .catch(() => {
                        callback();
                    });
            }
        })
        .catch((error) => {
            console.error("Mokku Inject: Error in xhook.before:", error);
            callback(); // Proceed with original request in case of error
        });
});

xhook.after(async function (request, originalResponse) {
    if (!request.mokku) {
        console.warn(
            "Mokku Inject: Request does not have mokku data, skipping after hook."
        );
        return;
    }

    const responseLog = await getLogResponse(originalResponse);

    const logEntry = {
        id: request.mokku.id,
        response: responseLog,
    };

    postMessage(logEntry, MESSAGE_TYPE.LOG, false);
});
