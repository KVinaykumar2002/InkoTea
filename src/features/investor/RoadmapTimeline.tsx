"use client";

import { useRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
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
import { ROADMAP } from "@/data/competitors";
import {
  ROADMAP_EASE,
  roadmapContentVariants,
  roadmapDotVariants,
  roadmapRowVariants,
} from "./roadmapMotion";

const ROW_VIEWPORT = {
  once: true,
  amount: 0.35,
  margin: "0px 0px -8% 0px",
} as const;

const MOBILE_SPINE_LEFT = 26;
const DESKTOP_SPINE_TOP = 36;

export function RoadmapTimeline() {
  const reduced = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.82", "end 0.28"],
  });

  const pourRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pourProgress = useSpring(pourRaw, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <Section
      bgcolor="background.paper"
      pt={{ xs: 4, md: 5 }}
      pb={{ xs: 4, md: 5 }}
      sx={{ overflowX: "visible" }}
    >
      <ScrollReveal y={20} duration={0.65}>
        <SectionHeading
          eyebrow="Expansion Roadmap"
          title="Where we've been. Where we're going."
          sx={compactSectionHeadingSx}
        />
      </ScrollReveal>

      <Box
        ref={timelineRef}
        sx={{
          position: "relative",
          maxWidth: 1120,
          mx: "auto",
          pt: { xs: 1, lg: 2 },
          px: { xs: 0.5, sm: 0 },
          overflow: "visible",
        }}
      >
        <RoadmapSpine
          reduced={Boolean(reduced)}
          pourProgress={reduced ? undefined : pourProgress}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: `repeat(${ROADMAP.length}, minmax(0, 1fr))`,
            },
            columnGap: { lg: 2 },
            rowGap: { xs: 4, lg: 0 },
          }}
        >
          {ROADMAP.map((milestone, idx) => (
            <Box
              key={milestone.year}
              component={motion.div}
              initial={reduced ? false : "hidden"}
              whileInView={reduced ? undefined : "visible"}
              viewport={ROW_VIEWPORT}
              variants={roadmapRowVariants}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "52px minmax(0, 1fr)",
                  lg: "1fr",
                },
                gridTemplateRows: { lg: "auto 1fr" },
                columnGap: { xs: 2, lg: 0 },
                rowGap: { lg: 2 },
                alignItems: { xs: "start", lg: "stretch" },
                gridColumn: { lg: idx + 1 },
                minWidth: 0,
              }}
            >
              <Box
                component={motion.div}
                variants={roadmapDotVariants}
                sx={{
                  gridColumn: { xs: 1, lg: 1 },
                  gridRow: { xs: 1, lg: 1 },
                  display: "flex",
                  justifyContent: { xs: "center", lg: "center" },
                  pt: { lg: `${DESKTOP_SPINE_TOP - 9}px` },
                }}
              >
                <RoadmapDot />
              </Box>

              <Box
                component={motion.div}
                variants={roadmapContentVariants}
                sx={{
                  gridColumn: { xs: 2, lg: 1 },
                  gridRow: { xs: 1, lg: 2 },
                  minWidth: 0,
                }}
              >
                <RoadmapCard milestone={milestone} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Section>
  );
}

function RoadmapDot() {
  return (
    <Box
      sx={{
        width: 18,
        height: 18,
        borderRadius: "50%",
        flexShrink: 0,
        bgcolor: "primary.main",
        border: (t) => `4px solid ${t.palette.background.paper}`,
        boxShadow: "0 0 0 2px rgba(92,58,33,0.28)",
      }}
    />
  );
}

function RoadmapCard({
  milestone,
}: {
  milestone: { year: string; title: string; text: string };
}) {
  return (
    <Stack
      spacing={1}
      sx={{
        p: { xs: 2, md: 2.5 },
        borderRadius: 3,
        bgcolor: "background.default",
        border: (t) => `1px solid ${t.palette.divider}`,
        boxShadow: "0 8px 28px -16px rgba(58,34,16,0.16)",
        textAlign: { xs: "left", lg: "center" },
        alignItems: { xs: "flex-start", lg: "center" },
        minWidth: 0,
        height: { lg: "100%" },
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: "secondary.dark",
          fontWeight: 700,
          letterSpacing: "0.2em",
        }}
      >
        {milestone.year}
      </Typography>
      <Typography variant="h6" sx={{ color: "primary.dark" }}>
        {milestone.title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ lineHeight: 1.7 }}
      >
        {milestone.text}
      </Typography>
    </Stack>
  );
}

function RoadmapSpine({
  reduced,
  pourProgress,
}: {
  reduced: boolean;
  pourProgress?: MotionValue<number>;
}) {
  const fillStyle = pourProgress
    ? undefined
    : reduced
      ? { scaleX: 1, scaleY: 1 }
      : undefined;

  return (
    <>
      {/* Desktop — horizontal */}
      <Box
        aria-hidden
        sx={{
          display: { xs: "none", lg: "block" },
          position: "absolute",
          left: 0,
          right: 0,
          top: DESKTOP_SPINE_TOP,
          height: 2,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "secondary.light",
            opacity: 0.45,
            borderRadius: 1,
          }}
        />
        <Box
          component={motion.div}
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: "100%",
            bgcolor: "secondary.main",
            borderRadius: 1,
            transformOrigin: "left center",
            boxShadow: "0 0 8px rgba(212,165,116,0.35)",
          }}
          initial={reduced || pourProgress ? false : { scaleX: 0 }}
          whileInView={reduced || pourProgress ? undefined : { scaleX: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 2, ease: ROADMAP_EASE }}
          style={pourProgress ? { scaleX: pourProgress } : fillStyle}
        />
      </Box>

      {/* Mobile — vertical */}
      <Box
        aria-hidden
        sx={{
          display: { xs: "block", lg: "none" },
          position: "absolute",
          left: MOBILE_SPINE_LEFT,
          top: 8,
          bottom: 8,
          width: 2,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "secondary.light",
            opacity: 0.45,
            borderRadius: 1,
          }}
        />
        <Box
          component={motion.div}
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            bgcolor: "secondary.main",
            borderRadius: 1,
            transformOrigin: "top center",
            boxShadow: "0 0 8px rgba(212,165,116,0.35)",
          }}
          initial={reduced || pourProgress ? false : { scaleY: 0 }}
          whileInView={reduced || pourProgress ? undefined : { scaleY: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 2, ease: ROADMAP_EASE }}
          style={pourProgress ? { scaleY: pourProgress } : fillStyle}
        />
      </Box>
    </>
  );
}
