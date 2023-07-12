import React from "react";
import { shallow } from "zustand/shallow";
import { Tabs, Flex, createStyles, Input, Button } from "@mantine/core";
import { MdAdd } from "react-icons/md";
import { TbSearch } from "react-icons/tb";
import { useMockStore, useViewStore, ViewEnum, viewSelector } from "../store";
import { ThemeButton } from "./ThemeButton";
import { RefreshButton } from "./RefreshButton";
import { ClearButton } from "./ClearButton";

const useStyles = createStyles((theme) => ({
  wrapper: {
    borderBottom: `1px solid ${theme.colors.dark[7]}`,
  },
}));

interface HeaderProps {
  onSearchChange?: (value: string) => void;
  defaultSearchValue?: string;
}

export const Header = ({ defaultSearchValue, onSearchChange }: HeaderProps) => {
  const { view, setView } = useViewStore(viewSelector, shallow);
  const setSelectedMock = useMockStore((state) => state.setSelectedMock);

  return (
    <Tabs defaultValue={ViewEnum.MOCKS} value={view} onTabChange={setView}>
      <Tabs.List style={{ width: "100%" }}>
        <Flex justify="space-between" align="center" style={{ width: "100%" }}>
          <Flex align="center">
            <Tabs.Tab value={ViewEnum.MOCKS}>Mocks</Tabs.Tab>
            <Tabs.Tab value={ViewEnum.LOGS}>Logs</Tabs.Tab>
            <Flex align="center" gap={8}>
              <Button
                onClick={() => setSelectedMock({})}
                leftIcon={<MdAdd />}
                size="xs"
                variant="subtle"
              >
                Add Mock
              </Button>
              <Input
                icon={<TbSearch />}
                placeholder="Search..."
                size="xs"
                defaultValue={defaultSearchValue}
                onChange={(event) => onSearchChange(event.target.value)}
              />
              <ClearButton />
            </Flex>
          </Flex>
          <Flex gap={4} style={{ paddingRight: 4 }}>
            <ThemeButton />
            <RefreshButton />
          </Flex>
        </Flex>
      </Tabs.List>
    </Tabs>
  );
};
