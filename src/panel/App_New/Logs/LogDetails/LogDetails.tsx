import React from "react";
import { ILog } from "@mokku/types";
import { Flex, Tabs } from "@mantine/core";
import { LogDetailsResponse } from "./LogDetails.Response";

interface IProps {
  log: ILog;
  onClose: () => void;
}

export const LogDetails = ({ log, onClose }: IProps) => {
  return (
    <Flex>
      <span onClick={onClose}>close</span>
      <Tabs defaultValue="response">
        <Tabs.List>
          <Tabs.Tab value="response">Response</Tabs.Tab>
          <Tabs.Tab value="requestBody">Request Body</Tabs.Tab>
          <Tabs.Tab value="queryParams">Query Params</Tabs.Tab>
          <Tabs.Tab value="headers">Headers</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="response" pt="xs">
          <LogDetailsResponse response={log.response} />
        </Tabs.Panel>
        <Tabs.Panel value="requestBody" pt="xs">
          Gallery tab content
        </Tabs.Panel>
        <Tabs.Panel value="queryParams" pt="xs">
          Gallery tab content
        </Tabs.Panel>
        <Tabs.Panel value="headers" pt="xs">
          Gallery tab content
        </Tabs.Panel>
      </Tabs>
    </Flex>
  );
};
