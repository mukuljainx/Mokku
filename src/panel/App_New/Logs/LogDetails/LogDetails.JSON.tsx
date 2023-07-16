import React from "react";
import * as monaco from "monaco-editor";
import { ILog } from "@mokku/types";
import { Center, Text } from "@mantine/core";
import { Editor, loader } from "@monaco-editor/react";
import { getResponse } from "./LogDetails.utils";

loader.config({ monaco });

interface IProps {
  response: ILog["response"]["response"];
  isRequestPending: boolean;
}

export const LogDetailsJSON = ({ response, isRequestPending }: IProps) => {
  if (isRequestPending) {
    return (
      <Center pt={64}>
        <Text fz="md">Request pending</Text>
      </Center>
    );
  }

  const responseJson = getResponse(response || "");

  if (!responseJson) {
    return (
      <Center pt={64}>
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
