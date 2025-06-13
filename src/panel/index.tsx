import * as React from "react";
import * as Sentry from "@sentry/react";
import { createRoot } from "react-dom/client";

import "../dashboard/index.scss";
import { MultipleTabsSelector } from "./App/MultipleTabsSelector";
import { AppLoader } from "./App/AppLoader";

// enable sentry
Sentry.init({
    dsn:
        "https://295710d47ec2a821111e6d0c6542417d@o4505806318469120.ingest.sentry.io/4505806320697344",
    // Performance Monitoring
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

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

chrome.tabs.get(chrome.devtools.inspectedWindow.tabId, (tab) => {
    if (tab) {
        root.render(<AppLoader tab={tab} />);
    } else {
        // This should not happen as we are getting tabId from devtools
        // but to make things safe here
        chrome.tabs.query({ active: true, currentWindow: false }, (tabs) => {
            console.log(
                911,
                tabs.map(({ id, url }) => ({ id, url })),
            );
            root.render(<MultipleTabsSelector tabs={tabs} />);
        });
    }
});
