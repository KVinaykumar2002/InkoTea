# INKOTEA Web — Project Context

> Single source of truth for AI assistants and new contributors. Read this
> before making structural changes. Keep it short — link out, don't bloat.

## 1. What this is

A statically exported Next.js 14 (App Router) marketing site for
**INKOTEA**, a chai franchise brand. Three main jobs:

1. Tell the brand story (Home, About, Why INKOTEA, Blog).
2. Convert franchise leads (Franchise, Investor, Footer, Contact forms).
3. Surface outlets, menu, and FAQ for end customers.

`next.config.mjs` runs `output: "export"`, so everything must be
statically renderable — no server runtimes, no `revalidate`, all images
shipped under `/public/brand/*`.

## 2. Stack & versions (see `package.json`)

| Concern | Library | Notes |
|---|---|---|
| Framework | Next 14 (App Router) | RSC by default; `"use client"` for interactive bits |
| UI kit | MUI v6 (`@mui/material`, `@mui/icons-material`) | Always import from submodules (`@mui/material/Box`), never the barrel |
| Theming | `@mui/material/styles` + `ThemeModeProvider` | Light/dark via `useThemeMode()`; persisted to `localStorage` under `inkotea-theme-mode` |
| Forms | Formik + Yup | Wrapped by `FormikTextField` / `FormikPhoneField` / `FormikSelect` |
| Motion | `framer-motion` | Always respect `useReducedMotion()` |
| Counters | `react-countup` + `react-intersection-observer` (`AnimatedCounter`) **and** a custom `NumberCounter` in `heroMotion.tsx`. Pick the right one when adding new counters (see "Known tech debt"). |
| Markdown | `react-markdown` | Blog detail only |

## 3. Folder structure

```
src/
├── app/                  Next App Router routes (one folder per page)
│   ├── layout.tsx        Root layout (fonts, metadata, providers)
│   ├── providers.tsx     MUI cache → theme → MainLayout
│   ├── page.tsx          Home
│   ├── about/, franchise/, contact/, menu/, outlets/, blog/, blog/[slug]/,
│   ├── faq/, investor/, why-inkotea/, privacy/, terms/
│   ├── loading.tsx, not-found.tsx, robots.ts, sitemap.ts
├── components/
│   ├── common/           Section, SectionHeading, PageHero, ScrollReveal,
│   │                     AnimatedCounter, BrandLogo, SafeImage
│   ├── forms/            FormikTextField/PhoneField/Select, FormSuccessState,
│   │                     darkSurfaceFieldSx (shared sx tokens)
│   └── layout/           Navbar, Footer, MainLayout, WhatsAppFAB,
│                         StickyFranchiseCTA, FooterEnquiryForm
├── features/             One folder per page-level feature
│   ├── home/             HeroSection (+ HeroBackdrop, HeroAtmosphere,
│   │                     heroMotion helpers), StatsStrip, PositioningSection,
│   │                     ModelsPreview, ExperienceSection, PressLogosStrip,
│   │                     FranchiseCTASection
│   ├── about/, blog/, contact/, faq/, franchise/, investor/, menu/,
│   ├── outlets/, why/    (each contains hero + sub-sections)
├── hooks/                useContactForm, useFranchiseForm, useFooterEnquiryForm
├── lib/                  brand (BRAND constants, nav links), brandImages
│                         (asset registry + menu image helpers), seo
├── data/                 Static content: blogPosts, competitors, faqs,
│                         franchiseModels, menu, outlets
├── services/             leads.ts (mocked submitLead — swap for real fetch)
├── theme/                palette.ts, typography.ts, index.ts (buildTheme),
│                         ThemeModeProvider.tsx
└── types/                Cross-cutting TS interfaces
```

## 4. Conventions (must follow)

- **MUI imports**: always submodule (`@mui/material/Box`,
  `@mui/icons-material/Send`). Never `from "@mui/material"`.
- **Component size**: keep files under ~250 LOC. If a feature needs
  multiple atoms (hero + cards + glyphs), split per concern under the
  same `features/<area>/` folder (see `features/about/Journey*` and
  `features/home/Hero*`).
- **Business logic in hooks**: forms route through dedicated `useXxxForm`
  hooks under `src/hooks/`. UI components never call `submitLead` directly.
- **Forms**: Formik + Yup. Validation schemas live in
  `features/<area>/validationSchema.ts` for non-trivial flows. Use the
  shared `Formik*` wrappers; never raw `<TextField>` inside a form.
- **Dark-surface form cards** (Footer, Contact, Franchise) share tokens
  from `components/forms/darkSurfaceFieldSx.ts` — build per-card field
  styles with `buildDarkSurfaceFieldSx(cardSurfaceColor)`.
- **Theme**: use palette tokens (`primary.main`, `text.secondary`,
  `divider`, etc.) and `theme.spacing` via `sx` shorthands (`p: 3`).
  Avoid hardcoded pixel values — exception: deliberate motion offsets
  in `framer-motion` animations.
- **Pinned light text over dark photos**: when a section uses a fixed
  dark backdrop (kiosk photo, hero gradient) in both themes, hardcode
  `color: "#fff"`. **Do not** use `primary.contrastText` — in dark mode
  that resolves to charcoal and the text vanishes. See the contact-page
  hero for the canonical example (also `HeroSection.tsx`).
- **Brand assets**: register every shipped image in
  `lib/brandImages.ts` under `BRAND_IMAGES`. Components import the
  registry, never raw `/brand/foo.jpeg` strings. Logo lives at `/logo.png`
  in `public/` and is loaded directly by `BrandLogo`.
- **Accessibility**: every interactive surface needs a label/aria;
  the `MainLayout` ships a "Skip to main content" link; respect
  `useReducedMotion()` in every Framer animation.
- **Static export friendly**: no `cookies()`, no `headers()`, no
  Route Handlers. Images stay `unoptimized: true`.

## 5. Lead-capture forms — current shape

Three nearly-identical Formik forms, each backed by a dedicated hook:

| Form | Component | Hook | Source tag |
|---|---|---|---|
| Footer mini | `FooterEnquiryForm` | `useFooterEnquiryForm` | `"footer"` |
| Contact page | `ContactFormBlock` | `useContactForm` | `"contact"` |
| Franchise page | `FranchiseForm` | `useFranchiseForm` | `"franchise"` |

All three:
- Share Snackbar success/error state shape (`SnackbarState`),
- Share the `submittedName` → `<FormSuccessState />` inline-success
  pattern,
- POST through `services/leads.ts::submitLead` (mocked, swap for real
  endpoint when backend lands),
- Render on a dark tea-brown card and use `darkSurfaceFieldSx` tokens.

**There is intentional duplication today.** A future refactor (see
"Known tech debt") will pull the shared shell into a
`useLeadFormShell` helper + `<DarkSurfaceFormShell>` wrapper.

## 6. Theme palette quick reference

`src/theme/palette.ts` is the only place colors are defined. Highlights:

- **Light mode**: cream backgrounds (`#FBF7F1`), olive-green primary
  (`#5C6B2C`), amber-gold secondary, tea-brown accent.
- **Dark mode**: charcoal backgrounds (`#1C1A12`), lighter olive
  primary, same gold secondary. **Note**: `primary.contrastText`
  resolves to `charcoal` in dark mode — never use it on top of a fixed
  dark photographic backdrop (see convention above).

## 7. Known tech debt / cleanup roadmap

Tracked here so future agents don't re-discover the same items.

### Phase 1 (done — see commit history)
- Removed dead `BRAND_IMAGES` keys (`logoMark`, `citySkylineSunset`).
- Removed unused `FORMAT_DEFAULT_IMAGE` export from `lib/brandImages.ts`.
- Replaced inlined HQ address block on `app/contact/page.tsx` with the
  pre-existing `OfficeAddressCard` component.
- Dropped `fullBleed` prop from `components/common/Section.tsx`
  (zero callers).
- Switched `ThemeModeProvider` + `theme/index.ts` to MUI submodule
  imports.
- Guarded `services/leads.ts` dev-mirror `console.info` behind
  `NODE_ENV !== "production"`.
- Fixed contact-page hero color regression (`primary.contrastText` →
  fixed `#fff`) so the h1 stays readable in dark mode.

### Phase 2 — pending approval (medium risk, high payoff)
1. **Consolidate lead-form shell**: extract `useLeadFormShell()` for
   shared snackbar/submittedName state and a thin
   `<DarkSurfaceFormShell>` JSX wrapper. Targets ~150 LOC reduction
   across `FooterEnquiryForm`, `ContactFormBlock`, `FranchiseForm`.
2. **Counter consolidation**: keep `AnimatedCounter` (uses
   `react-countup`) as the public API, remove `NumberCounter` from
   `heroMotion.tsx`, and have the hero use the same primitive. Saves
   one mental model and a code path.
3. **`PageHero` for content pages**: contact, about-story, outlets,
   menu, why, investor all roll bespoke heroes. Audit which can route
   through `<PageHero variant="dark" />` and which truly need a custom
   photo backdrop. Aim for one shared "photo-backdrop hero" primitive.

### Phase 3 — stretch (low priority, structural)
4. **Split files >250 LOC** per house style:
   - `features/home/HeroSection.tsx` (399) → move inline
     `MetricCard` + `ScrollIndicator` to siblings.
   - `components/layout/Navbar.tsx` (383) → split desktop vs mobile.
   - `features/about/JourneyGlyph.tsx` (365) → one file per SVG glyph.
   - `components/layout/Footer.tsx` (356) → extract the kiosk-photo
     band + nav columns.
   - `features/franchise/FranchiseForm.tsx` (351) → trust-side panel
     into its own component.
5. **Memoization audit**: `JourneyGlyph` is already `memo`'d; check
   `MenuItemCard`, `BlogCard`, `MetricCard` (HeroSection),
   `OutletsExplorer` rows.
6. Consider scoping `BRAND_IMAGES` to typed namespaces
   (`KIOSK_IMAGES`, `CAFE_IMAGES`, `HERO_IMAGES`) for discoverability.

## 8. Common gotchas

- **Static export**: `next dev` and `next build` both work locally;
  any `dynamic = "force-dynamic"` or runtime feature **will** break the
  export. Surface this in PR review.
- **`enableReinitialize`**: not currently needed because none of the
  forms re-hydrate from server state. Add it if/when a real backend
  pre-fills values.
- **`AppRouterCacheProvider`** must wrap the tree above
  `ThemeProvider` for MUI emotion cache to work with the App Router.
  Don't reorder `Providers`.
- **Theme overrides** for MUI inputs are wide (`MuiOutlinedInput`,
  `MuiInputLabel`, `MuiSelect`, etc.). Dark-card forms override these
  again via `buildDarkSurfaceFieldSx` because the global theme
  optimises for light cream cards. Touch carefully — visual regressions
  cascade across every form on the site.

## 9. Operational

- Dev: `npm run dev`
- Build: `npm run build` (must succeed before merging)
- Lint: `npm run lint`
- Type-check: `npx tsc --noEmit`
- Favicons: `npm run favicons` (regenerates from `/public/logo.png`)

## 10. Where to start when…

| Task | Files to open |
|---|---|
| Add a new page | `src/app/<route>/page.tsx`, optionally `features/<route>/<Section>.tsx`, register in `lib/brand.ts::NAV_LINKS` |
| Add a brand image | drop into `public/brand/`, register in `lib/brandImages.ts::BRAND_IMAGES` |
| Adjust theme tokens | `src/theme/palette.ts` (colors), `typography.ts` (type scale), `index.ts` (component overrides) |
| Add a form field | extend the relevant `useXxxForm` hook + its validation schema, then drop a `Formik*` wrapper into the form component |
| New franchise data | `src/data/franchiseModels.ts` (sole source of truth for kiosk vs café numbers) |

---

_Last updated: 2026-05-15. When changing structure, update this doc in the same PR._
