import React from "react";
import { TbClearAll } from "react-icons/tb";
import { ActionIcon } from "@mantine/core";
import { useLogStore } from "../store/useLogStore";

export const ClearButton = () => {
  const clearLogs = useLogStore((state) => state.clearLogs);
  return (
    <ActionIcon
      variant="outline"
      color={"blue"}
      onClick={() => clearLogs()}
      title="Clear Logs"
    >
      <TbClearAll />
    </ActionIcon>
  );
};
