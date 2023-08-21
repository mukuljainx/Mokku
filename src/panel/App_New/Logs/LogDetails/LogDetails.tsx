import React from "react";
import { ILog } from "@mokku/types";
import {
  Button,
  Card,
  createStyles,
  Flex,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { LogDetailsJSON } from "./LogDetails.JSON";
import { MdClose } from "react-icons/md";
import { LogDetailsHeader } from "./LogDetails.Header";
import { SideDrawer, SideDrawerHeader } from "../../Blocks/SideDrawer";
import { getMockFromLog } from "../log.util";
import { useChromeStore } from "../../store/useMockStore";

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
  card: {
    display: "flex",
    flexDirection: "column",
    padding: "0 !important",
    height: "100%",
    borderRadius: 0,
  },
  urlWrapper: {
    padding: "4px 8px",
    borderBottom: `2px solid ${theme.colors.gray[3]}`,
    overflow: "auto",
    flexShrink: 0,
  },
  jsonWrapper: {
    maxWidth: "100%",
  },
}));

export const LogDetails = ({ log, onClose }: IProps) => {
  const { classes } = useStyles();
  const setSelectedMock = useChromeStore((state) => state.setSelectedMock);
  const addMock = () => {
    setSelectedMock(getMockFromLog(log));
  };
  return (
    <SideDrawer minWidth={480}>
      <Card className={classes.card}>
        <SideDrawerHeader>
          <Flex align="center" gap={4}>
            <Title order={6}>Log Details</Title>
            <Button compact variant="subtle" onClick={addMock}>
              Mock
            </Button>
          </Flex>
          <MdClose style={{ cursor: "pointer" }} onClick={onClose} />
        </SideDrawerHeader>
        <Flex className={classes.urlWrapper}>
          <Text fz="sm" fw={500}>
            URL:
          </Text>
          <Text style={{ flexShrink: 0 }} fz="sm">
            {" "}
            {log.request?.url}
          </Text>
        </Flex>
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
              <div className={classes.jsonWrapper}>
                <LogDetailsJSON
                  id="response"
                  isRequestPending={!log?.response?.response}
                  response={log?.response?.response}
                />
              </div>
            </Tabs.Panel>
            <Tabs.Panel className={classes.panel} value="requestBody" pt="xs">
              <div className={classes.jsonWrapper}>
                <LogDetailsJSON
                  id="request-body"
                  isRequestPending={!log?.response?.response}
                  response={log?.request?.body}
                />
              </div>
            </Tabs.Panel>
            <Tabs.Panel className={classes.panel} value="queryParams" pt="xs">
              <div className={classes.jsonWrapper}>
                <LogDetailsJSON
                  id="request-params"
                  isRequestPending={!log?.response?.response}
                  response={log?.request?.queryParams}
                />
              </div>
            </Tabs.Panel>
            <Tabs.Panel className={classes.panel} value="headers" pt="xs">
              <LogDetailsHeader
                responseHeaders={log?.response?.headers}
                requestHeaders={log?.request?.headers}
              />
            </Tabs.Panel>
          </Flex>
        </Tabs>
      </Card>
    </SideDrawer>
  );
};
