/**
 * INKOTEA uses exactly two typefaces site-wide:
 *   - Inter (body, UI, labels)
 *   - Playfair Display (headings, brand emphasis)
 *
 * Import stacks from here — do not add other font-family values in components.
 */
export const fonts = {
  body: 'var(--font-inter), "Inter", sans-serif',
  display: 'var(--font-playfair), "Playfair Display", serif',
} as const;

/** Inter — paragraphs, buttons, chips, form fields */
export const fontBodySx = { fontFamily: fonts.body } as const;

/** Playfair Display — h1–h4 and brand lines */
export const fontDisplaySx = { fontFamily: fonts.display } as const;

/** Playfair italic — hero highlights and taglines */
export const fontDisplayItalicSx = {
  fontFamily: fonts.display,
  fontStyle: "italic",
} as const;
