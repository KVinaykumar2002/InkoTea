"use client";

import { Paper, TableContainer } from "@mui/material";
import type { ReactNode } from "react";

interface AdminTableContainerProps {
  children: ReactNode;
  minWidth?: number;
}

export function AdminTableContainer({
  children,
  minWidth = 640,
}: AdminTableContainerProps) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        "& table": { minWidth },
      }}
    >
      {children}
    </TableContainer>
  );
}
