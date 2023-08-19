import React from "react";
import { TbPlayerRecordFilled } from "react-icons/tb";
import { ActionIcon } from "@mantine/core";
import { useGlobalStore } from "../store/useGlobalStore";
import { notifications } from "@mantine/notifications";

export const RecordButton = () => {
  const recording = useGlobalStore((state) => state.recording);
  const toggleRecording = useGlobalStore((state) => state.toggleRecording);
  return (
    <ActionIcon
      variant="outline"
      color={recording ? "red" : "blue"}
      onClick={() => {
        if (recording) {
          notifications.show({
            title: "Recording stopped",
            message: "All networks are saved as mock",
          });
        } else {
          notifications.show({
            title: "Recording started",
            message: "All networks calls will be saved as mock",
          });
        }
        toggleRecording();
      }}
      title="Record Network calls"
    >
      <TbPlayerRecordFilled />
    </ActionIcon>
  );
};
