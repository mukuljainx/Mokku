import React from "react";
import { shallow } from "zustand/shallow";
import { Tabs, Flex, createStyles, Input, Button } from "@mantine/core";
import { MdAdd } from "react-icons/md";
import { TbSearch } from "react-icons/tb";
import {
  useMockStore,
  useGlobalStore,
  ViewEnum,
  useGlobalStoreState,
} from "../store";
import { ThemeButton } from "./ThemeButton";
import { RefreshButton } from "./RefreshButton";
import { ClearButton } from "./ClearButton";
import { RecordButton } from "./RecordButton";

const viewSelector = (state: useGlobalStoreState) => ({
  view: state.view,
  setView: state.setView,
  search: state.search,
  setSearch: state.setSearch,
});

export const Header = () => {
  const { view, setView, search, setSearch } = useGlobalStore(
    viewSelector,
    shallow,
  );
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
                defaultValue={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <RecordButton />
              {view === "LOGS" ? <ClearButton /> : null}
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
