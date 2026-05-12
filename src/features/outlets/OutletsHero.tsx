"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { motion } from "framer-motion";

export function OutletsHero() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "background.paper",
        pt: { xs: 12, md: 18 },
        pb: { xs: 8, md: 10 },
        mt: { xs: -8, md: -10 },
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={3}
          maxWidth={760}
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Chip
            label="Our Outlets"
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
            40+ outlets and counting.
            <Box
              component="span"
              sx={{
                display: "block",
                color: "primary.main",
                fontStyle: "italic",
              }}
            >
              Find the one nearest you.
            </Box>
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 400, lineHeight: 1.55 }}>
            From Hyderabad's IT corridors to Vizag's beach road — INKOTEA is
            growing across Telangana and Andhra Pradesh.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
