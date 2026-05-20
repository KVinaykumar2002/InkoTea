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
import { OfficeAddressCard } from "@/features/contact/OfficeAddressCard";
import { compactSectionHeadingSx } from "@/components/common/pillarCardStyles";
import { BRAND_IMAGES } from "@/lib/brandImages";

export const metadata = buildPageMetadata({
  title: "Contact INKOTEA",
  description:
    "Talk to our franchise or general team. WhatsApp, call, email or fill the contact form — we reply within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Box
        component="section"
        sx={{
          position: "relative",
          bgcolor: "#1A0E08",
          // Backdrop is the dark kiosk photo in both themes, so pin the
          // foreground text to a fixed light color. Using
          // `primary.contrastText` here was inheriting the charcoal value
          // from the dark palette and making the h1 invisible.
          color: "#fff",
          pt: { xs: 12, md: 18 },
          pb: { xs: 8, md: 12 },
          mt: { xs: -8, md: -10 },
          overflow: "hidden",
        }}
      >
        {/* Full-bleed kiosk scene — same shot used in the footer for a
            cohesive open/close to the page. Sits behind a left-darkening
            gradient so the heading stays legible while the menu board and
            crowd glow through on the right. */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${BRAND_IMAGES.footerKioskScene})`,
            backgroundSize: "cover",
            // Mobile crops narrow; nudge right so the lit "InkoTea" menu
            // board stays in frame next to the heading on small screens.
            backgroundPosition: { xs: "65% center", md: "center" },
            backgroundRepeat: "no-repeat",
            zIndex: 0,
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(15,10,6,0.92) 0%, rgba(15,10,6,0.72) 40%, rgba(15,10,6,0.35) 70%, rgba(15,10,6,0.1) 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(15,10,6,0.25) 0%, rgba(15,10,6,0) 35%, rgba(15,10,6,0) 70%, rgba(15,10,6,0.6) 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
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
                color: "rgba(255,255,255,0.88)",
                fontWeight: 400,
                lineHeight: 1.55,
              }}
            >
              Whether you want to open a franchise or just say hi — we read
              every message.
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Section
        bgcolor="background.default"
        pt={{ xs: 6, md: 8 }}
        pb={{ xs: 2, md: 3 }}
      >
        <ContactChannels />
      </Section>

      <Section bgcolor="background.paper" pt={{ xs: 4, md: 5 }} pb={{ xs: 8, md: 12 }}>
        <SectionHeading
          eyebrow="Send us a message"
          title="Drop a note — we'll get back within 24 hours"
          sx={compactSectionHeadingSx}
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
            <OfficeAddressCard />
          </Stack>
        </Box>
      </Section>
    </>
  );
}
