import React from "react";
import { TbRefresh } from "react-icons/tb";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";

export const RefreshButton = () => {
  return (
    <ActionIcon
      variant="outline"
      color={"blue"}
      onClick={() => window.location.reload()}
      title="Refresh Extension"
    >
      <TbRefresh />
    </ActionIcon>
  );
};
