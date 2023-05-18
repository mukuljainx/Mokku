import React, { ReactNode } from "react";
import { createStyles, Portal } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "fixed",
    top: 0,
    right: 0,
    height: "100vh",
    background: theme.colors.gray[0],
  },
}));

export const SiteDrawer = ({ children }: { children: ReactNode }) => {
  const { classes } = useStyles();
  return (
    <Portal>
      <div className={classes.wrapper}>{children}</div>
    </Portal>
  );
};
