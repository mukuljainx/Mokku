import React, { useEffect, useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";

import { useGlobalStoreState } from "./store";
import { App } from "./App";

export const AppProvider = (props: useGlobalStoreState["meta"]) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useEffect(() => {
    const theme = (localStorage.getItem("theme") || "light") as ColorScheme;
    setColorScheme(theme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", colorScheme);
  }, [colorScheme]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        <App {...props} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
