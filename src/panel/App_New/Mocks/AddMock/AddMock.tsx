import {
  createStyles,
  Flex,
  SegmentedControl,
  Tabs,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import * as monaco from "monaco-editor";
import { Editor, loader } from "@monaco-editor/react";
import React from "react";
import { SideDrawer } from "../../Blocks/SideDrawer";
import { MethodEnum, MockStatusEnum } from "../../types/mock";

loader.config({ monaco });

const useStyles = createStyles(() => ({
  flexGrow: {
    flexGrow: 2,
  },
  wrapper: {
    padding: 12,
    height: "100%",
  },
  tabs: {
    flexGrow: 2,
    display: "flex",
    flexDirection: "column",
  },
}));

export const AddMock = () => {
  const {
    classes: { flexGrow, wrapper, tabs },
  } = useStyles();
  return (
    <SideDrawer>
      <Flex direction="column" gap={16} className={wrapper}>
        <Flex gap={12} align="center">
          <Flex direction="column">
            <Text fw={500} fz="sm">
              Status
            </Text>
            <SegmentedControl
              size="xs"
              data={[
                { label: "Active", value: MockStatusEnum.ACTIVE },
                { label: "Inactive", value: MockStatusEnum.INACTIVE },
              ]}
            />
          </Flex>
          <TextInput
            label="Name"
            placeholder="Goals Success"
            className={flexGrow}
          />
        </Flex>
        <Flex gap={12} align="center">
          <Textarea
            className={flexGrow}
            label="Description"
            placeholder="Success case for goals API"
          />
        </Flex>
        <Flex gap={12} align="center">
          <TextInput
            className={flexGrow}
            label="URL"
            placeholder="https://api.awesomeapp.com/goals"
          />
        </Flex>
        <Flex gap={12} align="center">
          <Flex direction="column">
            <Text>Method</Text>
            <SegmentedControl
              size="xs"
              data={[
                { label: "GET", value: MethodEnum.GET },
                { label: "POST", value: MethodEnum.POST },
                { label: "PUT", value: MethodEnum.PUT },
                { label: "PATCH", value: MethodEnum.PATCH },
                { label: "DELETE", value: MethodEnum.DELETE },
              ]}
            />
          </Flex>
          <TextInput label="Status" placeholder="200" />
          <TextInput label="Delay (ms)" placeholder="500" />
        </Flex>
        <Flex className={flexGrow}>
          <Tabs defaultValue="body" className={tabs}>
            <Tabs.List>
              <Tabs.Tab value="body">Response Body</Tabs.Tab>
              <Tabs.Tab value="headers">Response Headers</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="body" pt="xs" className={flexGrow}>
              <Editor
                options={{
                  minimap: { enabled: false },
                }}
                defaultLanguage="json"
                defaultValue={"{}"}
                onValidate={console.log}
              />
            </Tabs.Panel>

            <Tabs.Panel value="headers" pt="xs">
              <Flex gap={12} align="center">
                <TextInput placeholder="Name" className={flexGrow} />
                <TextInput placeholder="Value" className={flexGrow} />
              </Flex>
            </Tabs.Panel>
          </Tabs>
        </Flex>
      </Flex>
    </SideDrawer>
  );
};
