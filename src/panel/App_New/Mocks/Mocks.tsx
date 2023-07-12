import React, { useRef } from "react";
import { Header } from "../Header/Header";
import { ActionIcon, Flex, Switch } from "@mantine/core";
import { AddMock } from "./AddMock/AddMock";
import { TableSchema, TableWrapper } from "../Blocks/Table";
import { IMockResponse } from "@mokku/types";
import { debounce } from "lodash";
import { useMockStore, useMockStoreState } from "../store";
import { shallow } from "zustand/shallow";
import * as storeService from "../service/store";
import { notifications } from "@mantine/notifications";
import { MdDeleteOutline, MdOutlineContentCopy } from "react-icons/md";
import { useMockActions } from "./Mocks.action";

interface GetSchemeProps {
  toggleMock: (mock: IMockResponse) => void;
  deleteMock: (mock: IMockResponse) => void;
  editMock: (mock: IMockResponse) => void;
  duplicateMock: (mock: IMockResponse) => void;
}

const getSchema = ({
  toggleMock,
  deleteMock,
  duplicateMock,
}: GetSchemeProps): TableSchema<IMockResponse> => [
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
      <Flex
        align="center"
        gap={4}
        onClick={(event) => {
          // this was not working with switch for some unknown reason
          event.stopPropagation();
        }}
      >
        <ActionIcon
          variant="outline"
          color="red"
          onClick={() => deleteMock(data)}
          title={`Delete ${data.name}`}
        >
          <MdDeleteOutline />
        </ActionIcon>
        <ActionIcon
          variant="outline"
          color="blue"
          onClick={() => duplicateMock(data)}
          title={`Duplicate ${data.name}`}
        >
          <MdOutlineContentCopy />
        </ActionIcon>
      </Flex>
    ),
    width: 80,
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
  } = useMockStore(useMockStoreSelector, shallow);

  const debouncedSetSearch = useRef(debounce(setSearch, 300));
  const { deleteMock, duplicateMock, toggleMock, editMock } = useMockActions();

  const schema = getSchema({
    toggleMock,
    deleteMock,
    duplicateMock,
    editMock,
  });

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
        onRowClick={(data) => setSelectedMock(data)}
        selectedRowId={selectedMock?.id}
        data={filteredMocks}
        schema={schema}
      />
      {selectedMock && <AddMock />}
    </Flex>
  );
};
