import React from "react";
import { ILog } from "@mokku/types";
import { createStyles, Flex, Tabs, Title } from "@mantine/core";
import { LogDetailsJSON } from "./LogDetails.JSON";
import { MdClose } from "react-icons/md";
import { LogDetailsHeader } from "./LogDetails.Header";
import { SideDrawer, SideDrawerHeader } from "../../Blocks/SideDrawer";

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
    padding: "0 !important",
    overflow: "auto",
  },
  icon: {
    cursor: "pointer",
    marginRight: 4,
    marginLeft: 4,
  },
  tabs: {
    height: "100%",
  },
}));

export const LogDetails = ({ log, onClose }: IProps) => {
  const { classes } = useStyles();
  return (
    <SideDrawer minWidth={480}>
      <Flex direction="column" style={{ height: "100%" }}>
        <SideDrawerHeader>
          <Title order={6}>Log Details</Title>
          <MdClose style={{ cursor: "pointer" }} onClick={onClose} />
        </SideDrawerHeader>
        <Tabs defaultValue="response" className={classes.tabs}>
          <Flex style={{ height: "100%" }} direction="column">
            <Tabs.List className={classes.tabList}>
              <Flex>
                <Tabs.Tab value="response">Response</Tabs.Tab>
                <Tabs.Tab value="requestBody">Request Body</Tabs.Tab>
                <Tabs.Tab value="queryParams">Query Params</Tabs.Tab>
                <Tabs.Tab value="headers">Headers</Tabs.Tab>
              </Flex>
            </Tabs.List>

            <Tabs.Panel className={classes.panel} value="response" pt="xs">
              <LogDetailsJSON
                id="response"
                isRequestPending={!log?.response?.response}
                response={log?.response?.response}
              />
            </Tabs.Panel>
            <Tabs.Panel className={classes.panel} value="requestBody" pt="xs">
              <LogDetailsJSON
                id="request-body"
                isRequestPending={!log?.response?.response}
                response={log?.request?.body}
              />
            </Tabs.Panel>
            <Tabs.Panel className={classes.panel} value="queryParams" pt="xs">
              <LogDetailsJSON
                id="request-params"
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
      </Flex>
    </SideDrawer>
  );
};
