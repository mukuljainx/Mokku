import React from "react";
import {
  Title,
  Flex,
  Paper,
  Button,
  Highlight,
  createStyles,
} from "@mantine/core";
import { IAppProps } from "../App_New";

const useStyles = createStyles((theme) => ({
  full: {
    height: "100%",
    width: "100%",
  },
}));

export const DisabledPlaceholder = ({
  active,
  storeKey,
}: Pick<IAppProps, "active" | "storeKey">) => {
  const { classes } = useStyles();
  const onClick = () => {
    chrome.storage.local.set({ [storeKey]: !active }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
        location.reload();
      });
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
