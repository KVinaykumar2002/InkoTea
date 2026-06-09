"use client";

import { Box, Paper, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

export interface AdminRecordCardRow {
  label: string;
  value: ReactNode;
}

interface AdminRecordCardProps {
  title: string;
  subtitle?: ReactNode;
  media?: ReactNode;
  rows?: AdminRecordCardRow[];
  children?: ReactNode;
  actions?: ReactNode;
}

export function AdminRecordCard({
  title,
  subtitle,
  media,
  rows,
  children,
  actions,
}: AdminRecordCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        p: 2,
      }}
    >
      <Stack spacing={1.5}>
        {media}
        <Box>
          <Typography variant="subtitle2" fontWeight={700} sx={{ wordBreak: "break-word" }}>
            {title}
          </Typography>
          {subtitle ? (
            <Typography
              variant="caption"
              color="text.secondary"
              component="div"
              sx={{ mt: 0.25, wordBreak: "break-word" }}
            >
              {subtitle}
            </Typography>
          ) : null}
        </Box>
        {rows?.map((row) => (
          <Box
            key={row.label}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              gap: { xs: 0.25, sm: 2 },
              py: 0.25,
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
              sx={{ flexShrink: 0 }}
            >
              {row.label}
            </Typography>
            <Box
              sx={{
                flex: 1,
                textAlign: { xs: "left", sm: "right" },
                wordBreak: "break-word",
              }}
            >
              {row.value}
            </Box>
          </Box>
        ))}
        {children}
        {actions ? (
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-end"
            flexWrap="wrap"
            sx={{ pt: 0.5 }}
          >
            {actions}
          </Stack>
        ) : null}
      </Stack>
    </Paper>
  );
}

export function AdminMobileCardList({ children }: { children: ReactNode }) {
  return (
    <Stack spacing={1.5} sx={{ display: { xs: "flex", md: "none" } }}>
      {children}
    </Stack>
  );
}

export function AdminDesktopTable({ children }: { children: ReactNode }) {
  return <Box sx={{ display: { xs: "none", md: "block" } }}>{children}</Box>;
}
