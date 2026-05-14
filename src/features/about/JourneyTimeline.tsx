"use client";

import Box from "@mui/material/Box";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { JOURNEY_MILESTONES } from "@/data/competitors";
import { JOURNEY_META } from "./journeyMeta";
import { JourneyGlyph } from "./JourneyGlyph";
import { JourneyMilestone } from "./JourneyMilestone";

/**
 * Journey Timeline — "The Pour Line".
 *
 * Visual story:
 *   - A vertical amber-to-tea-brown gradient spine **draws itself** as the
 *     section scrolls into view (Framer Motion `pathLength`), like chai
 *     being poured from a kettle down through the years.
 *   - Each milestone lives at a pivot point on the spine, marked by a
 *     custom **chai-stage SVG glyph** (single glass → tray → dual format
 *     → state-shape with pins → city skyline). The glyph progression
 *     literally illustrates "from a single kiosk to a multi-city brand".
 *   - Milestone cards alternate left/right on desktop and stack on the
 *     right of the spine on mobile. Each card carries a circular
 *     "tea-ring stamp" with the year and a small cumulative-outlet pill.
 *
 * Accessibility:
 *   - All decorative SVGs are `aria-hidden`. Information is conveyed in
 *     the heading hierarchy + text of each milestone card.
 *   - `prefers-reduced-motion`: spine renders fully drawn, glyph + card
 *     entry animations are skipped.
 */
export function JourneyTimeline() {
  const reduced = useReducedMotion();

  return (
    <Section bgcolor="background.default">
      <SectionHeading
        eyebrow="Our Journey"
        title="From a single kiosk to a multi-city retail brand"
      />

      <Box
        sx={{
          position: "relative",
          maxWidth: 1040,
          mx: "auto",
          // Padding-top so the first glyph isn't flush against the heading.
          pt: { xs: 2, md: 3 },
        }}
      >
        <PourSpine reduced={Boolean(reduced)} />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          {JOURNEY_MILESTONES.map((milestone, idx) => {
            const isLeft = idx % 2 === 0;
            const meta = JOURNEY_META[milestone.year];
            return (
              <Box
                key={milestone.year}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "80px 1fr",
                    md: "1fr 100px 1fr",
                  },
                  alignItems: "center",
                  // Generous vertical breathing-room so the glyphs sit clear
                  // of each other and the spine reads as a real pour.
                  mb: { xs: 6, md: 9 },
                  "&:last-of-type": { mb: 0 },
                }}
              >
                {/* Glyph stamp — centred on the spine */}
                <Box
                  sx={{
                    gridColumn: { xs: 1, md: 2 },
                    display: "flex",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <JourneyGlyph
                    kind={meta?.glyph ?? "single"}
                    size={88}
                  />
                </Box>

                {/* Desktop: left-side card (visible on even indices) */}
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    justifyContent: "flex-end",
                    gridColumn: 1,
                    pr: 4,
                    visibility: isLeft ? "visible" : "hidden",
                  }}
                >
                  <Box sx={{ maxWidth: 440, width: "100%" }}>
                    <JourneyMilestone {...milestone} align="right" />
                  </Box>
                </Box>

                {/* Desktop: right-side card (visible on odd indices) */}
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    justifyContent: "flex-start",
                    gridColumn: 3,
                    pl: 4,
                    visibility: isLeft ? "hidden" : "visible",
                  }}
                >
                  <Box sx={{ maxWidth: 440, width: "100%" }}>
                    <JourneyMilestone {...milestone} align="left" />
                  </Box>
                </Box>

                {/* Mobile: single right-of-spine card */}
                <Box
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

/**
 * Vertical SVG spine that draws itself on first scroll-into-view.
 *
 * Built as a single straight `<path>` with a `pathLength` animation so the
 * stroke fills top-to-bottom — the "pour" feel. The stroke uses an
 * amber → tea-brown gradient so the line warms as it descends. Subtle
 * outer glow gives the line presence without dominating.
 */
function PourSpine({ reduced }: { reduced: boolean }) {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        left: { xs: 39, md: "50%" },
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
        {/* Faint backing rail so the spine is still discoverable when the
            animated line hasn't drawn yet. */}
        <line
          x1={4}
          y1={0}
          x2={4}
          y2={100}
          stroke="rgba(160,107,67,0.16)"
          strokeWidth={1.2}
        />
        <motion.line
          x1={4}
          y1={0}
          x2={4}
          y2={100}
          stroke="url(#journey-pour-gradient)"
          strokeWidth={3}
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0 }}
          whileInView={reduced ? undefined : { pathLength: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            filter:
              "drop-shadow(0 0 6px rgba(212,165,116,0.45)) drop-shadow(0 0 1px rgba(160,107,67,0.6))",
          }}
        />
      </svg>
    </Box>
  );
}
