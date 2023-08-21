import React from "react";
import { ILog } from "@mokku/types";
import { Center, Flex, Text, Title } from "@mantine/core";

interface IProps {
  requestHeaders: ILog["request"]["headers"];
  responseHeaders: ILog["response"]["headers"];
}

const Headers = ({ headers }: { headers: ILog["request"]["headers"] }) => {
  if (!headers || headers.length === 0) {
    return <Text fz="sm">No headers</Text>;
  }

  return (
    <>
      {headers.map(({ name, value }, index) => (
        <Flex gap={4} key={index}>
          <Text fz="sm" fw={500}>
            {name}:
          </Text>
          <Text fz="sm">{value}</Text>
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
      <Title order={6}>Response Headers</Title>
      <Headers headers={responseHeaders} />
      <Title order={6} style={{ marginTop: 12 }}>
        Request Headers
      </Title>
      <Headers headers={requestHeaders} />
    </Flex>
  );
};
