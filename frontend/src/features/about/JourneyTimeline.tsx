"use client";

import { useRef } from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { compactSectionHeadingSx } from "@/components/common/pillarCardStyles";
import { JOURNEY_MILESTONES } from "@/data/competitors";
import { JourneyMilestoneRow } from "./JourneyMilestoneRow";

const MOBILE_GLYPH_SIZE = 60;
const DESKTOP_GLYPH_SIZE = 72;

export function JourneyTimeline() {
  const reduced = useReducedMotion();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const glyphSize = isMobile ? MOBILE_GLYPH_SIZE : DESKTOP_GLYPH_SIZE;
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.25"],
  });

  const pourRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pourProgress = useSpring(pourRaw, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <Section
      bgcolor="background.default"
      pt={{ xs: 4, md: 5 }}
      pb={0}
      sx={{ overflowX: "visible" }}
    >
      <ScrollReveal y={20} duration={0.65}>
        <SectionHeading
          eyebrow="Our Journey"
          title="From a single kiosk to a multi-city retail brand"
          sx={compactSectionHeadingSx}
        />
      </ScrollReveal>

      <Box
        ref={timelineRef}
        sx={{
          position: "relative",
          maxWidth: 1040,
          mx: "auto",
          pt: { xs: 1.5, md: 1 },
          px: { xs: 0.5, sm: 0 },
          overflow: "visible",
        }}
      >
        <PourSpine
          reduced={Boolean(reduced)}
          pourProgress={reduced ? undefined : pourProgress}
          glyphColumnWidth={isMobile ? 76 : 88}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          {JOURNEY_MILESTONES.map((milestone, idx) => (
            <JourneyMilestoneRow
              key={milestone.year}
              milestone={milestone}
              index={idx}
              isMobile={isMobile}
              glyphSize={glyphSize}
              reduced={Boolean(reduced)}
            />
          ))}
        </Box>
      </Box>
    </Section>
  );
}

function ScrollPourDot({ pourProgress }: { pourProgress: MotionValue<number> }) {
  const pourTop = useTransform(pourProgress, [0, 1], ["0%", "100%"]);

  return (
    <Box
      component={motion.div}
      style={{ top: pourTop }}
      sx={{
        position: "absolute",
        left: "50%",
        width: 14,
        height: 14,
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "secondary.main",
        boxShadow:
          "0 0 0 3px rgba(212,165,116,0.25), 0 0 14px rgba(212,165,116,0.55)",
      }}
    />
  );
}

function PourSpine({
  reduced,
  pourProgress,
  glyphColumnWidth,
}: {
  reduced: boolean;
  pourProgress?: MotionValue<number>;
  glyphColumnWidth: number;
}) {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        left: { xs: glyphColumnWidth / 2 - 4, md: "50%" },
        top: 0,
        bottom: 0,
        width: 8,
        transform: { md: "translateX(-4px)" },
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 8 100"
        preserveAspectRatio="none"
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          <linearGradient id="journey-pour-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(212,165,116,0)" />
            <stop offset="8%" stopColor="rgba(212,165,116,0.9)" />
            <stop offset="92%" stopColor="rgba(120,75,40,0.85)" />
            <stop offset="100%" stopColor="rgba(120,75,40,0)" />
          </linearGradient>
        </defs>
        <line
          x1={4}
          y1={0}
          x2={4}
          y2={100}
          stroke="rgba(160,107,67,0.16)"
          strokeWidth={1.2}
        />
        <motion.path
          d="M 4 0 L 4 100"
          fill="none"
          stroke="url(#journey-pour-gradient)"
          strokeWidth={3}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={
            pourProgress
              ? {
                  pathLength: pourProgress,
                  filter:
                    "drop-shadow(0 0 6px rgba(212,165,116,0.45)) drop-shadow(0 0 1px rgba(160,107,67,0.6))",
                }
              : {
                  pathLength: reduced ? 1 : 0,
                  filter:
                    "drop-shadow(0 0 6px rgba(212,165,116,0.45)) drop-shadow(0 0 1px rgba(160,107,67,0.6))",
                }
          }
        />
      </svg>

      {pourProgress && !reduced ? (
        <ScrollPourDot pourProgress={pourProgress} />
      ) : null}
    </Box>
  );
}
