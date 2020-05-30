import * as React from "react";
import * as ReactDOM from "react-dom";
import { IPortMessage } from "../interface/message";

var x: IPortMessage;
x;

const port = chrome.runtime.connect({ name: "extension:moku" });

// background script to content script end

port.onMessage.addListener(function (msg) {});

import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
