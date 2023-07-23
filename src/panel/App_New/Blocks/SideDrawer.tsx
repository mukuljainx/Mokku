import React, { ReactNode, useEffect, useRef } from "react";
import { createStyles, Flex } from "@mantine/core";

const MIN_WIDTH = 240;

const useStyles = createStyles((theme) => ({
  wrapper: {
    overflow: "auto",
  },
  dragger: {
    flexShrink: 0,
    width: 4,
    height: "100%",
    background: theme.colors.gray[5],
    cursor: "col-resize",
  },
  container: {
    flexGrow: 2,
    height: "100%",
    minWidth: MIN_WIDTH,
  },
  dots: {
    background: theme.colors.gray[5],
    borderRadius: "50%",
    width: 2,
    height: 2,
  },
  header: {
    borderBottom: `2px solid ${theme.colors.gray[3]}`,
    paddingRight: 4,
    paddingLeft: 8,
    height: 36,
  },
}));

export const SideDrawer = ({
  children,
  minWidth,
  header,
}: {
  children: ReactNode;
  minWidth?: number;
  header?: ReactNode;
}) => {
  const { classes } = useStyles();
  const draggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onDraggerMouseMove = (event) => {
    const mousePosition = event.clientX;
    const elementRightEdge = containerRef.current.getBoundingClientRect().right;
    const width = Math.max(
      minWidth || MIN_WIDTH,
      elementRightEdge - mousePosition,
    );
    containerRef.current.style.width = `${width}px`;
  };

  const onDraggerMouseUp = (event) => {
    document.removeEventListener("mousemove", onDraggerMouseMove);
  };

  const onDraggerMouseDown = (event) => {
    document.addEventListener("mousemove", onDraggerMouseMove);
    document.addEventListener("mouseup", onDraggerMouseUp);
  };

  useEffect(() => {
    draggerRef.current?.addEventListener("mousedown", onDraggerMouseDown);
  }, []);

  return (
    <Flex id="side-drawer" className={classes.wrapper}>
      <div id="dragger" ref={draggerRef} className={classes.dragger} />
      <div
        ref={containerRef}
        className={classes.container}
        style={{ minWidth }}
      >
        <Flex justify="space-between" align="center" className={classes.header}>
          {header}
        </Flex>
        {children}
      </div>
    </Flex>
  );
};
