import React from "react";
import { Button, Flex, useMantineTheme, Tooltip, Text } from "@mantine/core";
import { get } from "lodash";
import {
  useGlobalStore,
  useLogStore,
  useLogStoreState,
  useChromeStore,
} from "../store";
import { TableSchema, TableWrapper } from "../Blocks/Table";
import { ILog } from "../types/mock";
import { TbServer2, TbCpu } from "react-icons/tb";
import { shallow } from "zustand/shallow";
import { getMockFromLog } from "./log.util";
import { Placeholder } from "../Blocks/Placeholder";

const useLogStoreSelector = (state: useLogStoreState) => ({
  logs: state.logs,
  setSelectedLog: state.setSelectedLog,
  selectedLog: state.selectedLog,
});

const getRowColor = (data) => {
  const status = data.response?.status;
  if (status) {
    if (status >= 500 && status < 600) {
      return "red";
    }
  }
};

export const Logs = () => {
  const {
    colors: { blue },
  } = useMantineTheme();
  const { logs, selectedLog, setSelectedLog } = useLogStore(
    useLogStoreSelector,
    shallow,
  );
  const store = useChromeStore((state) => state.store);
  const search = useGlobalStore((state) => state.search).toLowerCase();

  const filteredLogs = logs.filter(
    (log) =>
      (log.request?.method || "").toLowerCase().includes(search) ||
      (log.request?.url || "").toLowerCase().includes(search) ||
      (log.response?.status || "").toString().includes(search),
  );
  const setSelectedMock = useChromeStore((state) => state.setSelectedMock);
  const schema: TableSchema<ILog> = [
    {
      header: "",
      content: (data) =>
        data.isMocked ? (
          <Tooltip label="Mocked Call">
            <span>
              <TbCpu color={blue[6]} />
            </span>
          </Tooltip>
        ) : (
          <Tooltip label="Network Call">
            <span>
              <TbServer2 />
            </span>
          </Tooltip>
        ),
      width: 40,
    },
    {
      header: "Method",
      content: (data) => (
        <Text color={getRowColor(data)}>{data.request?.method}</Text>
      ),
    },
    {
      header: "URL",
      content: (data) => (
        <Text color={getRowColor(data)}>{data.request?.url}</Text>
      ),
    },
    {
      header: "Status",
      content: (data) => (
        <Text color={getRowColor(data)}>{data.response?.status}</Text>
      ),
    },
    {
      header: "Action",
      content: (data) => (
        <Flex
          align="center"
          gap={4}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <Button
            variant="subtle"
            compact
            onClick={() => {
              if (data.isMocked) {
                setSelectedMock(get(store, data.mockPath, {}));
              } else {
                setSelectedMock(getMockFromLog(data));
              }
            }}
          >
            {data.isMocked ? "Edit" : "Mock"}
          </Button>
        </Flex>
      ),
    },
  ];

  if (logs.length === 0) {
    return (
      <Placeholder
        title="No Network calls yet!"
        description="There is no network call yet, all xhr network calls will appear here."
      />
    );
  }

  if (filteredLogs.length === 0) {
    return (
      <Placeholder
        title="No matched Log."
        description="No mock is matching the current search, you can search by method, url or status."
      />
    );
  }

  return (
    <TableWrapper
      onRowClick={setSelectedLog}
      selectedRowId={selectedLog?.id}
      data={filteredLogs}
      schema={schema}
    />
  );
};
