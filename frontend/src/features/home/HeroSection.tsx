"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StorefrontIcon from "@mui/icons-material/Storefront";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import PaymentsIcon from "@mui/icons-material/Payments";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

import { DEFAULT_HERO_CONTENT, normalizeHeroContent, type HeroMetric } from "@shared/pageContent";
import { usePageContent } from "@/hooks/useApiContent";
import { fontDescriptionSx } from "@/theme/fonts";
import { HeroBackdrop } from "./HeroBackdrop";
import {
  BlurReveal,
  EASE_OUT_QUART,
  FadeUp,
  HERO_TIMING,
  LineReveal,
  NumberCounter,
  ShimmerSpan,
} from "./heroMotion";

/**
 * Home hero — chai photograph + cinematic Framer Motion animations.
 *
 * Layout is unchanged from the previous static version. What's new:
 *
 *   - Entire section fades + scales 0.98 → 1 over 1s (hero entry).
 *   - Sequenced content reveal (chip → lines → shimmer → subhead → CTAs →
 *     metrics → counter → scroll caption).
 *   - Slow Ken-Burns zoom and tiny breathe on the photo (handled in
 *     {@link HeroBackdrop}).
 *   - Organic steam wisps + drifting leaves on a separate parallax plane
 *     (handled in {@link HeroAtmosphere}).
 *   - Apple-style pointer parallax driving the photo, steam and leaves at
 *     different intensities. Springs damp the motion so it never feels
 *     literal.
 *   - Primary CTA is a solid filled pill; outline CTA keeps the frosted-glass look.
 *   - Scroll indicator has a bouncing arrow + opacity pulse.
 *
 * Every motion respects `prefers-reduced-motion`: parallax tracking, loops,
 * and entry animations all collapse to their final state.
 */
const METRIC_ICONS = {
  outlets: EmojiFoodBeverageIcon,
  investment: PaymentsIcon,
  sales: TrendingUpIcon,
} as const;

export function HeroSection() {
  const { content: rawHero } = usePageContent("hero", DEFAULT_HERO_CONTENT);
  const hero = useMemo(() => normalizeHeroContent(rawHero), [rawHero]);
  const reduced = Boolean(useReducedMotion());
  const [slideIndex, setSlideIndex] = useState(0);
  const overlaySlide = hero.slides[0];
  const isFirstSlide = slideIndex === 0;
  const onSelectSlide = useCallback((index: number) => {
    setSlideIndex(index);
  }, []);

  useEffect(() => {
    if (slideIndex >= hero.slides.length) {
      setSlideIndex(Math.max(0, hero.slides.length - 1));
    }
  }, [hero.slides.length, slideIndex]);

  // Pointer position normalised to [-1, 1] across the viewport. The springs
  // damp the raw signal so layer movement feels analog, not jittery — this
  // is the "Apple feel" the brief asked for.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 32, stiffness: 70, mass: 0.7 } as const;
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(nx);
      mouseY.set(ny);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, mouseX, mouseY]);

  return (
    <Box
      component={motion.section}
      initial={reduced ? false : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduced ? 0 : HERO_TIMING.heroEntry, ease: "easeOut" }}
      sx={{
        position: "relative",
        /* Compact on phones so the hero stays slim; taller on larger screens */
        minHeight: {
          xs: "35dvh",
          sm: "62dvh",
          md: "min(88vh, 820px)",
          lg: "min(92vh, 900px)",
        },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        color: "#fff",
        /* On phones sit fully below the fixed navbar (no overlap); keep the
           full-bleed tuck on desktop. */
        mt: { xs: 0, md: -10 },
        pt: { xs: 2, md: 10 },
        pb: { xs: 1.5, md: 0 },
        /* Brand-dark backdrop frames the uncut (object-fit: contain) image and
           keeps the white overlay copy readable where the photo letterboxes. */
        bgcolor: "#1A0E08",
        willChange: "transform, opacity",
      }}
    >
      <HeroBackdrop
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        reduced={reduced}
        activeIndex={slideIndex}
        onSelectSlide={onSelectSlide}
        slides={hero.slides}
      />

      <AnimatePresence mode="wait">
        {isFirstSlide && overlaySlide ? (
          <Box
            key="hero-content"
            component={motion.div}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.45, ease: "easeOut" }}
            sx={{ width: "100%" }}
          >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 3,
          py: { xs: 1.5, sm: 4, md: 6, lg: 8 },
          px: { xs: 2, sm: 3 },
          width: "100%",
        }}
      >
        <Stack
          spacing={{ xs: 1.25, sm: 2, md: 3, lg: 3.5 }}
          sx={{ maxWidth: { xs: "100%", md: 600 } }}
        >
          <FadeUp delay={HERO_TIMING.chip} y={14} reduced={reduced}>
            <Chip
              label={overlaySlide.chip}
              sx={{
                alignSelf: "flex-start",
                bgcolor: "rgba(212, 165, 116, 0.18)",
                color: "secondary.light",
                border: "1px solid rgba(212, 165, 116, 0.45)",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontSize: { xs: "0.625rem", sm: "0.7rem" },
                px: { xs: 0.75, sm: 1 },
                height: { xs: 24, sm: 32 },
                backdropFilter: "blur(8px)",
                boxShadow: "none",
              }}
            />
          </FadeUp>

          <Typography
            variant="h1"
            sx={{
              m: 0,
              color: "#fff",
              fontWeight: 700,
              fontSize: {
                xs: "clamp(1.5rem, 7.5vw, 2rem)",
                sm: "clamp(1.75rem, 5vw, 2.5rem)",
                md: undefined,
              },
              lineHeight: { xs: 1.08, md: 1.05 },
              maxWidth: 600,
              textShadow: "0 2px 16px rgba(0,0,0,0.85), 0 0 40px rgba(0,0,0,0.5)",
            }}
          >
            <LineReveal delay={HERO_TIMING.line1} reduced={reduced}>
              {overlaySlide.titleLine1}
            </LineReveal>
            <BlurReveal delay={HERO_TIMING.line2} duration={1.1} blur={10} reduced={reduced}>
              <Box
                component="span"
                sx={{
                  display: "block",
                  fontSize: { xs: "0.8em", sm: "0.76em", md: "0.68em" },
                  lineHeight: 1.2,
                }}
              >
                <ShimmerSpan delay={HERO_TIMING.shimmer} reduced={reduced}>
                  {overlaySlide.titleLine2}
                </ShimmerSpan>
              </Box>
            </BlurReveal>
          </Typography>

          <FadeUp delay={HERO_TIMING.subhead} y={0} reduced={reduced}>
            <Typography
              variant="h5"
              component="p"
              sx={{
                ...fontDescriptionSx,
                m: 0,
                color: "rgba(255,255,255,0.88)",
                fontWeight: 400,
                fontSize: { xs: "0.8125rem", sm: "0.9375rem", md: undefined },
                maxWidth: 540,
                lineHeight: { xs: 1.45, md: 1.55 },
                textShadow: "0 2px 14px rgba(0,0,0,0.85), 0 0 32px rgba(0,0,0,0.45)",
                display: { xs: "-webkit-box", md: "block" },
                WebkitLineClamp: { xs: 2, sm: 3, md: "unset" },
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {overlaySlide.subhead}
            </Typography>
          </FadeUp>

          <FadeUp delay={HERO_TIMING.ctas} y={22} reduced={reduced} sx={{ mt: { xs: 0.25, md: 1 } }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2 }}
              sx={{ width: "100%", maxWidth: "100%" }}
            >
              <Button
                component={Link}
                href={overlaySlide.primaryCtaHref}
                variant="contained"
                color="secondary"
                size="medium"
                endIcon={
                  <ArrowForwardIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                }
                sx={{
                  alignSelf: "flex-start",
                  width: "auto",
                  minWidth: { xs: 0, sm: 240 },
                  minHeight: { xs: 36, sm: 44, md: 48 },
                  py: { xs: 0.625, sm: 1.25, md: 1.5 },
                  px: { xs: 2, sm: 3, md: 4 },
                  fontSize: { xs: "0.8125rem", sm: "1rem", md: "1.0625rem" },
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  color: "primary.dark",
                  bgcolor: "secondary.main",
                  boxShadow: {
                    xs: "0 8px 20px -10px rgba(212,165,116,0.55)",
                    sm: "0 12px 32px -10px rgba(212,165,116,0.65)",
                  },
                  transition:
                    "transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease",
                  "&:hover": {
                    bgcolor: "secondary.light",
                    color: "primary.dark",
                    transform: "translateY(-2px)",
                    boxShadow: "0 16px 40px -10px rgba(212,165,116,0.75)",
                  },
                }}
              >
                {overlaySlide.primaryCtaLabel}
              </Button>
              <Button
                component={Link}
                href={overlaySlide.secondaryCtaHref}
                variant="outlined"
                size="medium"
                startIcon={
                  <StorefrontIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                }
                sx={{
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.55)",
                  borderWidth: { xs: 1.5, sm: 2 },
                  alignSelf: "flex-start",
                  width: "auto",
                  minWidth: { xs: 0, sm: 220 },
                  minHeight: { xs: 36, sm: 42, md: 48 },
                  py: { xs: 0.5, sm: 1.125, md: 1.25 },
                  px: { xs: 1.75, sm: 2.5, md: 3 },
                  fontSize: { xs: "0.8125rem", sm: "0.9375rem", md: "1rem" },
                  fontWeight: 600,
                  backdropFilter: "blur(4px)",
                  transition:
                    "transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    borderWidth: { xs: 1.5, sm: 2 },
                    transform: "translateY(-2px) scale(1.02)",
                    borderColor: "#fff",
                    bgcolor: "rgba(255,255,255,0.08)",
                    boxShadow: "0 10px 28px -10px rgba(255,255,255,0.2)",
                  },
                }}
              >
                {overlaySlide.secondaryCtaLabel}
              </Button>
            </Stack>
          </FadeUp>

          <Box sx={{ pt: { xs: 0.5, md: 2 } }}>
            <Stack
              direction="row"
              spacing={{ xs: 0.5, sm: 2, md: 4 }}
              flexWrap="nowrap"
              useFlexGap
              justifyContent={{ xs: "space-between", md: "flex-start" }}
              sx={{ width: "100%" }}
            >
              {hero.metrics.map((m, i) => (
                <MetricCard
                  key={m.label}
                  metric={m}
                  delay={HERO_TIMING.metricsBase + i * HERO_TIMING.metricsStagger}
                  reduced={reduced}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </Container>
          </Box>
        ) : null}
      </AnimatePresence>

      {isFirstSlide ? <ScrollIndicator reduced={reduced} /> : null}
    </Box>
  );
}

function MetricCard({
  metric,
  delay,
  reduced,
}: {
  metric: HeroMetric;
  delay: number;
  reduced: boolean;
}) {
  const Icon = METRIC_ICONS[metric.icon];
  const { value, label, counter } = metric;

  return (
    <Box
      component={motion.div}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: reduced ? 0 : delay,
        duration: reduced ? 0 : 0.65,
        ease: EASE_OUT_QUART,
      }}
      whileHover={reduced ? undefined : { y: -4 }}
      sx={{
        cursor: "default",
        transition: "transform 0.25s ease",
      }}
    >
      <Stack
        direction="row"
        spacing={{ xs: 0.5, sm: 1.25 }}
        alignItems="center"
        sx={{ minWidth: 0, flex: { xs: 1, md: "none" } }}
      >
        <Icon
          sx={{
            color: "secondary.light",
            fontSize: { xs: 22, sm: 26, md: 30 },
            flexShrink: 0,
          }}
        />
        <Stack spacing={0.1} sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: { xs: "0.8125rem", sm: "1rem", md: "1.05rem" },
              lineHeight: 1.1,
            }}
          >
            {counter !== undefined ? (
              <NumberCounter
                target={counter}
                delay={HERO_TIMING.counter}
                duration={1.5}
                suffix="+"
                reduced={reduced}
              />
            ) : (
              value
            )}
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.7)",
              fontSize: { xs: "0.65rem", sm: "0.72rem", md: "0.78rem" },
              letterSpacing: "0.04em",
              lineHeight: 1.2,
            }}
          >
            {label}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

function ScrollIndicator({ reduced }: { reduced: boolean }) {
  return (
    <Box
      component={motion.div}
      initial={reduced ? false : { opacity: 0 }}
      animate={reduced ? { opacity: 0.85 } : { opacity: [0.55, 0.9, 0.55] }}
      transition={
        reduced
          ? { duration: 0 }
          : {
              delay: HERO_TIMING.scroll,
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
      sx={{
        position: "absolute",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 3,
        color: "rgba(255,255,255,0.85)",
        textAlign: "center",
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      <Typography
        variant="caption"
        sx={{ letterSpacing: "0.3em", textTransform: "uppercase" }}
      >
        Scroll to explore
      </Typography>
      <Box
        component={motion.div}
        animate={reduced ? undefined : { y: [0, 6, 0] }}
        transition={
          reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <KeyboardArrowDownIcon fontSize="small" />
      </Box>
    </Box>
  );
}
