import React from "react";
import { ILog } from "@mokku/types";
import { createStyles, Flex, Tabs } from "@mantine/core";
import { LogDetailsJSON } from "./LogDetails.JSON";
import { MdClose } from "react-icons/md";
import { LogDetailsHeader } from "./LogDetails.Header";

interface IProps {
  log: ILog;
  onClose: () => void;
}

const useStyles = createStyles((theme) => ({
  tabList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  panel: {
    flexGrow: 2,
  },
  icon: {
    cursor: "pointer",
    marginRight: 4,
    marginLeft: 4,
  },
}));

export const LogDetails = ({ log, onClose }: IProps) => {
  const { classes } = useStyles();
  return (
    <Tabs defaultValue="response" style={{ height: "100%" }}>
      <Flex style={{ height: "100%" }} direction="column">
        <Tabs.List className={classes.tabList}>
          <Flex>
            <Tabs.Tab value="response">Response</Tabs.Tab>
            <Tabs.Tab value="requestBody">Request Body</Tabs.Tab>
            <Tabs.Tab value="queryParams">Query Params</Tabs.Tab>
            <Tabs.Tab value="headers">Headers</Tabs.Tab>
          </Flex>
          <MdClose className={classes.icon} onClick={onClose} />
        </Tabs.List>

        <Tabs.Panel className={classes.panel} value="response" pt="xs">
          <LogDetailsJSON
            isRequestPending={!log?.response?.response}
            response={log?.response?.response}
          />
        </Tabs.Panel>
        <Tabs.Panel className={classes.panel} value="requestBody" pt="xs">
          <LogDetailsJSON
            isRequestPending={!log?.response?.response}
            response={log?.request?.body}
          />
        </Tabs.Panel>
        <Tabs.Panel className={classes.panel} value="queryParams" pt="xs">
          <LogDetailsJSON
            isRequestPending={!log?.response?.response}
            response={log?.request?.queryParams}
          />
        </Tabs.Panel>
        <Tabs.Panel className={classes.panel} value="headers" pt="xs">
          <LogDetailsHeader
            responseHeaders={log?.response?.headers}
            requestHeaders={log?.request?.headers}
          />
        </Tabs.Panel>
      </Flex>
    </Tabs>
  );
};
