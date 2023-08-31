import * as React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App_New/App";
import "../dashboard/index.scss";
import { MultipleTabsSelector } from "./App_New/MultipleTabsSelector";
import { AppLoader } from "./App_New/AppLoader";

/**
 * case:
 * http://
 * https://
 * then till next /
 */
export const getDomain = (url: string) => {
  if (!url) {
    return "";
  }
  let domain = url;
  domain = domain.replace("https://", "");
  domain = domain.replace("http://", "");
  domain = domain.replace("https://", "");
  domain = domain.replace("http://", "");
  const domainLastIndex = domain.indexOf("/");
  if (domainLastIndex !== -1) {
    domain = domain.substr(0, domainLastIndex);
  }
  return domain;
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  if (tab) {
    root.render(<AppLoader tab={tab} />);
  } else {
    // mokku is loaded as separate window
    // there can we multiple windows which have active tabs
    // let the user select the right tab as we can't figure this out
    chrome.tabs.query({ active: true, currentWindow: false }, (tabs) => {
      root.render(<MultipleTabsSelector tabs={tabs} />);
    });
  }
});
