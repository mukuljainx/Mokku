import React from "react";
import { ActionIcon } from "@mantine/core";
import { ImSwitch } from "react-icons/im";
import { useGlobalStore } from "../store/useGlobalStore";

export const SwitchButton = () => {
  const active = useGlobalStore((state) => state.meta.active);
  const storeKey = useGlobalStore((state) => state.meta.storeKey);
  const toggleActive = () => {
    chrome.storage.local.set({ [storeKey]: !active }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
        location.reload();
      });
    });
  };

  return (
    <ActionIcon
      variant="outline"
      color="red"
      onClick={() => toggleActive()}
      title="Disable Mocking"
    >
      <ImSwitch />
    </ActionIcon>
  );
};
