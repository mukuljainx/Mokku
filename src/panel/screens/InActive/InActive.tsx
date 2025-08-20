import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { MessageService } from "@/lib";
import React from "react";

const messageService = new MessageService("PANEL");

export const InActive = ({
    storeKey,
    tab,
}: {
    storeKey: string;
    tab: chrome.tabs.Tab;
}) => {
    const handleActiveClick = () => {
        chrome.storage.local.set({ [storeKey]: true }, () => {
            chrome.tabs.update(tab.id, { url: tab.url });
            location.reload();
        });
        messageService.send("CONTENT", {
            type: "MOKKU_ACTIVATED",
        });
    };

    const handleRefresh = () => {
        location.reload();
    };

    return (
        <div className="flex flex-col h-full w-full items-center justify-center gap-4">
            <div className="flex flex-col justify-center text-center">
                <div className="flex justify-center mb-2">
                    <Logo iconOnly className="block" />
                </div>
                <h1 className="text-2xl font-bold">Mokku is Inactive</h1>
                <p className="text-gray-600 mb-4">
                    Please enable Mokku to start capturing and mocking requests.
                </p>
                <div className="flex items-center gap-2 justify-center">
                    <Button size="sm" onClick={handleActiveClick}>
                        Enable Mokku
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleRefresh}>
                        Refresh Mokku
                    </Button>
                </div>
            </div>
        </div>
    );
};
