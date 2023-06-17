import * as React from "react";
import { createRoot } from "react-dom/client";

import { App as AppV2 } from "./App_New/App_New";
import "../dashboard/index.scss";

/**
 * case:
 * http://
 * https://
 * then till next /
 */
const getDomain = (url: string) => {
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
  const host = getDomain(tab?.url) || "invalid";
  const isLocalhost = (tab?.url || "").includes("http://localhost");
  const storeKey = `mokku.extension.active.${host}`;

  chrome.storage.local.get([storeKey], (result) => {
    let active = result[storeKey];
    if (isLocalhost && active === undefined) {
      active = true;
    }

    root.render(
      <AppV2 host={host} tab={tab} active={active} storeKey={storeKey} />,
    );
  });
});
