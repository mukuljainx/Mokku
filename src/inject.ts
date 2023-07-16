import xhook from "xhook";
import { v4 as uuidv4 } from "uuid";
import { parse } from "query-string";

import IdFactory from "./services/idFactory";
import MessageBus from "./services/message/messageBus";
import { IEventMessage } from "./interface/message";
import { IMockResponse, ILog } from "./interface/mock";
import { getHeaders } from "./services/helper";
import messageService from "./services/message";

const messageBus = new MessageBus();
const messageIdFactory = new IdFactory();

messageService.listen("HOOK", (data) => {
  messageBus.dispatch(data.id, data.message);
});

/**
 * Promisify post message from window to window
 * ackRequired, if false, no id will be assigned hence, no method will be added in message
 * message id was not the problem but function in message bus was
 */
const postMessage = (
  message: IEventMessage["message"],
  type: IEventMessage["type"],
  ackRequired,
) => {
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
    return new Promise((reslove) => {
      messageBus.addLister(messageId, reslove);
    });
  }
};

xhook.before(function (request, callback) {
  request.mokku = {
    id: uuidv4(),
  };

  const data: IEventMessage["message"] = getLog(request);
  postMessage(data, "LOG", false);

  postMessage(data, "NOTIFICATION", true)
    .then((data: { mockResponse: IMockResponse }) => {
      if (data && data.mockResponse) {
        const mock = data.mockResponse;

        const headers = mock.headers
          ? mock.headers.reduce<Record<string, string>>((final, header) => {
              final[header.name] = header.value;
              return final;
            }, {})
          : {
              "content-type": "application/json; charset=UTF-8",
            };

        const finalResponse = {
          status: mock.status,
          text: mock.response ? mock.response : "",
          headers,
          type: "json",
        };

        if (mock.delay) {
          setTimeout(() => {
            callback(finalResponse);
          }, mock.delay);
        } else {
          callback(finalResponse);
        }
      } else {
        callback();
      }
    })
    .catch(() => {
      console.log("something went wrong!");
    });
});

const getLog = (
  request: Omit<ILog["request"], "headers"> & {
    headers: Record<string, string>;
    mokku?: {
      id: string;
    };
  },
  response?: ILog["response"],
): IEventMessage["message"] => {
  const separator = request.url.indexOf("?");
  const url = separator !== -1 ? request.url.substr(0, separator) : request.url;
  const queryParams =
    separator !== -1
      ? JSON.stringify(parse(request.url.substr(separator)))
      : undefined;

  let body = request.body;

  try {
    if (typeof body === "object") {
      const stringifiedBody = JSON.stringify(body);
      body = stringifiedBody;
    }
  } catch (e) {
    body = "Unsupported body type!";
  }

  return {
    request: {
      url,
      body,
      queryParams,
      method: request.method,
      headers: getHeaders(request.headers),
    },
    response,
    id: request.mokku?.id,
  };
};

xhook.after(function (request, originalResponse) {
  try {
    if (typeof originalResponse.clone === "function") {
      const response = originalResponse.clone();
      if (typeof response.text === "string") {
        const data: IEventMessage["message"] = getLog(request, {
          status: response.status,
          response: response.text,
          headers: getHeaders(response.headers),
        });
        postMessage(data, "LOG", false);
      } else {
        response.text().then((streamedResponse) => {
          const data: IEventMessage["message"] = getLog(request, {
            status: response.status,
            response: streamedResponse,
            headers: getHeaders(response.headers),
          });
          postMessage(data, "LOG", false);
        });
      }
    } else {
      const data: IEventMessage["message"] = getLog(request, {
        status: originalResponse.status,
        response:
          typeof originalResponse.text === "string"
            ? originalResponse.text
            : "Cannot parse response, logging libraries can cause this.",
        headers: getHeaders(originalResponse.headers),
      });
      postMessage(data, "LOG", false);
    }
  } catch (error) {
    const data: IEventMessage["message"] = getLog(request, {
      status: 0,
      response: undefined,
      headers: [],
    });
    postMessage(data, "LOG", false);
    console.log("INJECT_ERROR", error);
  }
});
