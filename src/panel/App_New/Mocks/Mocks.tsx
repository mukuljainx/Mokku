import React, { useRef } from "react";
import { Header } from "../Header/Header";
import { Flex, Switch } from "@mantine/core";
import { AddMock } from "./AddMock/AddMock";
import { TableSchema, TableWrapper } from "../Blocks/Table";
import { IMockResponse } from "@mokku/types";
import { debounce } from "lodash";
import { useMockStore, useMockStoreState } from "../store";
import { shallow } from "zustand/shallow";
import * as storeService from "../service/store";
import { notifications } from "@mantine/notifications";
import { MdDeleteOutline, MdOutlineContentCopy } from "react-icons/md";

const getSchema = ({
  toggleMock,
}: {
  toggleMock: (mock: IMockResponse) => void;
}): TableSchema<IMockResponse> => [
  {
    header: "",
    content: (data) => (
      <div
        onClick={(event) => {
          // this was not working with switch for some unknown reason
          event.stopPropagation();
        }}
        style={{ cursor: "pointer" }}
      >
        <Switch
          checked={data.active}
          onChange={(x) => {
            toggleMock({ ...data, active: x.target.checked });
          }}
        />
      </div>
    ),
    width: 60,
  },
  {
    header: "Name",
    content: (data) => data.name,
    width: 240,
  },
  {
    header: "Method",
    content: (data) => data.method,
    width: 100,
  },
  {
    header: "URL",
    content: (data) => data.url,
  },
  {
    header: "Status",
    content: (data) => data.status,
    width: 80,
  },
  {
    header: "Delay",
    content: (data) => data.delay,
    width: 120,
  },
  {
    header: "",
    content: (data) => (
      <Flex align="center" gap={4}>
        <MdDeleteOutline />
        <MdOutlineContentCopy />
      </Flex>
    ),
    width: 240,
  },
];

const useMockStoreSelector = (state: useMockStoreState) => ({
  store: state.store,
  search: state.search.toLowerCase(),
  setSearch: state.setSearch,
  setSelectedMock: state.setSelectedMock,
  selectedMock: state.selectedMock,
  setStoreProperties: state.setStoreProperties,
});

export const Mocks = () => {
  const {
    store,
    search,
    setSearch,
    selectedMock,
    setSelectedMock,
    setStoreProperties,
  } = useMockStore(useMockStoreSelector, shallow);

  const debouncedSetSearch = useRef(debounce(setSearch, 300));
  const toggleMock = (mockToBeUpdated: IMockResponse) => {
    const updatedStore = storeService.updateMocks(store, mockToBeUpdated);
    const mockStatus = mockToBeUpdated.active ? "is enabled" : "is disabled";
    storeService
      .updateStoreInDB(updatedStore)
      .then(setStoreProperties)
      .then(() => {
        notifications.show({
          title: `Mock Toggled`,
          message: `Mock ${mockStatus}`,
        });
      })
      .catch(() => {
        notifications.show({
          title: "Cannot updated mock.",
          message: "Something went wrong, unable to update mock.",
          color: "red",
        });
      });
  };
  const schema = getSchema({ toggleMock });

  const filteredMocks = store.mocks.filter(
    (mock) =>
      mock.name.toLowerCase().includes(search) ||
      mock.url.toLowerCase().includes(search),
    //|| mock.response?.status.toString().includes(search),
  );
  return (
    <Flex direction="column">
      <Header onSearchChange={debouncedSetSearch.current} />
      <TableWrapper
        onRowClick={setSelectedMock}
        selectedRowId={selectedMock?.id}
        data={filteredMocks}
        schema={schema}
      />
      {selectedMock && <AddMock />}
    </Flex>
  );
};
