"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsIcon from "@mui/icons-material/Directions";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { SafeImage } from "@/components/common/SafeImage";
import { OUTLETS, OUTLET_CITIES } from "@/data/outlets";
import type { Outlet } from "@/types";

const PREVIEW_COUNT = 3;

/**
 * Home-page "Find Nearest Outlet" preview. Lets the visitor narrow by
 * city to peek at outlets without leaving the homepage. The full list
 * lives on `/outlets`; this section is a tight 3-card teaser plus a
 * city-chip selector and a deeplink to the explorer for the long tail.
 */
export function NearestOutletSection() {
  const [activeCity, setActiveCity] = useState<(typeof OUTLET_CITIES)[number] | "All">(
    "All",
  );

  const filtered = useMemo<Outlet[]>(() => {
    const pool =
      activeCity === "All"
        ? OUTLETS
        : OUTLETS.filter((o) => o.city === activeCity);
    return pool.slice(0, PREVIEW_COUNT);
  }, [activeCity]);

  return (
    <Section bgcolor="background.paper" id="find-outlet">
      <SectionHeading
        eyebrow="Find Your Nearest Outlet"
        title="40+ outlets across South India — one is closer than you think"
        description="Pick a city to see live outlets nearby, or browse the full network for directions, hours and contact details."
      />

      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        useFlexGap
        justifyContent="center"
        sx={{ mb: { xs: 4, md: 5 } }}
      >
        {(["All", ...OUTLET_CITIES] as const).map((city) => {
          const isActive = activeCity === city;
          return (
            <Chip
              key={city}
              label={city}
              clickable
              onClick={() => setActiveCity(city)}
              sx={{
                bgcolor: isActive ? "primary.main" : "transparent",
                color: isActive ? "primary.contrastText" : "text.secondary",
                fontWeight: 600,
                px: 1.25,
                py: 2.25,
                border: (t) =>
                  `1px solid ${
                    isActive ? "transparent" : t.palette.divider
                  }`,
                "&:hover": {
                  bgcolor: isActive ? "primary.dark" : "background.default",
                },
              }}
            />
          );
        })}
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {filtered.map((outlet, idx) => (
          <ScrollReveal key={outlet.id} delay={idx * 0.08}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                overflow: "hidden",
                border: (t) => `1px solid ${t.palette.divider}`,
                bgcolor: "background.default",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 18px 50px -20px rgba(0,0,0,0.18)",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  bgcolor: "background.default",
                }}
              >
                <SafeImage
                  src={outlet.image}
                  alt={outlet.name}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <Chip
                  label={outlet.type === "kiosk" ? "Kiosk" : "Social Café"}
                  size="small"
                  color={outlet.type === "kiosk" ? "primary" : "success"}
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    fontWeight: 700,
                  }}
                />
              </Box>
              <Stack spacing={1.25} sx={{ p: 3, flexGrow: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "secondary.dark",
                    letterSpacing: "0.18em",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {outlet.city}
                </Typography>
                <Typography variant="h6">{outlet.name}</Typography>
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <LocationOnIcon
                    fontSize="small"
                    sx={{ color: "text.secondary", mt: "2px" }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flexGrow: 1 }}
                  >
                    {outlet.address}
                  </Typography>
                </Stack>
                <Box sx={{ pt: 2, mt: "auto" }}>
                  <Button
                    component="a"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      outlet.mapsQuery,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<DirectionsIcon />}
                    fullWidth
                  >
                    Get directions
                  </Button>
                </Box>
              </Stack>
            </Box>
          </ScrollReveal>
        ))}
      </Box>

      <Stack alignItems="center" sx={{ mt: { xs: 5, md: 6 } }}>
        <Button
          component={Link}
          href="/outlets"
          variant="contained"
          color="primary"
          size="large"
          endIcon={<ArrowForwardIcon />}
          sx={{ fontWeight: 700, minWidth: 240 }}
        >
          See all outlets
        </Button>
      </Stack>
    </Section>
  );
}
