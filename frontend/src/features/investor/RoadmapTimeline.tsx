"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { compactSectionHeadingSx } from "@/components/common/pillarCardStyles";
import { ROADMAP } from "@/data/competitors";
import {
  roadmapDotHoverVariants,
  roadmapRowHoverVariants,
  roadmapYearPopupVariants,
} from "./roadmapMotion";

const MOBILE_SPINE_LEFT = 26;
const DESKTOP_SPINE_TOP = 36;

type Milestone = (typeof ROADMAP)[number];

export function RoadmapTimeline() {
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
        sx={{
          position: "relative",
          maxWidth: 1120,
          mx: "auto",
          pt: { xs: 1, lg: 2 },
          px: { xs: 0.5, sm: 0 },
          overflow: "visible",
        }}
      >
        <RoadmapSpine />

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
            <RoadmapMilestoneRow
              key={milestone.year}
              milestone={milestone}
              idx={idx}
            />
          ))}
        </Box>
      </Box>
    </Section>
  );
}

function RoadmapMilestoneRow({
  milestone,
  idx,
}: {
  milestone: Milestone;
  idx: number;
}) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const showPopup = reduced ? false : hovered;

  return (
    <Box
      component={motion.div}
      initial="rest"
      animate={hovered && !reduced ? "hover" : "rest"}
      variants={roadmapRowHoverVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
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
        outline: "none",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          gridColumn: { xs: 1, lg: 1 },
          gridRow: { xs: 1, lg: 1 },
          display: "flex",
          justifyContent: { xs: "center", lg: "center" },
          pt: { lg: `${DESKTOP_SPINE_TOP - 9}px` },
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!reduced && (
            <Box
              sx={{
                position: "absolute",
                bottom: { xs: "auto", lg: "calc(100% + 10px)" },
                top: { xs: "50%", lg: "auto" },
                left: { xs: "calc(100% + 12px)", lg: "50%" },
                transform: {
                  xs: "translateY(-50%)",
                  lg: "translateX(-50%)",
                },
                zIndex: 2,
                pointerEvents: "none",
              }}
            >
              <Box
                component={motion.div}
                variants={roadmapYearPopupVariants}
                animate={showPopup ? "visible" : "hidden"}
                sx={{
                  transformOrigin: {
                    xs: "left center",
                    lg: "bottom center",
                  },
                }}
              >
                <YearPopupBubble
                  year={milestone.year}
                  tail={{ xs: "right", lg: "bottom" }}
                />
              </Box>
            </Box>
          )}
          <Box component={motion.div} variants={roadmapDotHoverVariants}>
            <RoadmapDot active={hovered && !reduced} />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          gridColumn: { xs: 2, lg: 1 },
          gridRow: { xs: 1, lg: 2 },
          minWidth: 0,
        }}
      >
        <RoadmapCard milestone={milestone} active={hovered && !reduced} />
      </Box>
    </Box>
  );
}

function YearPopupBubble({
  year,
  tail = "bottom",
}: {
  year: string;
  tail?: "bottom" | "right" | { xs: "right"; lg: "bottom" };
}) {
  const tailPosition = typeof tail === "string" ? tail : undefined;

  return (
    <Box
      sx={{
        position: "relative",
        px: 1.25,
        py: 0.5,
        borderRadius: 999,
        bgcolor: "primary.main",
        color: "primary.contrastText",
        boxShadow: "0 8px 24px -8px rgba(63,74,28,0.55)",
        whiteSpace: "nowrap",
        ...(tailPosition === "bottom" || typeof tail === "object"
          ? {
              display: { xs: "block", lg: "block" },
            }
          : {}),
        "&::after": tailPosition === "right"
          ? {
              content: '""',
              position: "absolute",
              top: "50%",
              left: -5,
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderRight: (t) => `6px solid ${t.palette.primary.main}`,
            }
          : typeof tail === "object"
            ? {
                content: '""',
                position: "absolute",
                width: 0,
                height: 0,
                top: { xs: "50%", lg: "auto" },
                bottom: { xs: "auto", lg: -5 },
                left: { xs: -5, lg: "50%" },
                transform: {
                  xs: "translateY(-50%)",
                  lg: "translateX(-50%)",
                },
                borderTop: {
                  xs: "5px solid transparent",
                  lg: (t) => `6px solid ${t.palette.primary.main}`,
                },
                borderBottom: {
                  xs: "5px solid transparent",
                  lg: "none",
                },
                borderRight: {
                  xs: (t) => `6px solid ${t.palette.primary.main}`,
                  lg: "none",
                },
                borderLeft: {
                  xs: "none",
                  lg: "6px solid transparent",
                },
              }
            : {
                content: '""',
                position: "absolute",
                left: "50%",
                bottom: -5,
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: (t) => `6px solid ${t.palette.primary.main}`,
              },
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontWeight: 800,
          letterSpacing: "0.14em",
          fontSize: "0.6875rem",
          lineHeight: 1,
        }}
      >
        {year}
      </Typography>
    </Box>
  );
}

function RoadmapDot({ active }: { active?: boolean }) {
  return (
    <Box
      sx={{
        width: 18,
        height: 18,
        borderRadius: "50%",
        flexShrink: 0,
        bgcolor: "primary.main",
        border: (t) => `4px solid ${t.palette.background.paper}`,
        boxShadow: active
          ? "0 0 0 4px rgba(212,165,116,0.45)"
          : "0 0 0 2px rgba(92,58,33,0.28)",
        transition: "box-shadow 0.25s ease",
      }}
    />
  );
}

function RoadmapCard({
  milestone,
  active,
}: {
  milestone: Milestone;
  active?: boolean;
}) {
  return (
    <Stack
      spacing={1}
      sx={{
        p: { xs: 2, md: 2.5 },
        borderRadius: 3,
        bgcolor: "background.default",
        border: (t) => `1px solid ${t.palette.divider}`,
        boxShadow: active
          ? "0 12px 32px -14px rgba(58,34,16,0.22)"
          : "0 8px 28px -16px rgba(58,34,16,0.16)",
        textAlign: { xs: "left", lg: "center" },
        alignItems: { xs: "flex-start", lg: "center" },
        minWidth: 0,
        height: { lg: "100%" },
        transform: active ? "translateY(-4px)" : "none",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
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
      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
        {milestone.text}
      </Typography>
    </Stack>
  );
}

function RoadmapSpine() {
  return (
    <>
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
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: "100%",
            bgcolor: "secondary.main",
            borderRadius: 1,
            boxShadow: "0 0 8px rgba(212,165,116,0.35)",
          }}
        />
      </Box>

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
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            bgcolor: "secondary.main",
            borderRadius: 1,
            boxShadow: "0 0 8px rgba(212,165,116,0.35)",
          }}
        />
      </Box>
    </>
  );
}
