import * as React from "react";
import { useEffect, useState } from "react";
import { AppLoader } from "./AppLoader_DEPRECATED";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SELECTED_TAB_KEY = "mokku.temp.multi.tab.selection";

export const MultipleTabsSelector = ({ tabs }: { tabs: chrome.tabs.Tab[] }) => {
    const [selectedTab, setSelectedTab] = useState<chrome.tabs.Tab | undefined>(
        tabs.length === 1 ? tabs[0] : undefined
    );

    useEffect(() => {
        const tabId = localStorage.getItem(SELECTED_TAB_KEY);
        localStorage.removeItem(SELECTED_TAB_KEY);
        if (tabId && tabs.length > 1) {
            const prevSelectedTabId = tabs.find(
                (tab) => tab.id === parseInt(tabId)
            );
            if (prevSelectedTabId) {
                setSelectedTab(prevSelectedTabId);
            }
        }
    }, []);

    const handleClick = (tab: chrome.tabs.Tab) => {
        setSelectedTab(tab);
        localStorage.setItem(SELECTED_TAB_KEY, tab.id?.toString() || "");
    };

    if (selectedTab) {
        return <AppLoader tab={selectedTab} />;
    }

    return (
        <Card>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <h4 className="text-center text-4xl">
                        Multiple Active Windows
                    </h4>
                    <p className="text-center mb-4">
                        Multiple browser windows are active (apart from this
                        one). Mokku cannot decide which one to mock, please
                        select the tab you want to mock from the following.
                    </p>
                    {tabs.map((tab) => {
                        return (
                            <Card
                                key={tab.id}
                                className="flex flex-col gap-4"
                                // shadow="sm"
                                // radius="md"
                                // withBorder
                                // mb="8px"
                            >
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <div className="flex">
                                            <p className="font-semibold mr-1">
                                                Title:
                                            </p>
                                            <p>{tab.title}</p>
                                        </div>
                                        <div className="flex">
                                            <p className="font-semibold mr-1">
                                                URL:
                                            </p>
                                            <p>{tab.url}</p>
                                        </div>
                                    </div>
                                    <Button onClick={() => handleClick(tab)}>
                                        Select
                                    </Button>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};
