import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";

/**
 * case:
 * http://
 * https://
 * http://www.
 * https://www.
 *
 * then till next /
 */
const getDomain = (url: string) => {
  let domain = url;
  domain = domain.replace("https://www.", "");
  domain = domain.replace("http://www.", "");
  domain = domain.replace("https://", "");
  domain = domain.replace("http://", "");
  const domainLastIndex = domain.indexOf("/");
  if (domainLastIndex !== -1) {
    domain = domain.substr(0, domainLastIndex);
  }
  return domain;
};

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  ReactDOM.render(
    <App domain={getDomain(tab.url)} tab={tab} />,
    document.getElementById("root")
  );
});

export default App;
