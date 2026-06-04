"use client";

import { useRef } from "react";
import Box from "@mui/material/Box";
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
import {
  compactSectionHeadingSx,
  compactSectionPy,
} from "@/components/common/pillarCardStyles";
import { JOURNEY_MILESTONES } from "@/data/competitors";
import { JOURNEY_META } from "./journeyMeta";
import { JourneyGlyph } from "./JourneyGlyph";
import { JourneyMilestone } from "./JourneyMilestone";
import {
  JOURNEY_EASE,
  journeyCardVariants,
  journeyGlyphVariants,
  journeyRowVariants,
} from "./journeyMotion";

const ROW_VIEWPORT = { once: true, amount: 0.4, margin: "0px 0px -10% 0px" } as const;

export function JourneyTimeline() {
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
    <Section bgcolor="background.default" py={compactSectionPy}>
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
          pt: { xs: 0.5, md: 1 },
        }}
      >
        <PourSpine
          reduced={Boolean(reduced)}
          pourProgress={reduced ? undefined : pourProgress}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          {JOURNEY_MILESTONES.map((milestone, idx) => {
            const isLeft = idx % 2 === 0;
            const meta = JOURNEY_META[milestone.year];
            const enterX = isLeft ? -28 : 28;

            return (
              <Box
                key={milestone.year}
                component={motion.div}
                initial={reduced ? false : "hidden"}
                whileInView={reduced ? undefined : "visible"}
                viewport={ROW_VIEWPORT}
                variants={journeyRowVariants}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "72px 1fr",
                    md: "1fr 88px 1fr",
                  },
                  alignItems: "center",
                  mb: { xs: 4, md: 5 },
                  "&:last-of-type": { mb: 0 },
                }}
              >
                <Box
                  component={motion.div}
                  variants={journeyGlyphVariants}
                  sx={{
                    gridColumn: { xs: 1, md: 2 },
                    display: "flex",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <JourneyGlyph kind={meta?.glyph ?? "single"} size={72} />
                </Box>

                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    justifyContent: "flex-end",
                    gridColumn: 1,
                    pr: 2.5,
                    visibility: isLeft ? "visible" : "hidden",
                  }}
                >
                  <Box
                    component={motion.div}
                    variants={journeyCardVariants}
                    custom={-28}
                    sx={{ maxWidth: 440, width: "100%" }}
                  >
                    <JourneyMilestone {...milestone} align="right" />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    justifyContent: "flex-start",
                    gridColumn: 3,
                    pl: 2.5,
                    visibility: isLeft ? "hidden" : "visible",
                  }}
                >
                  <Box
                    component={motion.div}
                    variants={journeyCardVariants}
                    custom={28}
                    sx={{ maxWidth: 440, width: "100%" }}
                  >
                    <JourneyMilestone {...milestone} align="left" />
                  </Box>
                </Box>

                <Box
                  component={motion.div}
                  variants={journeyCardVariants}
                  custom={enterX}
                  sx={{
                    gridColumn: 2,
                    display: { xs: "block", md: "none" },
                    pl: 1,
                  }}
                >
                  <JourneyMilestone {...milestone} align="left" />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Section>
  );
}

function PourSpine({
  reduced,
  pourProgress,
}: {
  reduced: boolean;
  pourProgress?: MotionValue<number>;
}) {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        left: { xs: 32, md: "50%" },
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
          initial={reduced || pourProgress ? false : { pathLength: 0 }}
          whileInView={
            reduced || pourProgress ? undefined : { pathLength: 1 }
          }
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 2.2, ease: JOURNEY_EASE }}
          style={
            pourProgress
              ? {
                  pathLength: pourProgress,
                  filter:
                    "drop-shadow(0 0 6px rgba(212,165,116,0.45)) drop-shadow(0 0 1px rgba(160,107,67,0.6))",
                }
              : {
                  filter:
                    "drop-shadow(0 0 6px rgba(212,165,116,0.45)) drop-shadow(0 0 1px rgba(160,107,67,0.6))",
                }
          }
        />
      </svg>
    </Box>
  );
}
