/**
 * INKOTEA type system — Oswald across the site:
 *   - body: paragraphs, UI, labels, form fields
 *   - display: h1–h4 headings (bold)
 *   - accent: hero highlights, taglines, and accent lines
 *
 * Use the helpers below instead of inline `fontFamily` / `fontStyle`.
 */
export const fonts = {
  body: 'var(--font-oswald), "Oswald", sans-serif',
  display: 'var(--font-oswald), "Oswald", sans-serif',
  accent: 'var(--font-oswald), "Oswald", sans-serif',
} as const;

export type InkoteaFontRole = keyof typeof fonts;

/** Oswald — paragraphs, buttons, chips, form fields */
export const fontBodySx = { fontFamily: fonts.body } as const;

/** Oswald — h1–h4 headings */
export const fontDisplaySx = { fontFamily: fonts.display, fontWeight: 700 } as const;

/** Oswald — hero highlights, taglines, and accent lines */
export const fontDisplayItalicSx = {
  fontFamily: fonts.accent,
  fontStyle: "normal",
  fontWeight: 500,
} as const;

/** Alias — same Oswald accent stack */
export const fontAccentSx = fontDisplayItalicSx;
