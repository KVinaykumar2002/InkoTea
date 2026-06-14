import Box from "@mui/material/Box";
import { buildPageMetadata } from "@/lib/seo";
import { Section } from "@/components/common/Section";
import { ContactBottomCta } from "@/features/contact/ContactBottomCta";
import { ContactChannels } from "@/features/contact/ContactChannels";
import { ContactFAQPreview } from "@/features/contact/ContactFAQPreview";
import { ContactFormBlock } from "@/features/contact/ContactFormBlock";
import { ContactInfoPanel } from "@/features/contact/ContactInfoPanel";
import { ContactLocationSection } from "@/features/contact/ContactLocationSection";
import { ContactPageHero } from "@/features/contact/ContactPageHero";
import { contactPageBg } from "@/features/contact/contactStyles";

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

      <Section bgcolor={contactPageBg} pt={{ xs: 6, md: 8 }} pb={{ xs: 6, md: 8 }}>
        <ContactChannels />
      </Section>

      <Section bgcolor="background.paper" pt={{ xs: 2, md: 3 }} pb={{ xs: 6, md: 8 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.15fr 0.85fr" },
            gap: { xs: 3, md: 4 },
            alignItems: "start",
          }}
        >
          <ContactFormBlock />
          <ContactInfoPanel />
        </Box>
      </Section>

      <ContactLocationSection />

      <Section bgcolor="background.paper" pt={0} pb={{ xs: 6, md: 8 }}>
        <ContactFAQPreview />
      </Section>

      <ContactBottomCta />
    </>
  );
}
