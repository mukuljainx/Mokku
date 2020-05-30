chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((message) => {
    console.log(message);
  });
});

chrome.storage.local.set({
  xx2: {
    test: {
      a: 3,
    },
  },
});

setTimeout(() => {
  chrome.storage.local.get(["xx2"], function (result) {
    console.log("Value currently is " + result.xx2);
  });
}, 100);
