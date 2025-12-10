import React from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, RefreshCcw, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/panel/store/useAppStore";
import { getStoreKey } from "@/services/constants";

export const MokkuActionMenu = () => {
    const host = useAppStore((state) => state.host);
    const tab = useAppStore((state) => state.tab);

    const disableMokku = () => {
        const storeKey = getStoreKey(host);

        chrome.storage.local.set({ [storeKey]: false }, () => {
            chrome.tabs.update(tab.id, { url: tab.url });
            location.reload();
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    <Ellipsis />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    onClick={() => {
                        location.reload();
                    }}
                >
                    <RefreshCcw />
                    Reload Mokku
                </DropdownMenuItem>
                <DropdownMenuItem onClick={disableMokku}>
                    <StopCircle />
                    Disable Mokku
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
