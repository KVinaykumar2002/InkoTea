import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { BRAND } from "@/lib/brand";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How INKOTEA collects, uses and safeguards your information when you use our website, contact us, or apply for a franchise.",
  path: "/privacy",
});

const SECTIONS: Array<{ heading: string; body: string }> = [
  {
    heading: "1. What we collect",
    body: "We collect the information you submit to us through enquiry, franchise and contact forms — name, email, phone number, city of interest, investment range, and any message you choose to share. We may also collect basic, anonymous usage data such as device type and pages visited to improve the experience.",
  },
  {
    heading: "2. How we use it",
    body: "Your details are used solely to respond to your enquiry, share franchise information and follow up on your application. We do not sell or rent your data, and we do not use it for unrelated marketing without your consent.",
  },
  {
    heading: "3. Who can see it",
    body: "Only INKOTEA's franchise and customer-care teams have access to your enquiry. Trusted service providers (e.g. our email/CRM provider) may process the data on our behalf under standard confidentiality terms.",
  },
  {
    heading: "4. Retention",
    body: "We keep enquiry data for as long as necessary to evaluate your interest and meet legal/audit obligations. You can request deletion at any time by writing to us.",
  },
  {
    heading: "5. Your rights",
    body: "You can ask to access, correct or delete the personal data we hold about you. You can also opt out of any non-essential follow-ups. Please reach us at the address below and we will respond within a reasonable time.",
  },
  {
    heading: "6. Updates",
    body: "We may revise this policy from time to time. The latest version will always live at this URL with a 'last updated' note.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Plain-language summary of how INKOTEA handles your information. The detailed policy lives below."
      />

      <Section py={{ xs: 6, md: 10 }}>
        <Container maxWidth="md" disableGutters>
          <Stack spacing={5}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Last updated: 12 May 2026
            </Typography>

            {SECTIONS.map((section) => (
              <Stack key={section.heading} spacing={1.5}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {section.heading}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", lineHeight: 1.7 }}
                >
                  {section.body}
                </Typography>
              </Stack>
            ))}

            <Box
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                bgcolor: "background.paper",
                border: 1,
                borderColor: "divider",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Questions?
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", lineHeight: 1.7 }}
              >
                Email us at{" "}
                <Box
                  component="a"
                  href={`mailto:${BRAND.emails.hello}`}
                  sx={{ color: "primary.main", fontWeight: 600 }}
                >
                  {BRAND.emails.hello}
                </Box>{" "}
                or visit the{" "}
                <Box
                  component={Link}
                  href="/contact"
                  sx={{ color: "primary.main", fontWeight: 600 }}
                >
                  contact page
                </Box>
                .
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
