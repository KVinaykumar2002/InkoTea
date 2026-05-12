import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { buildPageMetadata } from "@/lib/seo";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ContactChannels } from "@/features/contact/ContactChannels";
import { ContactFormBlock } from "@/features/contact/ContactFormBlock";
import { OfficeMap } from "@/features/contact/OfficeMap";
import { BRAND } from "@/lib/brand";

export const metadata = buildPageMetadata({
  title: "Contact INKOTEA",
  description:
    "Talk to our franchise, investor or general team. WhatsApp, call, email or fill the contact form — we reply within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Box
        component="section"
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          pt: { xs: 12, md: 18 },
          pb: { xs: 8, md: 12 },
          mt: { xs: -8, md: -10 },
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3} maxWidth={760}>
            <Typography
              variant="overline"
              sx={{ color: "secondary.light", letterSpacing: "0.2em" }}
            >
              Get in touch
            </Typography>
            <Typography variant="h1" sx={{ color: "inherit" }}>
              Let's build your INKOTEA chapter together.
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "rgba(255,255,255,0.85)",
                fontWeight: 400,
                lineHeight: 1.55,
              }}
            >
              Whether you want to open a franchise, invest in the brand, or
              just say hi — we read every message.
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Section bgcolor="background.default">
        <ContactChannels />
      </Section>

      <Section bgcolor="background.paper">
        <SectionHeading
          eyebrow="Send us a message"
          title="Drop a note — we'll get back within 24 hours"
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr" },
            gap: { xs: 4, md: 5 },
          }}
        >
          <ContactFormBlock />
          <Stack spacing={3}>
            <OfficeMap />
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "background.default",
                border: 1,
                borderColor: "divider",
              }}
            >
              <Typography variant="overline" color="text.secondary">
                Headquarters
              </Typography>
              <Typography variant="h6" sx={{ mt: 0.5 }}>
                {BRAND.name} HQ
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {BRAND.hq}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1.5, fontWeight: 600 }}>
                <Box component="a" href={`tel:${BRAND.phoneDigits}`} sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}>
                  {BRAND.phone}
                </Box>
              </Typography>
              <Typography variant="body2">
                <Box component="a" href={`mailto:${BRAND.emails.hello}`} sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}>
                  {BRAND.emails.hello}
                </Box>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Section>
    </>
  );
}
