import React, { useEffect, useState } from "react";
import { getDomain } from "../../utils/getDomain";
import { Home } from "../screens/Home";
import { TooltipProvider } from "@/components/ui/tooltip";
import { InActive } from "../screens/InActive";
import { getStoreKey } from "@/services/constants";
import { useAppStore } from "../store/useAppStore";
import { useMetaEventsListener } from "../hooks/useMetaEventsListener";

export const AppLoader = ({ tab }: { tab: chrome.tabs.Tab }) => {
    useMetaEventsListener(tab);
    const { active, loading, host } = useAppStore();

    const storeKey = getStoreKey(host);

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
