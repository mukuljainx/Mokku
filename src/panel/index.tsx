import * as React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";

import "@/output.css";
import { MultipleTabsSelector } from "./App/MultipleTabsSelector";
import { AppLoader } from "./App/AppLoader";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

chrome.tabs.get(chrome.devtools.inspectedWindow.tabId, (tab) => {
    if (tab) {
        root.render(<AppLoader tab={tab} />);
    } else {
        root.render(<div>No tab found</div>);
    }
});
