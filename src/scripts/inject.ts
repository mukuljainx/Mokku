import xhook from "xhook";
import qs from "query-string";

import { IEventMessage, IMockResponse, ILog, IMethod } from "@/types";
import { messageService } from "@/lib";
import { MessageBus } from "@/lib/messageBus";
import { IdFactory } from "@/lib/idFactory";
import { getLogRequest, getLogResponse } from "./requestHelper";

const messageBus = new MessageBus();
const messageIdFactory = new IdFactory();
const logIdFactory = new IdFactory();

messageService.listen("HOOK", (data) => {
    if (data.id) {
        messageBus.dispatch(data.id, data.message);
    }
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
    // Ensure message is serializable
    const safeMessage = JSON.parse(JSON.stringify(message));
    const messageId = ackRequired ? messageIdFactory.getId() : undefined;

    const messageObject: IEventMessage = {
        id: messageId,
        message: safeMessage,
        to: "CONTENT",
        from: "HOOK",
        extensionName: "MOKKU",
        type,
    };

    try {
        messageService.send(messageObject);

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

xhook.before(function (request, callback) {
    if (!request.mokku) {
        request.mokku = {
            id: logIdFactory.getId(),
        };
    }

    const logEntry = {
        id: request.mokku.id,
        request: getLogRequest(request),
    };

    // Send initial log (fire and forget)
    postMessage(logEntry, "LOG", false);

    // Handle mock check in a Promise chain
    postMessage(logEntry, "CHECK_MOCK", true)
        ?.then((mockServiceResponse) => {
            if (mockServiceResponse?.mockResponse) {
                const mock = mockServiceResponse.mockResponse as IMockResponse;
                console.error("Mokku Inject: Mock response found:", mock);

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
                        // @ts-ignore
                        callback(finalMockedResponse as xhook.Response);
                    }, mock.delay);
                } else {
                    // @ts-ignore
                    callback(finalMockedResponse as xhook.Response);
                }
            } else {
                callback(); // No mock, proceed with original request
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
            "Mokku Inject: Request does not have mokku data, skipping after hook.",
        );
        return;
    }

    const responseLog = await getLogResponse(originalResponse);

    const logEntry = {
        id: request.mokku.id,
        response: responseLog,
    };

    postMessage(logEntry, "LOG", false);
});
