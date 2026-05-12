"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import type { PaletteMode } from "@mui/material";
import { buildTheme } from "./index";

interface ThemeModeContextValue {
  mode: PaletteMode;
  toggleMode: () => void;
  setMode: (mode: PaletteMode) => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "inkotea-theme-mode";

interface Props {
  children: ReactNode;
  defaultMode?: PaletteMode;
}

export function ThemeModeProvider({ children, defaultMode = "light" }: Props) {
  const [mode, setModeState] = useState<PaletteMode>(defaultMode);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as PaletteMode | null;
    if (stored === "light" || stored === "dark") {
      setModeState(stored);
      return;
    }
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setModeState("dark");
    }
  }, []);

  const setMode = useCallback((next: PaletteMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage may be unavailable; ignore */
    }
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((prev) => {
      const next: PaletteMode = prev === "light" ? "dark" : "light";
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const theme = useMemo(() => buildTheme(mode), [mode]);
  const ctx = useMemo(
    () => ({ mode, toggleMode, setMode }),
    [mode, toggleMode, setMode],
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

/**
 * Access the active palette mode and a toggle for switching it.
 * Must be used inside <ThemeModeProvider />.
 */
export function useThemeMode(): ThemeModeContextValue {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error("useThemeMode must be used within ThemeModeProvider");
  }
  return ctx;
}
