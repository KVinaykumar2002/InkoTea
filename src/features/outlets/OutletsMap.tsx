"use client";

import { fontDisplayItalicSx } from "@/theme/fonts";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";

export function OutletsMap() {
  return (
    <Section bgcolor="background.paper">
      <SectionHeading
        eyebrow="Coverage Map"
        title="Live across Telangana & Andhra Pradesh"
        description="A bird's-eye view of where INKOTEA outlets currently operate."
      />
      <Box
        sx={{
          width: "100%",
          height: { xs: 360, md: 480 },
          borderRadius: 3,
          overflow: "hidden",
          border: (t) => `1px solid ${t.palette.divider}`,
          boxShadow: "0 14px 40px -16px rgba(0,0,0,0.18)",
        }}
      >
        <Box
          component="iframe"
          title="INKOTEA outlet coverage"
          src="https://www.google.com/maps?q=Telangana+India&z=7&output=embed"
          sx={{ border: 0, width: "100%", height: "100%" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mt: 3 }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: "italic" }}
        >
          Map shows the regions where INKOTEA actively operates. Outlets-level
          markers coming soon.
        </Typography>
      </Stack>
    </Section>
  );
}
