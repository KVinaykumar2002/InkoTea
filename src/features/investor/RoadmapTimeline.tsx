"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { ROADMAP } from "@/data/competitors";

export function RoadmapTimeline() {
  return (
    <Section bgcolor="background.paper" pt={{ xs: 4, md: 5 }} pb={{ xs: 4, md: 5 }}>
      <SectionHeading
        eyebrow="Expansion Roadmap"
        title="Where we've been. Where we're going."
      />
      <Box sx={{ position: "relative" }}>
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            left: { xs: 18, lg: 0 },
            right: { xs: "auto", lg: 0 },
            top: { xs: 0, lg: 28 },
            bottom: { xs: 0, lg: "auto" },
            height: { xs: "100%", lg: 2 },
            width: { xs: 2, lg: "100%" },
            bgcolor: "secondary.light",
            opacity: 0.55,
            transform: { lg: "translateY(-1px)" },
          }}
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "44px 1fr",
              lg: `repeat(${ROADMAP.length}, 1fr)`,
            },
            gap: { xs: 4, lg: 4 },
            rowGap: { xs: 5, lg: 0 },
          }}
        >
          {ROADMAP.map((m, idx) => (
            <ScrollReveal key={m.year} delay={idx * 0.08}>
              <RoadmapNode m={m} />
            </ScrollReveal>
          ))}
        </Box>
      </Box>
    </Section>
  );
}

function RoadmapNode({
  m,
}: {
  m: { year: string; title: string; text: string };
}) {
  return (
    <Box
      sx={{
        display: { xs: "contents", lg: "block" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", lg: "flex-start" },
          alignItems: { lg: "center" },
          gridColumn: { xs: 1, lg: "auto" },
          mb: { lg: 3 },
        }}
      >
        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            bgcolor: "primary.main",
            border: (t) => `4px solid ${t.palette.background.paper}`,
            boxShadow: "0 0 0 2px rgba(92,58,33,0.28)",
            mt: { lg: "20px" },
          }}
        />
      </Box>
      <Stack
        spacing={1}
        sx={{
          gridColumn: { xs: 2, lg: "auto" },
          pl: { xs: 0, lg: 0 },
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: "secondary.dark",
            fontWeight: 700,
            letterSpacing: "0.2em",
          }}
        >
          {m.year}
        </Typography>
        <Typography variant="h5">{m.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {m.text}
        </Typography>
      </Stack>
    </Box>
  );
}
