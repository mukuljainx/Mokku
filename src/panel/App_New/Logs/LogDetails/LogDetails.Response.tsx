import React from "react";
import * as monaco from "monaco-editor";
import { ILog } from "@mokku/types";
import { Center, Text } from "@mantine/core";
import { Editor, loader } from "@monaco-editor/react";
import { getResponse } from "./LogDetails.utils";

loader.config({ monaco });

interface IProps {
  response: ILog["response"]["response"];
}

export const LogDetailsResponse = ({ response }: IProps) => {
  if (!response) {
    return (
      <Center>
        <Text fz="md">Request pending</Text>
      </Center>
    );
  }

  const responseJson = getResponse(response || "");

  if (!responseJson) {
    return (
      <Center>
        <Text fz="md">Nothing to Preview</Text>
      </Center>
    );
  }

  return (
    <Editor
      options={{
        readOnly: true,
        minimap: { enabled: false },
      }}
      defaultLanguage="json"
      defaultValue={responseJson}
    />
  );
};
