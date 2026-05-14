"use client";

import { memo } from "react";
import Box from "@mui/material/Box";
import { motion, useReducedMotion } from "framer-motion";
import type { GlyphKind } from "./journeyMeta";

/**
 * A circular "tea-stamp" disc with one of five hand-drawn chai-stage SVG
 * glyphs at its centre. Glyphs progress visually with the milestone:
 *
 *   single  → one chai glass with steam               (kiosk launch)
 *   tray    → three glasses on a tray                 (franchise scale)
 *   dual    → glass + café cup-and-saucer side-by-side (dual format)
 *   map     → state-shaped blob with glass + pins     (regional spread)
 *   skyline → city silhouette behind a hero glass     (multi-city brand)
 *
 * The disc itself uses the warm amber-gold brand palette and feels like a
 * tea-ring stamp pressed on the page — a visual rhyme with the year stamp
 * inside `JourneyMilestone`. Glyphs respect `prefers-reduced-motion` and
 * inherit `currentColor` from the surrounding theme so they read in both
 * light and dark mode.
 */
interface JourneyGlyphProps {
  kind: GlyphKind;
  /** Size of the disc in px. Default 80. */
  size?: number;
}

export const JourneyGlyph = memo(function JourneyGlyph({
  kind,
  size = 80,
}: JourneyGlyphProps) {
  const reduced = useReducedMotion();

  return (
    <Box
      component={motion.div}
      initial={reduced ? false : { scale: 0.6, opacity: 0 }}
      whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "primary.dark",
        // Warm radial stamp surface — feels like a tea-ring imprint.
        background: (t) =>
          t.palette.mode === "dark"
            ? "radial-gradient(circle at 35% 30%, rgba(212,165,116,0.32), rgba(58,34,16,0.85) 75%)"
            : "radial-gradient(circle at 35% 30%, rgba(255,238,210,0.95), rgba(212,165,116,0.35) 75%)",
        boxShadow: (t) =>
          t.palette.mode === "dark"
            ? "0 0 0 2px rgba(212,165,116,0.45), 0 0 0 6px rgba(212,165,116,0.12)"
            : "0 0 0 2px rgba(160,107,67,0.55), 0 0 0 6px rgba(212,165,116,0.22)",
        "&::after": {
          // Subtle inner ring — the tea-stain "second pass".
          content: '""',
          position: "absolute",
          inset: 6,
          borderRadius: "50%",
          border: "1px dashed rgba(160,107,67,0.35)",
          pointerEvents: "none",
        },
      }}
    >
      <svg
        width={Math.round(size * 0.62)}
        height={Math.round(size * 0.62)}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden
        style={{ position: "relative", zIndex: 1 }}
      >
        {renderGlyph(kind)}
      </svg>
    </Box>
  );
});

function renderGlyph(kind: GlyphKind) {
  switch (kind) {
    case "single":
      return <SingleGlassGlyph />;
    case "tray":
      return <TrayGlyph />;
    case "dual":
      return <DualGlyph />;
    case "map":
      return <MapGlyph />;
    case "skyline":
      return <SkylineGlyph />;
  }
}

/* ------------------------------------------------------------------ */
/*  Individual glyphs                                                  */
/* ------------------------------------------------------------------ */

const STROKE = "currentColor";
const TEA_FILL = "rgba(160,107,67,0.9)";
const GLASS_FILL = "rgba(212,165,116,0.18)";
const TEA_SURFACE = "rgba(255,238,210,0.6)";
const STEAM_OPACITY = 0.55;

/** Single chai glass with one steam wisp — milestone 1 (kiosk launch). */
function SingleGlassGlyph() {
  return (
    <g>
      <path
        d="M22 20 L22 50 Q22 56 32 56 Q42 56 42 50 L42 20 Z"
        fill={GLASS_FILL}
        stroke={STROKE}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path
        d="M23 28 L23 50 Q23 55 32 55 Q41 55 41 50 L41 28 Z"
        fill={TEA_FILL}
      />
      <ellipse cx={32} cy={28} rx={9} ry={1.6} fill={TEA_SURFACE} />
      <path
        d="M28 14 Q26 10 28 7"
        stroke={STROKE}
        strokeWidth={1.4}
        strokeLinecap="round"
        opacity={STEAM_OPACITY}
      />
      <path
        d="M36 14 Q38 10 36 7"
        stroke={STROKE}
        strokeWidth={1.4}
        strokeLinecap="round"
        opacity={STEAM_OPACITY}
      />
    </g>
  );
}

/** Three glasses on a tray — milestone 2 (franchise scale / many cups). */
function TrayGlyph() {
  return (
    <g>
      {/* Tray slab */}
      <rect x={4} y={50} width={56} height={4} rx={2} fill="rgba(92,58,33,0.45)" />
      {/* Glass 1 (left, shorter) */}
      <path
        d="M10 26 L10 48 Q10 51 16 51 Q22 51 22 48 L22 26 Z"
        fill={GLASS_FILL}
        stroke={STROKE}
        strokeWidth={1.3}
      />
      <path d="M11 31 L11 48 Q11 50 16 50 Q21 50 21 48 L21 31 Z" fill={TEA_FILL} />
      {/* Glass 2 (centre, tallest) */}
      <path
        d="M26 18 L26 48 Q26 51 32 51 Q38 51 38 48 L38 18 Z"
        fill={GLASS_FILL}
        stroke={STROKE}
        strokeWidth={1.3}
      />
      <path d="M27 26 L27 48 Q27 50 32 50 Q37 50 37 48 L37 26 Z" fill={TEA_FILL} />
      {/* Glass 3 (right, shorter) */}
      <path
        d="M42 26 L42 48 Q42 51 48 51 Q54 51 54 48 L54 26 Z"
        fill={GLASS_FILL}
        stroke={STROKE}
        strokeWidth={1.3}
      />
      <path d="M43 31 L43 48 Q43 50 48 50 Q53 50 53 48 L53 31 Z" fill={TEA_FILL} />
      {/* Steam wisps */}
      <path
        d="M16 22 Q14 18 16 14"
        stroke={STROKE}
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={STEAM_OPACITY}
      />
      <path
        d="M32 14 Q30 9 32 5"
        stroke={STROKE}
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={STEAM_OPACITY}
      />
      <path
        d="M48 22 Q50 18 48 14"
        stroke={STROKE}
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={STEAM_OPACITY}
      />
    </g>
  );
}

/** Chai glass + café cup-and-saucer — milestone 3 (dual format launch). */
function DualGlyph() {
  return (
    <g>
      {/* Chai glass (left) */}
      <path
        d="M8 18 L8 48 Q8 53 18 53 Q28 53 28 48 L28 18 Z"
        fill={GLASS_FILL}
        stroke={STROKE}
        strokeWidth={1.5}
      />
      <path d="M9 26 L9 48 Q9 52 18 52 Q27 52 27 48 L27 26 Z" fill={TEA_FILL} />
      <ellipse cx={18} cy={26} rx={8} ry={1.4} fill={TEA_SURFACE} />
      {/* Saucer */}
      <ellipse cx={46} cy={54} rx={14} ry={2.2} fill="rgba(92,58,33,0.4)" />
      {/* Cup */}
      <path
        d="M36 34 L36 50 Q36 53 46 53 Q56 53 56 50 L56 34 Z"
        fill={GLASS_FILL}
        stroke={STROKE}
        strokeWidth={1.5}
      />
      <path d="M37 38 L37 50 Q37 52 46 52 Q55 52 55 50 L55 38 Z" fill={TEA_FILL} />
      <ellipse cx={46} cy={38} rx={8} ry={1.2} fill={TEA_SURFACE} />
      {/* Cup handle */}
      <path
        d="M56 38 Q62 38 62 43 Q62 48 56 48"
        fill="none"
        stroke={STROKE}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* Steam from glass */}
      <path
        d="M14 12 Q12 8 14 5"
        stroke={STROKE}
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={STEAM_OPACITY}
      />
      <path
        d="M22 12 Q24 8 22 5"
        stroke={STROKE}
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={STEAM_OPACITY}
      />
      {/* Steam from cup */}
      <path
        d="M42 30 Q40 26 42 23"
        stroke={STROKE}
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={STEAM_OPACITY}
      />
      <path
        d="M50 30 Q52 26 50 23"
        stroke={STROKE}
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={STEAM_OPACITY}
      />
    </g>
  );
}

/** Stylised state-shape outline with a centred glass + city pins — milestone 4. */
function MapGlyph() {
  return (
    <g>
      {/* Map blob (suggests AP + Telangana — abstract, not literal) */}
      <path
        d="M12 22 Q8 32 14 42 Q20 52 30 52 Q40 53 48 48 Q56 42 56 32 Q56 22 48 16 Q38 12 28 14 Q18 16 12 22 Z"
        fill="rgba(212,165,116,0.12)"
        stroke={STROKE}
        strokeWidth={1.4}
        strokeDasharray="2.5 2"
      />
      {/* Chai glass at centre */}
      <path
        d="M26 28 L26 40 Q26 43 32 43 Q38 43 38 40 L38 28 Z"
        fill={GLASS_FILL}
        stroke={STROKE}
        strokeWidth={1.3}
      />
      <path d="M27 31 L27 40 Q27 42 32 42 Q37 42 37 40 L37 31 Z" fill={TEA_FILL} />
      {/* City pins */}
      <circle cx={20} cy={28} r={2.2} fill={STROKE} />
      <circle cx={46} cy={26} r={2.2} fill={STROKE} />
      <circle cx={42} cy={44} r={2.2} fill={STROKE} />
      {/* Steam */}
      <path
        d="M30 24 Q28 20 30 17"
        stroke={STROKE}
        strokeWidth={1.1}
        strokeLinecap="round"
        opacity={STEAM_OPACITY}
      />
      <path
        d="M34 24 Q36 20 34 17"
        stroke={STROKE}
        strokeWidth={1.1}
        strokeLinecap="round"
        opacity={STEAM_OPACITY}
      />
    </g>
  );
}

/** Skyline silhouette behind a hero chai glass — milestone 5 (multi-city). */
function SkylineGlyph() {
  return (
    <g>
      {/* Buildings (back) */}
      <rect x={8} y={32} width={5} height={22} fill="rgba(92,58,33,0.55)" />
      <rect x={13} y={24} width={6} height={30} fill="rgba(92,58,33,0.7)" />
      <rect x={19} y={28} width={4} height={26} fill="rgba(92,58,33,0.55)" />
      <rect x={23} y={18} width={8} height={36} fill="rgba(92,58,33,0.8)" />
      <rect x={31} y={26} width={5} height={28} fill="rgba(92,58,33,0.6)" />
      <rect x={36} y={20} width={7} height={34} fill="rgba(92,58,33,0.75)" />
      <rect x={43} y={28} width={5} height={26} fill="rgba(92,58,33,0.6)" />
      <rect x={48} y={24} width={6} height={30} fill="rgba(92,58,33,0.7)" />
      <rect x={54} y={30} width={4} height={24} fill="rgba(92,58,33,0.55)" />
      {/* Window dots */}
      <circle cx={15} cy={30} r={0.6} fill="rgba(255,238,210,0.7)" />
      <circle cx={16} cy={38} r={0.6} fill="rgba(255,238,210,0.7)" />
      <circle cx={26} cy={28} r={0.6} fill="rgba(255,238,210,0.7)" />
      <circle cx={28} cy={36} r={0.6} fill="rgba(255,238,210,0.7)" />
      <circle cx={39} cy={28} r={0.6} fill="rgba(255,238,210,0.7)" />
      <circle cx={40} cy={36} r={0.6} fill="rgba(255,238,210,0.7)" />
      <circle cx={50} cy={30} r={0.6} fill="rgba(255,238,210,0.7)" />
      {/* Stars / lights in the sky */}
      <circle cx={14} cy={12} r={0.9} fill={STROKE} opacity={0.5} />
      <circle cx={28} cy={8} r={0.7} fill={STROKE} opacity={0.4} />
      <circle cx={46} cy={10} r={0.9} fill={STROKE} opacity={0.5} />
      <circle cx={56} cy={16} r={0.7} fill={STROKE} opacity={0.4} />
      {/* Hero chai glass in the foreground (lower-right) */}
      <path
        d="M44 40 L44 58 Q44 62 52 62 Q60 62 60 58 L60 40 Z"
        fill="rgba(212,165,116,0.95)"
        stroke={STROKE}
        strokeWidth={1.4}
      />
      <path
        d="M45 44 L45 58 Q45 61 52 61 Q59 61 59 58 L59 44 Z"
        fill="rgba(160,107,67,0.95)"
      />
      <ellipse cx={52} cy={44} rx={6} ry={1.2} fill={TEA_SURFACE} />
      <path
        d="M49 35 Q47 31 49 28"
        stroke={STROKE}
        strokeWidth={1.1}
        strokeLinecap="round"
        opacity={STEAM_OPACITY}
      />
      <path
        d="M55 35 Q57 31 55 28"
        stroke={STROKE}
        strokeWidth={1.1}
        strokeLinecap="round"
        opacity={STEAM_OPACITY}
      />
    </g>
  );
}
