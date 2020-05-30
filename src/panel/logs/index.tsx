import * as React from "react";
// import * as xhook from "xhook";

// console.log(xhook);

const Logs = () => {
  const [log, updateLog] = React.useState("");
  // xhook.before(function (request, callback) {
  //   //asynchronously...
  //   console.log(request.url);
  //   updateLog(request.url);
  //   setTimeout(function () {
  //     //callback with a fake response
  //     callback({
  //       status: 200,
  //       text: "this is the third text file example (example3.txt)",
  //       headers: {
  //         Foo: "Bar",
  //       },
  //     });
  //   }, 500);
  // });

  // chrome.devtools.network.onRequestFinished.addListener(function (request) {
  //   console.log(request);
  // });

  return <div>Log : {log}</div>;
};

export default Logs;
