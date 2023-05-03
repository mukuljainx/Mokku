import React from "react";
import { shallow } from "zustand/shallow";
import { Tabs, Flex, createStyles, Input, Button } from "@mantine/core";
import { MdAdd } from "react-icons/md";
import { TbSearch } from "react-icons/tb";
import { useViewStore, ViewEnum, viewSelector } from "../store/useViewStore";
import { ThemeButton } from "./ThemeButton";

const useStyles = createStyles((theme) => ({
  wrapper: {
    borderBottom: `1px solid ${theme.colors.dark[7]}`,
  },
}));

export const Header = () => {
  const { view, setView } = useViewStore(viewSelector, shallow);
  const { classes } = useStyles();

  return (
    <Tabs defaultValue={ViewEnum.MOCKS} value={view} onTabChange={setView}>
      <Tabs.List style={{ width: "100%" }}>
        <Flex justify="space-between" align="center" style={{ width: "100%" }}>
          <Flex align="center">
            <Tabs.Tab value={ViewEnum.MOCKS}>Mocks</Tabs.Tab>
            <Tabs.Tab value={ViewEnum.LOGS}>Logs</Tabs.Tab>
            <Button
              leftIcon={<MdAdd />}
              size="xs"
              variant="subtle"
              style={{ marginRight: 16 }}
            >
              Add Mock
            </Button>
            <Input icon={<TbSearch />} placeholder="Search..." size="xs" />
          </Flex>
          <Flex>
            <ThemeButton />
          </Flex>
        </Flex>
      </Tabs.List>
    </Tabs>
  );
};
