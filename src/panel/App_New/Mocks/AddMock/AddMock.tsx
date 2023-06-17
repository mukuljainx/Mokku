import {
  Button,
  createStyles,
  Flex,
  SegmentedControl,
  Tabs,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import React from "react";
import { SideDrawer } from "../../Blocks/SideDrawer";
import { IMockResponseRaw, MethodEnum, MockStatusEnum } from "../../types";
import { useForm } from "@mantine/form";
import { MdDeleteOutline, MdOutlineAdd } from "react-icons/md";

const useStyles = createStyles(() => ({
  flexGrow: {
    flexGrow: 2,
  },
  wrapper: {
    padding: 12,
    height: "100%",
    overflow: "auto",
  },
  tabs: {
    flexGrow: 2,
    display: "flex",
    flexDirection: "column",
  },
}));

interface IProps {
  mock?: IMockResponseRaw;
}

export const AddMock = ({ mock }: IProps) => {
  const {
    classes: { flexGrow, wrapper, tabs },
  } = useStyles();

  const form = useForm<IMockResponseRaw>({
    initialValues: {
      headers: [],
      ...mock,
    },
  });

  return (
    <SideDrawer>
      <Flex direction="column" gap={16} className={wrapper}>
        <Flex gap={12} align="center">
          <Flex direction="column">
            <Text fw={500} fz="sm">
              Status
            </Text>
            <SegmentedControl
              value={
                form.values.active
                  ? MockStatusEnum.ACTIVE
                  : MockStatusEnum.INACTIVE
              }
              onChange={(value) =>
                form.setFieldValue("active", value === MockStatusEnum.ACTIVE)
              }
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
            {...form.getInputProps("name")}
          />
        </Flex>
        <Flex gap={12} align="center">
          <Textarea
            className={flexGrow}
            label="Description"
            placeholder="Success case for goals API"
            {...form.getInputProps("description")}
          />
        </Flex>
        <Flex gap={12} align="center">
          <TextInput
            className={flexGrow}
            label="URL"
            placeholder="https://api.awesomeapp.com/goals"
            {...form.getInputProps("url")}
          />
        </Flex>
        <Flex gap={12} align="center">
          <Flex direction="column">
            <Text>Method</Text>
            <SegmentedControl
              value={form.values.method}
              onChange={(value) =>
                form.setFieldValue("method", value as MethodEnum)
              }
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
          <TextInput
            label="Status"
            type="number"
            placeholder="200"
            {...form.getInputProps("status")}
          />
          <TextInput
            label="Delay (ms)"
            placeholder="500"
            type="number"
            {...form.getInputProps("delay")}
          />
        </Flex>
        <Flex className={flexGrow}>
          <Tabs defaultValue="headers" className={tabs}>
            <Tabs.List>
              <Tabs.Tab value="body">Response Body</Tabs.Tab>
              <Tabs.Tab value="headers">Response Headers</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="body" pt="xs" className={flexGrow}>
              <JSONInput
                id="a_unique_id"
                value={JSON.parse(form.values?.response || "{}")}
                onChange={({ error, jsObject }) => {
                  if (!error) {
                    form.setFieldValue("response", JSON.stringify(jsObject));
                  }
                }}
                locale={locale}
                height="550px"
              />
            </Tabs.Panel>

            <Tabs.Panel value="headers" pt="xs">
              <Button
                variant="subtle"
                style={{ marginBottom: 8 }}
                onClick={() => {
                  form.insertListItem(
                    "headers",
                    {
                      name: "",
                      value: "",
                    },
                    0,
                  );
                }}
              >
                + Add Header
              </Button>
              <Flex gap={8} direction="column">
                {form.values.headers?.map((_, index) => (
                  <Flex gap={12} align="center" key={index}>
                    <TextInput
                      placeholder="Name"
                      className={flexGrow}
                      {...form.getInputProps(`headers.${index}.name`)}
                    />
                    <TextInput
                      placeholder="Value"
                      className={flexGrow}
                      {...form.getInputProps(`headers.${index}.value`)}
                    />
                    <MdDeleteOutline
                      onClick={() => {
                        form.removeListItem("headers", index);
                      }}
                    />
                  </Flex>
                ))}
              </Flex>
            </Tabs.Panel>
          </Tabs>
        </Flex>
      </Flex>
    </SideDrawer>
  );
};
