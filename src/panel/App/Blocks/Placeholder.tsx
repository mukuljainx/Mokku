import * as React from "react";
import { Center, Flex, Text, Title } from "@mantine/core";

interface PlaceholderProps {
  description: string;
  title: string;
}

export const Placeholder = ({ description, title }: PlaceholderProps) => {
  return (
    <Center style={{ height: "100%", textAlign: "center" }}>
      <Flex direction="column">
        <Title order={4}>{title}</Title>
        <Text>{description}</Text>
      </Flex>
    </Center>
  );
};
