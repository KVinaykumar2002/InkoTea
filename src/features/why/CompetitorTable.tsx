"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { COMPETITORS } from "@/data/competitors";

const ROWS: { key: keyof (typeof COMPETITORS)[number]; label: string }[] = [
  { key: "position", label: "Position" },
  { key: "pricing", label: "Pricing" },
  { key: "experience", label: "Experience" },
  { key: "scalability", label: "Scalability" },
];

export function CompetitorTable() {
  return (
    <Section bgcolor="background.default">
      <SectionHeading
        eyebrow="Where We Stand"
        title="How INKOTEA compares to the category"
        description="A quick scan of how the leading tea & café brands position themselves — and where INKOTEA fits."
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
          alignItems: "stretch",
        }}
      >
        {COMPETITORS.map((c, idx) => (
          <ScrollReveal key={c.name} delay={idx * 0.08}>
            <Stack
              spacing={2}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 3,
                bgcolor: c.isUs ? "primary.main" : "background.paper",
                color: c.isUs ? "primary.contrastText" : "text.primary",
                border: c.isUs
                  ? "none"
                  : (t) => `1px solid ${t.palette.divider}`,
                transform: c.isUs
                  ? { xs: "none", lg: "translateY(-12px)" }
                  : "none",
                boxShadow: c.isUs
                  ? "0 24px 60px -20px rgba(92, 58, 33, 0.45)"
                  : "none",
              }}
            >
              {c.isUs ? (
                <Chip
                  label="That's us"
                  size="small"
                  sx={{
                    alignSelf: "flex-start",
                    bgcolor: "secondary.main",
                    color: "secondary.contrastText",
                    fontWeight: 700,
                  }}
                />
              ) : null}
              <Typography
                variant="h4"
                sx={{
                  color: c.isUs ? "secondary.light" : "text.primary",
                  fontStyle: c.isUs ? "italic" : "normal",
                }}
              >
                {c.name}
              </Typography>
              <Box
                sx={{
                  width: 40,
                  height: 3,
                  bgcolor: c.isUs ? "secondary.light" : "primary.main",
                  borderRadius: 2,
                  opacity: 0.6,
                }}
              />
              <Stack spacing={1.5} sx={{ pt: 1 }}>
                {ROWS.map((row) => (
                  <Stack key={row.key} spacing={0.25}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: c.isUs
                          ? "rgba(255,255,255,0.65)"
                          : "text.secondary",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        fontWeight: 700,
                      }}
                    >
                      {row.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: c.isUs ? "rgba(255,255,255,0.95)" : "text.primary",
                        fontWeight: 500,
                      }}
                    >
                      {c[row.key]}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </ScrollReveal>
        ))}
      </Box>
    </Section>
  );
}
