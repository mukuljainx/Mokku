import React from "react";
import { TbPlayerRecordFilled } from "react-icons/tb";
import { ActionIcon } from "@mantine/core";
import { useGlobalStore } from "../store/useGlobalStore";

export const RecordButton = () => {
  const recording = useGlobalStore((state) => state.recording);
  const toggleRecording = useGlobalStore((state) => state.toggleRecording);
  return (
    <ActionIcon
      variant="outline"
      color={recording ? "red" : "blue"}
      onClick={() => toggleRecording()}
      title="Record Network calls"
    >
      <TbPlayerRecordFilled />
    </ActionIcon>
  );
};
