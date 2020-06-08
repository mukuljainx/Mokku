import * as xhook from "xhook";
import IdFactory from "./services/idFactory";
import MessageBus from "./services/messageBus";
import { IEventMessage } from "./interface/message";
import { IMockResponse } from "./interface/mock";

const messageBus = new MessageBus();
const messageIdFactory = new IdFactory();
const logIdFactory = new IdFactory();

window.addEventListener("message", function (event) {
  // We only accept messages from ourselves
  if (event.source != window) return;

  const data: IEventMessage = event.data;
  if (data.to !== "HOOK_SCRIPT") return;

  messageBus.dispatch(data.id, data.message);
});

/**
 * Promisfy post message from window to window
 * ackRequired, if false, no id will be assigned hence, no method will be added in message
 * message id was not the problem but function in message bus was
 */
const postMessage = (
  message: IEventMessage["message"],
  type: IEventMessage["type"],
  ackRequired
) => {
  const messageId = ackRequired ? messageIdFactory.getId() : null;

  const messageObject: IEventMessage = {
    id: messageId,
    message,
    to: "CONTENT_SCRIPT",
    from: "HOOK_SCRIPT",
    extenstionName: "MOKKU",
    type,
  };
  window.postMessage(messageObject, "*");

  if (messageId !== null) {
    return new Promise((reslove) => {
      messageBus.addLister(messageId, reslove);
    });
  }
};

xhook.before(function (request, callback) {
  request.mokku = {
    id: logIdFactory.getId(),
    isMocked: false,
  };

  const data: IEventMessage["message"] = {
    request: {
      url: request.url,
      method: request.method,
    },
    id: request.mokku.id,
  };
  postMessage(data, "LOG", false);

  postMessage(data, "QUERY", true)
    .then((data: { mockResponse: IMockResponse }) => {
      if (data && data.mockResponse) {
        request.mokku.isMocked = true;
        const mock = data.mockResponse;
        const finalResponse = {
          status: mock.status,
          text: mock.response ? mock.response : "",
          type: "json",
          headers: {
            "content-type": "application/json; charset=UTF-8",
          },
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

xhook.after(function (request, originalResponse) {
  const response = originalResponse.clone();
  if (typeof response.text === "string") {
    const data: IEventMessage["message"] = {
      request: {
        url: request.url,
        method: request.method,
      },
      response: { status: response.status, response: response.text },
      id: request.mokku?.id,
      isMocked: request.mokku?.isMocked,
    };
    postMessage(data, "LOG", false);
  } else {
    response.text().then((streamedResponse) => {
      const data: IEventMessage["message"] = {
        request: {
          url: request.url,
          method: request.method,
        },
        response: { status: response.status, response: streamedResponse },
        id: request.mokku?.id,
        isMocked: request.mokku?.isMocked,
      };
      postMessage(data, "LOG", false);
    });
  }
});
