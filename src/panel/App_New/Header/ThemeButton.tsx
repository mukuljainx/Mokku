import React from "react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { TbSun, TbMoonStars } from "react-icons/tb";

export const ThemeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      variant="outline"
      color={dark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <TbSun /> : <TbMoonStars />}
    </ActionIcon>
  );
};
