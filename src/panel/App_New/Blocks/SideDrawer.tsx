import React, { ReactNode, useEffect, useRef } from "react";
import { Center, createStyles, Flex, Portal } from "@mantine/core";
import { MdDragIndicator } from "react-icons/md";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "fixed",
    top: 0,
    right: 0,
    height: "100vh",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    zIndex: 1000,
    background: "white",
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
  },
  dots: {
    background: theme.colors.gray[5],
    borderRadius: "50%",
    width: 2,
    height: 2,
  },
}));

export const SideDrawer = ({ children }: { children: ReactNode }) => {
  const { classes } = useStyles();
  const draggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onDraggerMouseMove = (event) => {
    const diff = event.clientX;
    containerRef.current.style.width = `calc(100vw - ${diff}px)`;
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
    <Flex className={classes.wrapper} id="side-drawer">
      <Center id="dragger" ref={draggerRef} className={classes.dragger}>
        {/* <Flex direction="column" gap="2px">
          <span className={classes.dots}></span>
          <span className={classes.dots}></span>
          <span className={classes.dots}></span>
        </Flex> */}
      </Center>
      <div ref={containerRef} className={classes.container}>
        {children}
      </div>
    </Flex>
  );
};
