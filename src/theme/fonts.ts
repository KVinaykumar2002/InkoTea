/**
 * INKOTEA type system:
 *   - Inter (body, UI, labels, form fields)
 *   - Playfair Display (headings h1–h4)
 *   - Calibri (hero highlights, taglines, and other accent lines)
 *
 * Use the helpers below instead of inline `fontFamily` / `fontStyle`.
 */
export const fonts = {
  body: 'var(--font-inter), "Inter", sans-serif',
  display: 'var(--font-playfair), "Playfair Display", serif',
  accent: 'var(--font-calibri), "Calibri", "Candara", "Segoe UI", sans-serif',
} as const;

export type InkoteaFontRole = keyof typeof fonts;

/** Inter — paragraphs, buttons, chips, form fields */
export const fontBodySx = { fontFamily: fonts.body } as const;

/** Playfair Display — h1–h4 headings */
export const fontDisplaySx = { fontFamily: fonts.display } as const;

/** Calibri — hero highlights, taglines, and accent lines (replaces italic Playfair) */
export const fontDisplayItalicSx = {
  fontFamily: fonts.accent,
  fontStyle: "normal",
  fontWeight: 400,
} as const;

/** Alias — same Calibri accent stack */
export const fontAccentSx = fontDisplayItalicSx;
