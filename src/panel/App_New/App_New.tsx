import React, { useEffect, useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Flex,
} from "@mantine/core";
import { useGlobalStore, ViewEnum } from "./store/useViewStore";
import { Show } from "./Blocks/Show";
import { Mocks } from "./Mocks/Mocks";
import { Logs } from "./Logs/Logs";
import { usePanelListener } from "./hooks/usePanelListner";
import { DisabledPlaceholder } from "./DisabledPlaceholder/DisabledPlaceholder";
import { useMockStore } from "./store";
import { Notifications } from "@mantine/notifications";
import { Modal } from "./Modal";
import { Header } from "./Header/Header";

export interface IAppProps {
  host: string;
  tab: chrome.tabs.Tab;
  active: boolean;
  storeKey: string;
}

export const App = (props: IAppProps) => {
  const state = usePanelListener(props);

  if (!state.active) {
    return (
      <DisabledPlaceholder active={props.active} storeKey={props.storeKey} />
    );
  }

  const view = useGlobalStore((state) => state.view);
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const initMockStore = useMockStore((state) => state.init);

  useEffect(() => {
    initMockStore();
  }, []);
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications />
        <Flex
          direction="column"
          style={{ minWidth: 1024, height: "100%", overflow: "hidden" }}
        >
          <Header />
          <div style={{ overflow: "auto" }}>
            <Show if={view === ViewEnum.MOCKS}>
              <Mocks />
            </Show>
            <Show if={view === ViewEnum.LOGS}>
              <Logs />
            </Show>
          </div>
        </Flex>
        <Modal />
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
