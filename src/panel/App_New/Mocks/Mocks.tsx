import React from "react";
import { Header } from "../Header/Header";
import { Flex } from "@mantine/core";
import { AddMock } from "./AddMock/AddMock";

export const Mocks = () => {
  return (
    <Flex direction="column">
      <Header />
      <AddMock />
    </Flex>
  );
};
