import React, { useEffect, useState } from "react";
import { AppProvider } from "./AppProvider";
import { getDomain } from "../../utils/getDomain";
import { PanelProvider } from "../../mokku-web-app-connector/panel/PanelProvider";

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

    return <PanelProvider />;

    if (!loading) {
        return (
            <AppProvider
                host={host}
                tab={tab}
                active={active}
                storeKey={storeKey}
            />
        );
    }

    return null;
};
