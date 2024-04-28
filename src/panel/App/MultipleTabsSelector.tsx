import { Button, Card, Flex, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { AppLoader } from "./AppLoader";

const SELECTED_TAB_KEY = "mokku.temp.multi.tab.selection";

export const MultipleTabsSelector = ({ tabs }: { tabs: chrome.tabs.Tab[] }) => {
  const [selectedTab, setSelectedTab] = useState<chrome.tabs.Tab>(
    tabs.length === 1 ? tabs[0] : undefined,
  );

  useEffect(() => {
    const tabId = localStorage.getItem(SELECTED_TAB_KEY);
    localStorage.removeItem(SELECTED_TAB_KEY);
    if (tabId && tabs.length > 1) {
      const prevSelectedTabId = tabs.find((tab) => tab.id === parseInt(tabId));
      if (prevSelectedTabId) {
        setSelectedTab(prevSelectedTabId);
      }
    }
  }, []);

  const handleClick = (tab: chrome.tabs.Tab) => {
    setSelectedTab(tab);
    localStorage.setItem(SELECTED_TAB_KEY, tab.id.toString() || "");
  };

  if (selectedTab) {
    return <AppLoader tab={selectedTab} />;
  }

  return (
    <Card>
      <Flex direction="column">
        <Title align="center" order={5}>
          Multiple Active Windows
        </Title>
        <Text mb="16px" align="center">
          Multiple browser windows are active (apart from this one). Mokku
          cannot decide which one to mock, please select the tab you want to
          mock from the following.
        </Text>
        {tabs.map((tab) => {
          return (
            <Card key={tab.id} shadow="sm" radius="md" withBorder mb="8px">
              <Flex justify="space-between">
                <Flex direction="column">
                  <Flex>
                    <Text mr="4px" fw={500}>
                      Title:
                    </Text>
                    <Text>{tab.title}</Text>
                  </Flex>
                  <Flex>
                    <Text mr="4px" fw={500}>
                      URL:
                    </Text>
                    <Text>{tab.url}</Text>
                  </Flex>
                </Flex>
                <Button onClick={() => handleClick(tab)}>Select</Button>
              </Flex>
            </Card>
          );
        })}
      </Flex>
    </Card>
  );
};
