"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { JOURNEY_MILESTONES } from "@/data/competitors";

export function JourneyTimeline() {
  return (
    <Section bgcolor="background.default">
      <SectionHeading
        eyebrow="Our Journey"
        title="From a single kiosk to a multi-city retail brand"
      />
      <Box sx={{ position: "relative", maxWidth: 920, mx: "auto" }}>
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            left: { xs: 18, md: "50%" },
            top: 0,
            bottom: 0,
            width: 2,
            bgcolor: "secondary.light",
            opacity: 0.55,
            transform: { md: "translateX(-1px)" },
          }}
        />

        {JOURNEY_MILESTONES.map((m, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <ScrollReveal key={m.year} delay={idx * 0.1}>
              <Box
                sx={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: { xs: "44px 1fr", md: "1fr 60px 1fr" },
                  alignItems: "flex-start",
                  mb: 5,
                }}
              >
                {/* Mobile + desktop center dot column */}
                <Box
                  sx={{
                    gridColumn: { xs: 1, md: 2 },
                    display: "flex",
                    justifyContent: "center",
                    pt: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      border: (t) => `4px solid ${t.palette.background.default}`,
                      boxShadow: "0 0 0 2px rgba(92,58,33,0.28)",
                    }}
                  />
                </Box>

                {/* Desktop left card */}
                <Box
                  sx={{
                    display: { xs: "none", md: "block" },
                    gridColumn: 1,
                    pr: 4,
                    textAlign: "right",
                    visibility: isLeft ? "visible" : "hidden",
                  }}
                >
                  <MilestoneCard m={m} align="right" />
                </Box>

                {/* Desktop right card */}
                <Box
                  sx={{
                    display: { xs: "none", md: "block" },
                    gridColumn: 3,
                    pl: 4,
                    visibility: isLeft ? "hidden" : "visible",
                  }}
                >
                  <MilestoneCard m={m} align="left" />
                </Box>

                {/* Mobile card */}
                <Box
                  sx={{
                    gridColumn: 2,
                    display: { xs: "block", md: "none" },
                    pl: 2,
                  }}
                >
                  <MilestoneCard m={m} align="left" />
                </Box>
              </Box>
            </ScrollReveal>
          );
        })}
      </Box>
    </Section>
  );
}

function MilestoneCard({
  m,
  align,
}: {
  m: { year: string; title: string; text: string };
  align: "left" | "right";
}) {
  return (
    <Stack
      spacing={1}
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: "background.paper",
        border: (t) => `1px solid ${t.palette.divider}`,
        textAlign: align,
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
  );
}
