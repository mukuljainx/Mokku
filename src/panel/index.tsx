import * as React from "react";
import { createRoot } from "react-dom/client";

import "@/output.css";
import { MultipleTabsSelector } from "./App/MultipleTabsSelector";
import { AppLoader } from "./App/AppLoader";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

chrome.tabs.get(chrome.devtools.inspectedWindow.tabId, (tab) => {
    if (tab) {
        root.render(<AppLoader tab={tab} />);
    } else {
        // This should not happen as we are getting tabId from devtools
        // but to make things safe here
        chrome.tabs.query({ active: true, currentWindow: false }, (tabs) => {
            root.render(<MultipleTabsSelector tabs={tabs} />);
        });
    }
});
