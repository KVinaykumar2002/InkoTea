"use client";

import { useCallback, useEffect, useState } from "react";
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
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

import { HeroBackdrop } from "./HeroBackdrop";
import { HeroAtmosphere } from "./HeroAtmosphere";
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
 *   - Primary CTA gets a slow golden glow pulse after entry; outline CTA
 *     keeps the static frosted-glass look.
 *   - Scroll indicator has a bouncing arrow + opacity pulse.
 *
 * Every motion respects `prefers-reduced-motion`: parallax tracking, loops,
 * and entry animations all collapse to their final state.
 */
export function HeroSection() {
  const reduced = Boolean(useReducedMotion());
  const [slideIndex, setSlideIndex] = useState(0);
  const onSelectSlide = useCallback((index: number) => {
    setSlideIndex(index);
  }, []);

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
        minHeight: { xs: "100vh", md: "92vh" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        color: "#fff",
        mt: { xs: -8, md: -10 },
        pt: { xs: 8, md: 10 },
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
      />
      <HeroAtmosphere parallaxX={parallaxX} parallaxY={parallaxY} reduced={reduced} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 3, py: 8 }}>
        <Stack spacing={3.5} sx={{ maxWidth: { xs: "100%", md: 600 } }}>
          <FadeUp delay={HERO_TIMING.chip} y={14} reduced={reduced}>
            <Box
              component={motion.div}
              animate={
                reduced
                  ? undefined
                  : {
                      boxShadow: [
                        "0 0 0 1px rgba(212,165,116,0.3), 0 0 0 0 rgba(212,165,116,0)",
                        "0 0 0 1px rgba(212,165,116,0.55), 0 0 22px 4px rgba(212,165,116,0.22)",
                        "0 0 0 1px rgba(212,165,116,0.3), 0 0 0 0 rgba(212,165,116,0)",
                      ],
                    }
              }
              transition={
                reduced
                  ? undefined
                  : { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.0 }
              }
              sx={{
                alignSelf: "flex-start",
                borderRadius: 999,
                display: "inline-block",
              }}
            >
              <Chip
                label="The Feeling of One More"
                sx={{
                  bgcolor: "rgba(212, 165, 116, 0.18)",
                  color: "secondary.light",
                  border: "1px solid rgba(212, 165, 116, 0.45)",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontSize: "var(--font-size-xs)",
                  px: 1,
                  backdropFilter: "blur(8px)",
                }}
              />
            </Box>
          </FadeUp>

          <Typography
            variant="h1"
            sx={{
              m: 0,
              color: "#fff",
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: 600,
              textShadow: "0 4px 24px rgba(0,0,0,0.45)",
            }}
          >
            <LineReveal delay={HERO_TIMING.line1} reduced={reduced}>
              India&rsquo;s Chai Culture.
            </LineReveal>
            <BlurReveal delay={HERO_TIMING.line2} duration={1.1} blur={10} reduced={reduced}>
              <ShimmerSpan delay={HERO_TIMING.shimmer} reduced={reduced}>
                Reimagined for Today.
              </ShimmerSpan>
            </BlurReveal>
          </Typography>

          <FadeUp delay={HERO_TIMING.subhead} y={0} reduced={reduced}>
            <Typography
              variant="h5"
              sx={{
                m: 0,
                color: "rgba(255,255,255,0.88)",
                fontWeight: 400,
                maxWidth: 540,
                lineHeight: 1.55,
                textShadow: "0 2px 12px rgba(0,0,0,0.4)",
              }}
            >
              From a ₹2.5L kiosk to a full Social Café — INKOTEA blends India&rsquo;s
              traditional chai culture with a modern café experience. 40+ outlets
              and growing across Telangana &amp; AP.
            </Typography>
          </FadeUp>

          <FadeUp delay={HERO_TIMING.ctas} y={22} reduced={reduced} sx={{ mt: 1 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Box
                component={motion.div}
                animate={
                  reduced
                    ? undefined
                    : {
                        boxShadow: [
                          "0 14px 32px -10px rgba(212,165,116,0.5), 0 0 0 0 rgba(212,165,116,0)",
                          "0 18px 38px -10px rgba(212,165,116,0.65), 0 0 28px 6px rgba(212,165,116,0.28)",
                          "0 14px 32px -10px rgba(212,165,116,0.5), 0 0 0 0 rgba(212,165,116,0)",
                        ],
                      }
                }
                transition={
                  reduced
                    ? undefined
                    : { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 2.4 }
                }
                sx={{ borderRadius: 999, display: "inline-block" }}
              >
                <Button
                  component={Link}
                  href="/franchise"
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    minWidth: 220,
                    fontWeight: 700,
                    boxShadow: "none",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px) scale(1.02)",
                      boxShadow: "none",
                    },
                  }}
                >
                  Explore Franchise
                </Button>
              </Box>
              <Button
                component={Link}
                href="/outlets"
                variant="outlined"
                size="large"
                startIcon={<StorefrontIcon />}
                sx={{
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.55)",
                  borderWidth: 2,
                  minWidth: 220,
                  fontWeight: 600,
                  backdropFilter: "blur(4px)",
                  transition:
                    "transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    borderWidth: 2,
                    transform: "translateY(-2px) scale(1.02)",
                    borderColor: "#fff",
                    bgcolor: "rgba(255,255,255,0.08)",
                    boxShadow: "0 10px 28px -10px rgba(255,255,255,0.2)",
                  },
                }}
              >
                Find Nearest Outlet
              </Button>
            </Stack>
          </FadeUp>

          <Box sx={{ pt: 2 }}>
            <Stack direction="row" spacing={{ xs: 2.5, sm: 4 }} flexWrap="wrap" useFlexGap>
              {METRICS.map((m, i) => (
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

      <ScrollIndicator reduced={reduced} />
    </Box>
  );
}

interface Metric {
  icon: typeof StorefrontIcon;
  value: string;
  label: string;
  /** When set, the value renders as a 0 → counter ticker on mount. */
  counter?: number;
}

const METRICS: readonly Metric[] = [
  { icon: EmojiFoodBeverageIcon, value: "40+", label: "Outlets", counter: 40 },
  { icon: PaymentsIcon, value: "Low", label: "Investment" },
  { icon: TrendingUpIcon, value: "High", label: "Daily Sales" },
];

function MetricCard({
  metric: { icon: Icon, value, label, counter },
  delay,
  reduced,
}: {
  metric: Metric;
  delay: number;
  reduced: boolean;
}) {
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
      <Stack direction="row" spacing={1.25} alignItems="center">
        <Icon sx={{ color: "secondary.light", fontSize: 30 }} />
        <Stack spacing={0.2}>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: "var(--font-size-base)",
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
              fontSize: "var(--font-size-xs)",
              letterSpacing: "0.04em",
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
