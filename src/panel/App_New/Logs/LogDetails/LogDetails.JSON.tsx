import React from "react";
import { ILog } from "@mokku/types";
import { Center, Text } from "@mantine/core";
import { getResponse, parseJSONIfPossible } from "./LogDetails.utils";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

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
    return (
      <JSONInput
        style={{ outerBox: { width: "100%" }, container: { width: "100%" } }}
        id={`log-details-json-${id}`}
        placeholder={JSON.parse(response || "{}")}
        locale={locale}
        height="550px"
      />
    );
  }

  return (
    <div style={{ paddingLeft: 8, paddingRight: 8 }}>
      <Text fz="md">{responseJson.original}</Text>
    </div>
  );
};
