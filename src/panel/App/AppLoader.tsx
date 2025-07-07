import React, { useEffect, useState } from "react";
import { getDomain } from "../../utils/getDomain";
import { Home } from "../screens/Home";
import { TooltipProvider } from "@/components/ui/tooltip";
import { InActive } from "../screens/InActive";
import { getStoreKey } from "@/services/constants";
import { useAppStore } from "../store/useAppStore";

export const AppLoader = ({ tab }: { tab: chrome.tabs.Tab }) => {
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(false);
    const host = getDomain(tab.url) || "invalid";
    const isLocalhost = (tab.url || "").includes("http://localhost");
    const storeKey = getStoreKey(host);
    const setHost = useAppStore((state) => state.setHost);
    const setTab = useAppStore((state) => state.setTab);

    useEffect(() => {
        if (!active) {
            chrome.storage.local.get([storeKey], (result) => {
                let tempActive = result[storeKey] || false;
                if (tempActive === false) {
                    setActive(false);
                    setLoading(false);
                    return;
                }

                // if tempActive is undefined, check if it's localhost
                if (isLocalhost) {
                    setActive(true);
                }
                setLoading(false);
            });
        }
    }, [active]);

    useEffect(() => {
        setHost(host);
    }, []);

    useEffect(() => {
        setTab(tab);
    }, [tab]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!active) {
        return <InActive storeKey={storeKey} tab={tab} />;
    }

    return (
        <TooltipProvider>
            <Home />
        </TooltipProvider>
    );
};
