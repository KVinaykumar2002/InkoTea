"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  maxWidth?: number | string;
  sx?: SxProps<Theme>;
  titleColor?: string;
}

/**
 * Standardized section header — eyebrow label + display title +
 * supporting description. Centers by default with a sensible max-width.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  maxWidth = 760,
  sx,
  titleColor,
}: Props) {
  return (
    <Stack
      spacing={2}
      alignItems={align === "center" ? "center" : "flex-start"}
      sx={{
        textAlign: align,
        mx: align === "center" ? "auto" : 0,
        maxWidth,
        mb: { xs: 6, md: 8 },
        ...sx,
      }}
    >
      {eyebrow ? (
        <Typography
          variant="overline"
          sx={{ color: "secondary.dark", fontWeight: 700 }}
        >
          {eyebrow}
        </Typography>
      ) : null}
      <Typography variant="h2" sx={{ color: titleColor }}>
        {title}
      </Typography>
      {description ? (
        <Box>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </Box>
      ) : null}
    </Stack>
  );
}
