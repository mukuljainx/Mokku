import * as xhook from "xhook";
import IdFactory from "./services/idFactory";
import MessageBus from "./services/messageBus";
import { IEventMessage } from "./interface/message";

const messageBus = new MessageBus();
const messageIdFactory = new IdFactory();
const logIdFactory = new IdFactory();

window.addEventListener("message", function (event) {
  // We only accept messages from ourselves
  if (event.source != window) return;

  const data: IEventMessage = event.data;
  if (data.to !== "HOOK_SCRIPT") return;

  console.log("INJECTED FILE: " + data.id + "\n");
  messageBus.dispatch(data.id, data.message);
});

/**
 * Promisfy post message from window to window
 * ackRequired, if false, no id will be assigned hence, no method will be added in message
 * message id was not the problem but function in message bus was
 */
const postMessage = (message, type: IEventMessage["type"], ackRequired) => {
  const messageId = ackRequired ? messageIdFactory.getId() : null;

  const messageObject: IEventMessage = {
    id: messageId,
    message,
    to: "CONTENT_SCRIPT",
    from: "HOOK_SCRIPT",
    extenstionName: "MOKU",
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
  request.moku = {
    id: logIdFactory.getId(),
  };

  const data: IEventMessage["message"] = {
    url: request.url,
    method: request.method,
    id: request.moku.id,
  };
  postMessage(data, "XHOOK_AFTER", false);

  postMessage(
    { url: request.url, method: request.method },
    "XHOOK_BEFORE",
    true
  )
    .then((data) => {
      if (data && (data as any).response) {
        callback((data as any).response);
      } else {
        callback();
      }
    })
    .catch(() => {
      console.log("something went wrong!");
    });
});

xhook.after(function (request, response) {
  const data: IEventMessage["message"] = {
    url: request.url,
    id: request.moku?.id,
    method: request.method,
    status: response.status,
    text: response.text,
  };
  postMessage(data, "XHOOK_AFTER", false);
});
