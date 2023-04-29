import React, { useEffect, useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useViewStore, ViewEnum } from "./Store/useViewStore";
import { Show } from "./Blocks/Show";
import { Mocks } from "./Mocks/Mocks";
import { Logs } from "./Logs/Logs";

interface IProps {
  host: string;
  tab: chrome.tabs.Tab;
  active: boolean;
  storeKey: string;
}

export const App = ({ active }: IProps) => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  }, []);

  const view = useViewStore((state) => state.view);
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Show if={view === ViewEnum.MOCKS}>
          <Mocks />
        </Show>
        <Show if={view === ViewEnum.LOGS}>
          <Logs />
        </Show>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
