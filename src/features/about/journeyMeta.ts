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
  "2021": { glyph: "single", cumulative: "First outlets" },
  "2023": { glyph: "map", cumulative: "First North State" },
  "2026": { glyph: "skyline", cumulative: "40+ outlets" },
};
