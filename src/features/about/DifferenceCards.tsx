"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import {
  compactCardContentSx,
  compactSectionHeadingSx,
  compactSectionPy,
  pillarCardSpacing,
} from "@/components/common/pillarCardStyles";

const COLUMNS = [
  {
    label: "Traditional Tea",
    rows: ["Inconsistent quality", "No brand recall", "Unstructured operations"],
    isUs: false,
  },
  {
    label: "Café Chains",
    rows: ["Expensive pricing", "Premium niche only", "Slow to scale regionally"],
    isUs: false,
  },
  {
    label: "INKOTEA",
    rows: [
      "Affordable Premium",
      "Mass + Lifestyle positioning",
      "Scalable, system-driven",
    ],
    isUs: true,
  },
];

export function DifferenceCards() {
  return (
    <Section bgcolor="background.paper" py={compactSectionPy}>
      <SectionHeading
        eyebrow="What makes us different"
        title="The middle ground tea retail was missing"
        sx={compactSectionHeadingSx}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
        }}
      >
        {COLUMNS.map((col, idx) => (
          <ScrollReveal key={col.label} delay={idx * 0.1}>
            <Card
              sx={{
                height: "100%",
                bgcolor: col.isUs ? "primary.main" : "background.default",
                color: col.isUs ? "primary.contrastText" : "text.primary",
                transform: col.isUs
                  ? { xs: "none", md: "translateY(-12px)" }
                  : "none",
                boxShadow: col.isUs
                  ? "0 24px 60px -20px rgba(92, 58, 33, 0.45)"
                  : "none",
              }}
            >
              <CardContent sx={compactCardContentSx}>
                <Stack spacing={pillarCardSpacing}>
                  <Chip
                    label={col.isUs ? "INKOTEA Way" : col.label}
                    size="small"
                    sx={{
                      alignSelf: "flex-start",
                      bgcolor: col.isUs
                        ? "secondary.main"
                        : "background.paper",
                      color: col.isUs
                        ? "secondary.contrastText"
                        : "text.primary",
                      fontWeight: 700,
                      border: col.isUs
                        ? "none"
                        : (t) => `1px solid ${t.palette.divider}`,
                    }}
                  />
                  <Typography
                    variant="h4"
                    sx={{
                      color: col.isUs ? "secondary.light" : "text.primary",
                      fontStyle: col.isUs ? "italic" : "normal",
                    }}
                  >
                    {col.label}
                  </Typography>
                  <Stack spacing={1.25}>
                    {col.rows.map((r) => (
                      <Typography
                        key={r}
                        variant="body2"
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1.25,
                          lineHeight: 1.6,
                          color: col.isUs
                            ? "rgba(255,255,255,0.92)"
                            : "text.secondary",
                          "&::before": {
                            content: '""',
                            flexShrink: 0,
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            bgcolor: col.isUs
                              ? "secondary.light"
                              : "text.disabled",
                            mt: "calc((1lh - 6px) / 2)",
                          },
                        }}
                      >
                        {r}
                      </Typography>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </ScrollReveal>
        ))}
      </Box>
    </Section>
  );
}
