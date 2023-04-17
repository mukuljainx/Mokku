import * as React from "react";
import * as ReactDOM from "react-dom";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

import config from "./firebase.config";
import { ThemeProvider } from "styled-components";
import theme from "../components/theme";

firebase.initializeApp(config);

import "./index.scss";
import App from "./App";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

chrome.runtime.onMessage.addListener((message, sender, response) => {
  //!this.checkIfSameTab(sender.tab)) return;
  console.log(message);
});
