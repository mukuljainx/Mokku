import React from "react";
import { ILog } from "@mokku/types";
import { Center, JsonInput, Text } from "@mantine/core";
import { getResponse, parseJSONIfPossible } from "./LogDetails.utils";

interface IProps {
  response: ILog["response"]["response"];
  isRequestPending: boolean;
  id: string;
}

export const LogDetailsJSON = ({ response, isRequestPending, id }: IProps) => {
  if (isRequestPending) {
    return (
      <Center pt={64}>
        <Text fz="md">Request pending</Text>
      </Center>
    );
  }

  if (!response) {
    return (
      <Center pt={64}>
        <Text fz="md">Nothing to Preview</Text>
      </Center>
    );
  }

  const responseJson = parseJSONIfPossible(response);

  if (responseJson.parsed) {
    const formatted = JSON.stringify(responseJson.json, null, 4);
    return <JsonInput autosize value={formatted} />;
  }

  return (
    <div style={{ paddingLeft: 8, paddingRight: 8 }}>
      <Text fz="md">{responseJson.original}</Text>
    </div>
  );
};
