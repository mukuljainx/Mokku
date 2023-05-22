import React from "react";
import * as monaco from "monaco-editor";
import { ILog } from "@mokku/types";
import { Center, Flex, Text, Title } from "@mantine/core";
import { loader } from "@monaco-editor/react";

loader.config({ monaco });

interface IProps {
  requestHeaders: ILog["request"]["headers"];
  responseHeaders: ILog["response"]["headers"];
}

const Headers = ({ headers }: { headers: ILog["request"]["headers"] }) => {
  if (!headers || headers.length === 0) {
    return <Text fz="md">No headers</Text>;
  }

  return (
    <>
      {headers.map(({ name, value }) => (
        <Flex gap={4}>
          <Text fw={500}>{name}:</Text>
          <Text>{value}</Text>
        </Flex>
      ))}
    </>
  );
};

export const LogDetailsHeader = ({
  requestHeaders,
  responseHeaders,
}: IProps) => {
  if (!requestHeaders && !responseHeaders) {
    return (
      <Center>
        <Text fz="md">Request pending</Text>
      </Center>
    );
  }

  return (
    <Flex direction="column" style={{ padding: 12 }}>
      <Title order={5}>Response Headers</Title>
      <Headers headers={responseHeaders} />
      <Title order={5} style={{ marginTop: 12 }}>
        Request Headers
      </Title>
      <Headers headers={requestHeaders} />
    </Flex>
  );
};
