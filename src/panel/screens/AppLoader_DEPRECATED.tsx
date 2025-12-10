import * as React from "react";
import { useEffect, useState } from "react";
import { getDomain } from "@/lib/domain";
import { Home } from "./Home";
import { TooltipProvider } from "@/components/ui/tooltip";
// import { PanelProvider } from "../../mokku-web-app-connector/panel/PanelProvider";

// not being used anywhere at the moment
// to be deleted
export const AppLoader = ({ tab }: { tab: chrome.tabs.Tab }) => {
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
        });
    }, []);

    return (
        <TooltipProvider>
            <Home />
        </TooltipProvider>
    );
};
