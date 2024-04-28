import React, { useEffect, useState } from "react";
import { App } from "./App";

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

export const AppLoader = ({ tab }: { tab: chrome.tabs.Tab }) => {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const host = getDomain(tab.url) || "invalid";
  const isLocalhost = (tab.url || "").includes("http://localhost");
  const storeKey = `mokku.extension.active.${host}`;

  useEffect(() => {
    chrome.storage.local.get([storeKey], (result) => {
      let tempActive = result[storeKey];
      if (isLocalhost && active === undefined) {
        tempActive = true;
      }
      setActive(tempActive);
      setLoading(false);
    });
  }, []);

  if (!loading) {
    return <App host={host} tab={tab} active={active} storeKey={storeKey} />;
  }

  return null;
};
