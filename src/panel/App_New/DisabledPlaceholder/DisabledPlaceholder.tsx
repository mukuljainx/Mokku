import React from "react";
import { Flex, Paper, Button, Highlight, createStyles } from "@mantine/core";
import { useGlobalStore } from "../store/useGlobalStore";

const useStyles = createStyles((theme) => ({
  full: {
    height: "100%",
    width: "100%",
  },
}));

export const DisabledPlaceholder = () => {
  const active = useGlobalStore((state) => state.meta.active);
  const storeKey = useGlobalStore((state) => state.meta.storeKey);
  const tab = useGlobalStore((state) => state.meta.tab);

  console.log("DISABLED", storeKey);

  const { classes } = useStyles();
  const onClick = () => {
    chrome.storage.local.set({ [storeKey]: !active }, () => {
      chrome.tabs.update(tab.id, { url: tab.url });
      location.reload();
    });
  };

  return (
    <Paper className={classes.full}>
      <Flex justify="center" align="center" className={classes.full}>
        <Flex direction="column" align="center">
          <Highlight highlight="refresh the current page">
            Mocking is disabled by default on non-localhost urls. Enabling will
            refresh the current page.
          </Highlight>
          <Button size="xs" onClick={onClick}>
            Enable Mocking
          </Button>
        </Flex>
      </Flex>
    </Paper>
  );
};
