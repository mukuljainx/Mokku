import React, { useEffect, useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useViewStore, ViewEnum } from "./store/useViewStore";
import { Show } from "./Blocks/Show";
import { Mocks } from "./Mocks/Mocks";
import { Logs } from "./Logs/Logs";
import { usePanelListener } from "./hooks/usePanelListner";
import { DisabledPlaceholder } from "./DisabledPlaceholder/DisabledPlaceholder";
import { useLogStore, useMockStore } from "./store";
import { Notifications } from "@mantine/notifications";
import { AddMock } from "./Mocks/AddMock/AddMock";
import { LogDetails } from "./Logs/LogDetails/LogDetails";
import { Modal } from "./Modal";

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

  const view = useViewStore((state) => state.view);
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const initMockStore = useMockStore((state) => state.init);
  const selectedMock = useMockStore((state) => state.selectedMock);
  const selectedLog = useLogStore((state) => state.selectedLog);
  const setSelectedLog = useLogStore((state) => state.setSelectedLog);

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
        <div style={{ minWidth: 1024 }}>
          <Show if={view === ViewEnum.MOCKS}>
            <Mocks />
          </Show>
          <Show if={view === ViewEnum.LOGS}>
            <Logs />
          </Show>
        </div>
        <Modal />
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
