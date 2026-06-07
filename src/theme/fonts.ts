/**
 * INKOTEA type system:
 *   - display / accent: Oswald — headings, taglines, UI chrome
 *   - body: Oswald — buttons, labels, overlines, form fields
 *   - description: Open Sans — paragraphs, supporting copy, card text
 *
 * Use the helpers below instead of inline `fontFamily` / `fontStyle`.
 */
export const fonts = {
  body: 'var(--font-oswald), "Oswald", sans-serif',
  display: 'var(--font-oswald), "Oswald", sans-serif',
  accent: 'var(--font-oswald), "Oswald", sans-serif',
  description: 'var(--font-open-sans), "Open Sans", sans-serif',
} as const;

export type InkoteaFontRole = keyof typeof fonts;

/** Oswald — buttons, chips, form fields, overlines */
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

/** Open Sans — body copy, section descriptions, card supporting text */
export const fontDescriptionSx = { fontFamily: fonts.description } as const;
