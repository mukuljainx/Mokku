import React, { useEffect, useState } from "react";
import { getDomain } from "../../utils/getDomain";
import { Home } from "../screens/Home";
import { TooltipProvider } from "@/components/ui/tooltip";

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

    return (
        <TooltipProvider>
            <Home />
        </TooltipProvider>
    );
};
