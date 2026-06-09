"use client";

import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  action?: ReactNode;
}

export function AdminPageHeader({ title, action }: AdminPageHeaderProps) {
  return (
    <Box
      sx={{
        display: action ? "flex" : { xs: "none", md: "flex" },
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" },
        justifyContent: "space-between",
        gap: { xs: 1.5, sm: 2 },
        mb: 2,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{
          display: { xs: "none", md: "block" },
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
        }}
      >
        {title}
      </Typography>
      {action ? (
        <Box
          sx={{
            width: { xs: "100%", sm: "auto" },
            "& .MuiButton-root": { width: { xs: "100%", sm: "auto" } },
          }}
        >
          {action}
        </Box>
      ) : null}
    </Box>
  );
}
