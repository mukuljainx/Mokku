import React from "react";
import { ILog } from "@mokku/types";
import { Center, Text } from "@mantine/core";
import { Editor } from "@monaco-editor/react";

interface IProps {
  response: ILog["response"];
}

const getResponse = (response) => {
  let result = "";
  try {
    result = JSON.stringify(JSON.parse(response), undefined, 2);
  } catch {
    result = response;
  }
  return result;
};

export const LogDetailsResponse = ({ response }: IProps) => {
  if (!response) {
    return (
      <Center>
        <Text fz="md">Request pending</Text>
      </Center>
    );
  }

  const responseJson = getResponse(response?.response || "");
  if (!response) {
    return (
      <Center>
        <Text fz="md">Nothing to preview</Text>
      </Center>
    );
  } else {
    return (
      <Center>
        <Editor defaultLanguage="json" defaultValue={responseJson} />
      </Center>
    );
  }
};
