import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { buildPageMetadata } from "@/lib/seo";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ContactChannels } from "@/features/contact/ContactChannels";
import { ContactFormBlock } from "@/features/contact/ContactFormBlock";
import { ContactPageHero } from "@/features/contact/ContactPageHero";
import { OfficeMap } from "@/features/contact/OfficeMap";
import { OfficeAddressCard } from "@/features/contact/OfficeAddressCard";
import { compactSectionHeadingSx } from "@/components/common/pillarCardStyles";

export const metadata = buildPageMetadata({
  title: "Contact INKOTEA",
  description:
    "Talk to our franchise or general team. WhatsApp, call, email or fill the contact form — we reply within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ContactPageHero />

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
