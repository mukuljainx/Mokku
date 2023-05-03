import React from "react";
import { Header } from "../Header/Header";
import { Flex } from "@mantine/core";
import { useLogStore } from "../store/useLogStore";
import { TableSchema, TableWrapper } from "../Blocks/Table";
import { ILog } from "../types/mock";
import { TbServer2, TbCpu } from "react-icons/tb";

export const Logs = () => {
  const logs = useLogStore((state) => state.logs);
  const schema: TableSchema<ILog> = [
    {
      header: "",
      content: (data) => (data.isMocked ? <TbCpu /> : <TbServer2 />),
      width: 40,
    },
    {
      header: "Method",
      content: (data) => data.request?.method,
    },
    {
      header: "URL",
      content: (data) => data.request?.url,
    },
    {
      header: "Status",
      content: (data) => data.response?.status,
    },
    {
      header: "Action",
      content: () => "Action",
    },
  ];
  return (
    <Flex direction="column">
      <Header />
      <TableWrapper data={logs} schema={schema} />
    </Flex>
  );
};
