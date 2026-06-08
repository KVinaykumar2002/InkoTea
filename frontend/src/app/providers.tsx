"use client";

import type { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeModeProvider } from "@/theme/ThemeModeProvider";
import { MainLayout } from "@/components/layout/MainLayout";

/**
 * App-level providers tree. Order matters: MUI cache → theme → layout shell.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: "mui", enableCssLayer: true }}>
      <ThemeModeProvider>
        <MainLayout>{children}</MainLayout>
      </ThemeModeProvider>
    </AppRouterCacheProvider>
  );
}
