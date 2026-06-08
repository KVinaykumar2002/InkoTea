"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

interface Props {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  /** color shorthand applied to the number */
  numberColor?: string;
  separator?: string;
}

/**
 * Animated stat counter that triggers when scrolled into view.
 * Uses `react-countup` + `react-intersection-observer` to keep the animation
 * cheap and only run once.
 */
export function AnimatedCounter({
  end,
  suffix = "+",
  prefix = "",
  label,
  duration = 2.2,
  numberColor = "primary.main",
  separator = ",",
}: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <Stack ref={ref} spacing={0.5} alignItems="center" textAlign="center">
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.25 }}>
        <Typography
          variant="h2"
          component="span"
          sx={{
            color: numberColor,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {prefix}
          {inView ? (
            <CountUp
              end={end}
              duration={duration}
              separator={separator}
              useEasing
            />
          ) : (
            0
          )}
          {suffix}
        </Typography>
      </Box>
      <Typography
        variant="overline"
        sx={{
          color: "text.secondary",
          letterSpacing: "0.15em",
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
}
