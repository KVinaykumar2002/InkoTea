"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  compactCardContentSx,
  compactSectionHeadingSx,
  pillarCardSpacing,
} from "@/components/common/pillarCardStyles";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { MARKET_GAP } from "@/data/competitors";

const cardSx = {
  height: "100%",
  bgcolor: "background.paper",
  border: 1,
  borderColor: "divider",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
  "&:hover": {
    borderColor: "primary.main",
    boxShadow: "0 16px 40px -24px rgba(92, 58, 33, 0.28)",
  },
};

export function MarketGapSection() {
  return (
    <Section bgcolor="background.default" pt={{ xs: 4, md: 5 }} pb={{ xs: 8, md: 12 }}>
      <SectionHeading
        eyebrow="The Market Gap"
        title="Two extremes. One missing middle."
        description="India's chai consumers had to choose between unstructured stalls and unaffordable cafés. We built INKOTEA so they don't have to."
        sx={compactSectionHeadingSx}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
          alignItems: "stretch",
        }}
      >
        {MARKET_GAP.map((item, idx) => {
          const isUs = item.accent === "highlight";
          return (
            <ScrollReveal key={item.title} delay={idx * 0.1}>
              <Card
                sx={{
                  ...cardSx,
                  ...(isUs
                    ? { borderColor: "primary.main", borderWidth: 2 }
                    : {}),
                }}
              >
                <CardContent sx={compactCardContentSx}>
                  <Stack spacing={pillarCardSpacing}>
                    <Chip
                      label={isUs ? "INKOTEA" : "Existing option"}
                      size="small"
                      color={isUs ? "primary" : "default"}
                      variant={isUs ? "filled" : "outlined"}
                      sx={{ alignSelf: "flex-start", fontWeight: 700 }}
                    />
                    <Typography
                      variant="h3"
                      sx={{
                        color: "primary.main",
                        fontSize: "var(--font-size-3xl)",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </ScrollReveal>
          );
        })}
      </Box>
    </Section>
  );
}
