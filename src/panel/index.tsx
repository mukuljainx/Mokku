import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
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

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  const host = getDomain(tab?.url) || "invalid";
  const isLocalhost = (tab?.url || "").includes("http://localhost");
  const storeKey = `mokku.extension.active.${host}`;

  chrome.storage.local.get([storeKey], (result) => {
    let active = result[storeKey];
    if (isLocalhost && active === undefined) {
      active = true;
    }

    ReactDOM.render(
      <App host={host} tab={tab} active={active} storeKey={storeKey} />,
      document.getElementById("root")
    );
  });
});

export default App;
