"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import type { PaletteMode } from "@mui/material/styles";
import { buildTheme } from "./index";

interface ThemeModeContextValue {
  mode: PaletteMode;
  /** Kept for API compatibility — site is locked to light mode. */
  toggleMode: () => void;
  setMode: (mode: PaletteMode) => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(
  undefined,
);

interface Props {
  children: ReactNode;
}

/**
 * Site content uses the light palette only. The navbar carries its own dark
 * styling so the rest of the page stays bright and readable.
 */
export function ThemeModeProvider({ children }: Props) {
  const mode: PaletteMode = "light";
  const theme = useMemo(() => buildTheme(mode), []);
  const noop = useCallback(() => {}, []);
  const setMode = useCallback((_next: PaletteMode) => {}, []);

  const ctx = useMemo(
    () => ({ mode, toggleMode: noop, setMode }),
    [noop, setMode],
  );

  return (
    <ThemeModeContext.Provider value={ctx}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode(): ThemeModeContextValue {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error("useThemeMode must be used within ThemeModeProvider");
  }
  return ctx;
}
