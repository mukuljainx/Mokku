import * as xhook from "xhook";
import IdFactory from "./services/idFactory";
import MessageBus from "./services/messageBus";
import { IEventMessage } from "./interface/message";

console.log("INJECTED FILE");

const messageBus = new MessageBus();

const messageIdFactory = new IdFactory();

window.addEventListener("message", function (event) {
  // We only accept messages from ourselves
  if (event.source != window) return;

  const data: IEventMessage = event.data;
  if (data.to !== "HOOK_SCRIPT") return;

  console.log("INJECTED FILE: " + data.id + "\n");
  messageBus.dispatch(data.id, data.message);
});

const postMessage = (message) => {
  const messageId = messageIdFactory.getId();
  const messageObject: IEventMessage = {
    id: messageId,
    message,
    to: "CONTENT_SCRIPT",
    from: "HOOK_SCRIPT",
    extenstionName: "MOKU",
  };
  window.postMessage(messageObject, "*");
  return new Promise((reslove) => {
    messageBus.addLister(messageId, reslove);
  });
};

xhook.before(function (request, callback) {
  postMessage({ url: request.url, method: request.method })
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
