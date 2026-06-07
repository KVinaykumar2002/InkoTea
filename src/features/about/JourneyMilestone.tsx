"use client";

import { fontDisplayItalicSx } from "@/theme/fonts";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { motion, type MotionStyle } from "framer-motion";
import { pillarCardPadding } from "@/components/common/pillarCardStyles";
import { JOURNEY_META } from "./journeyMeta";

interface Props {
  year: string;
  title: string;
  text: string;
  /** Which side the card pushes toward (affects text alignment + stamp anchor). */
  align: "left" | "right";
  stampMotionStyle?: MotionStyle;
}

export function JourneyMilestone({
  year,
  title,
  text,
  align,
  stampMotionStyle,
}: Props) {
  const meta = JOURNEY_META[year];

  return (
    <Stack
      spacing={1.25}
      sx={{
        position: "relative",
        overflow: "visible",
        p: pillarCardPadding,
        pt: { xs: 5, md: 3 },
        pr: {
          xs: 7,
          md: align === "right" ? 4.5 : undefined,
        },
        pl: align === "left" ? { md: 4.5 } : undefined,
        borderRadius: 3,
        textAlign: align,
        minWidth: 0,
        bgcolor: "background.paper",
        border: (t) => `1px solid ${t.palette.divider}`,
        background: (t) =>
          t.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(212,165,116,0.06) 0%, rgba(58,34,16,0.0) 65%)"
            : "linear-gradient(135deg, rgba(212,165,116,0.10) 0%, rgba(255,255,255,0.0) 60%)",
        boxShadow: "0 8px 28px -16px rgba(58,34,16,0.18)",
      }}
    >
      <YearStamp
        year={year}
        side={align === "right" ? "left" : "right"}
        motionStyle={stampMotionStyle}
      />

      <Typography
        variant="h5"
        sx={{
          ...fontDisplayItalicSx,
          color: "primary.dark",
          pl: align === "right" ? 0 : { md: 2 },
          pr: align === "left" ? 0 : { md: 2 },
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ lineHeight: 1.7 }}
      >
        {text}
      </Typography>

      {meta?.cumulative ? (
        <Box
          sx={{
            alignSelf: align === "left" ? "flex-start" : "flex-end",
            mt: 0.5,
            px: 1.5,
            py: 0.5,
            borderRadius: 999,
            bgcolor: (t) =>
              t.palette.mode === "dark"
                ? "rgba(212,165,116,0.14)"
                : "rgba(160,107,67,0.10)",
            border: "1px solid rgba(160,107,67,0.28)",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "secondary.dark",
              fontWeight: 700,
              letterSpacing: "0.16em",
              fontSize: "0.7rem",
              lineHeight: 1.6,
            }}
          >
            {meta.cumulative}
          </Typography>
        </Box>
      ) : null}
    </Stack>
  );
}

function YearStamp({
  year,
  side,
  motionStyle,
}: {
  year: string;
  side: "left" | "right";
  motionStyle?: MotionStyle;
}) {
  return (
    <Box
      component={motion.div}
      style={motionStyle}
      sx={{
        position: "absolute",
        top: { xs: 10, md: -10 },
        [side]: { xs: 10, md: -10 },
        width: { xs: 44, md: 48 },
        height: { xs: 44, md: 48 },
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: (t) =>
          t.palette.mode === "dark"
            ? "radial-gradient(circle at 35% 30%, rgba(212,165,116,0.42), rgba(58,34,16,0.95) 70%)"
            : "radial-gradient(circle at 35% 30%, rgba(255,238,210,0.95), rgba(212,165,116,0.4) 70%)",
        border: "1.5px solid rgba(160,107,67,0.55)",
        boxShadow:
          "0 0 0 3px rgba(212,165,116,0.18), 0 4px 12px -4px rgba(58,34,16,0.18)",
        zIndex: 2,
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 4,
          borderRadius: "50%",
          border: "1px dashed rgba(160,107,67,0.45)",
          pointerEvents: "none",
        },
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontWeight: 800,
          color: "primary.dark",
          letterSpacing: "0.04em",
          fontSize: "0.8rem",
          lineHeight: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        {year}
      </Typography>
    </Box>
  );
}
