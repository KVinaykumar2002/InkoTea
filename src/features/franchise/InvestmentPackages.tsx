"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { INVESTMENT_PACKAGES } from "@/data/franchiseModels";

export function InvestmentPackages() {
  return (
    <Section bgcolor="background.paper" id="packages">
      <SectionHeading
        eyebrow="Social Café Packages"
        title="Two ways to set up your social café"
        description="Pick the package that matches your shop condition and ambition. Both unlock the full INKOTEA brand & operations playbook."
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        {INVESTMENT_PACKAGES.map((pkg, idx) => (
          <ScrollReveal key={pkg.key} delay={idx * 0.1}>
            <Card
              sx={{
                height: "100%",
                borderColor: pkg.highlight ? "success.main" : undefined,
                borderWidth: pkg.highlight ? 2 : 1,
                position: "relative",
              }}
            >
              {pkg.highlight ? (
                <Chip
                  label="Most Popular"
                  color="success"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: -12,
                    right: 24,
                    fontWeight: 700,
                  }}
                />
              ) : null}

              <CardContent sx={{ p: 4 }}>
                <Stack spacing={3}>
                  <Stack spacing={1}>
                    <Typography
                      variant="overline"
                      sx={{
                        color: "secondary.dark",
                        letterSpacing: "0.18em",
                      }}
                    >
                      {pkg.subtitle}
                    </Typography>
                    <Typography variant="h4">{pkg.name}</Typography>
                  </Stack>

                  <Box>
                    <Typography
                      variant="h2"
                      sx={{
                        color: pkg.highlight ? "success.dark" : "primary.main",
                        fontWeight: 700,
                      }}
                    >
                      {pkg.total}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total package investment
                    </Typography>
                  </Box>

                  <Divider />

                  <Stack spacing={1.5}>
                    <Typography variant="overline" color="text.secondary">
                      Includes
                    </Typography>
                    {pkg.breakdown.map((line) => (
                      <Stack
                        key={line.label}
                        direction="row"
                        justifyContent="space-between"
                        spacing={2}
                      >
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <CheckCircleIcon
                            sx={{
                              color: pkg.highlight ? "success.main" : "primary.main",
                              fontSize: 18,
                            }}
                          />
                          <Typography variant="body2">{line.label}</Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {line.value}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>

                  <Divider />

                  <Stack spacing={1.5}>
                    <Typography variant="overline" color="text.secondary">
                      Not Included
                    </Typography>
                    {pkg.notIncluded.map((item) => (
                      <Stack
                        key={item}
                        direction="row"
                        spacing={1.5}
                        alignItems="flex-start"
                      >
                        <ErrorOutlineIcon
                          sx={{
                            color: "text.disabled",
                            fontSize: 18,
                            mt: "2px",
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {item}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>

                  <Box
                    sx={{
                      mt: 1,
                      p: 2.5,
                      borderRadius: 2,
                      bgcolor: pkg.highlight
                        ? "rgba(63,107,74,0.08)"
                        : "rgba(212,165,116,0.12)",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        fontWeight: 700,
                      }}
                    >
                      Best for
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mt: 0.5, color: "text.primary" }}
                    >
                      {pkg.bestFor}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </ScrollReveal>
        ))}
      </Box>
      <Typography
        variant="caption"
        align="center"
        display="block"
        color="text.secondary"
        sx={{ mt: 4, fontStyle: "italic" }}
      >
        Total Investment Range: ₹6.5L – ₹9L. Excludes shop rent, furniture, and
        site-specific civil works which vary by location.
      </Typography>
    </Section>
  );
}
