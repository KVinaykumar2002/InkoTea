/**
 * Visual / numeric metadata layered on top of `ROADMAP` so the Journey
 * Timeline can tell a richer story than year + paragraph.
 *
 * Kept separate from `src/data/competitors.ts` so the data file stays
 * presentation-agnostic — `ROADMAP` is also consumed by the investor
 * `RoadmapTimeline`, which doesn't need (and shouldn't carry) about-page
 * styling concerns.
 */
export type GlyphKind = "single" | "tray" | "dual" | "map" | "skyline";

export interface JourneyMeta {
  /** Which of the chai-stage SVG glyphs to render for this milestone. */
  glyph: GlyphKind;
  /** Cumulative outlet count at this milestone — rendered as a small pill. */
  cumulative: string;
}

/**
 * Year → meta map. Years not in this map fall back to a "single" glyph
 * with no cumulative pill, so the timeline never crashes when a new
 * milestone is added to `ROADMAP` before this map is updated.
 */
export const JOURNEY_META: Record<string, JourneyMeta> = {
  "2021": { glyph: "single", cumulative: "1 outlet" },
  "2023": { glyph: "tray", cumulative: "25 outlets" },
  "2025": { glyph: "dual", cumulative: "30 outlets" },
  "2026": { glyph: "map", cumulative: "40+ outlets" },
  "2027": { glyph: "skyline", cumulative: "100+ outlets" },
};
