"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { SafeImage } from "@/components/common/SafeImage";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsIcon from "@mui/icons-material/Directions";
import { ContentState } from "@/components/common/ContentState";
import { Section } from "@/components/common/Section";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { useOutlets } from "@/hooks/useApiContent";
import type { Outlet } from "@/types";

export function OutletsExplorer() {
  const { data, loading, error } = useOutlets();
  const filters = useMemo(
    () => ["All", ...(data?.cities ?? [])] as const,
    [data?.cities],
  );
  const [activeCity, setActiveCity] = useState<string>("All");

  const filtered = useMemo<Outlet[]>(() => {
    if (!data?.outlets) return [];
    if (activeCity === "All") return data.outlets;
    return data.outlets.filter((o) => o.city === activeCity);
  }, [activeCity, data?.outlets]);

  return (
    <Section bgcolor="background.default" pt={{ xs: 4, md: 5 }} pb={0}>
      <ContentState loading={loading} error={error} empty={!data?.outlets?.length}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Typography variant="h3">Explore by city</Typography>
          <Typography variant="body2" color="text.secondary">
            Showing <strong>{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "outlet" : "outlets"}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
          sx={{ mb: 5 }}
        >
          {filters.map((city) => {
            const isActive = activeCity === city;
            return (
              <Chip
                key={city}
                label={city}
                clickable
                onClick={() => setActiveCity(city)}
                sx={{
                  bgcolor: isActive ? "primary.main" : "transparent",
                  color: isActive ? "primary.contrastText" : "text.primary",
                  fontWeight: 600,
                  px: 1.5,
                  py: 2.5,
                  border: (t) =>
                    `1px solid ${
                      isActive ? "transparent" : t.palette.divider
                    }`,
                  "&:hover": {
                    bgcolor: isActive ? "primary.dark" : "background.paper",
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
              lg: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {filtered.map((outlet, idx) => (
            <ScrollReveal key={outlet.id} delay={Math.min(idx * 0.04, 0.4)}>
              <Card
                sx={{
                  height: "100%",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
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
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <Chip
                    label={outlet.type === "kiosk" ? "Kiosk" : "Social Cafe"}
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
              </Card>
            </ScrollReveal>
          ))}
        </Box>
      </ContentState>
    </Section>
  );
}
