"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { motion } from "framer-motion";

export function WhyHero() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "background.paper",
        pt: { xs: 12, md: 18 },
        pb: { xs: 8, md: 12 },
        mt: { xs: -8, md: -10 },
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={4}
          maxWidth={820}
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Chip
            label="Why INKOTEA"
            color="primary"
            sx={{
              alignSelf: "flex-start",
              fontWeight: 700,
              letterSpacing: "0.12em",
              fontSize: "0.7rem",
              textTransform: "uppercase",
            }}
          />
          <Typography variant="h1">
            India's chai market has a gap.
            <Box
              component="span"
              sx={{
                display: "block",
                color: "primary.main",
                fontStyle: "italic",
              }}
            >
              We're the middle revolution.
            </Box>
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ fontWeight: 400, lineHeight: 1.55, maxWidth: 720 }}
          >
            Street stalls are too unstructured. Premium cafés are too
            expensive. INKOTEA is the first scalable brand built for the
            massive middle that nobody else is serving.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
