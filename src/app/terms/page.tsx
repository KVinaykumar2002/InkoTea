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
  title: "Terms of Use",
  description:
    "The terms governing your use of the INKOTEA website and the materials shared through it.",
  path: "/terms",
});

const SECTIONS: Array<{ heading: string; body: string }> = [
  {
    heading: "1. About these terms",
    body: "By accessing inkotea.com you agree to these terms. If you do not agree, please do not use the site. We may update these terms from time to time; the latest version will always live at this URL.",
  },
  {
    heading: "2. Use of the site",
    body: "The website is provided for informational purposes — to share our brand story, franchise opportunities and outlet information. You agree not to misuse the site, attempt to disrupt it, or scrape content without permission.",
  },
  {
    heading: "3. Franchise enquiries",
    body: "Submitting an enquiry does not create a franchise agreement or any binding commitment by INKOTEA or you. A franchise relationship is established only via a separate signed agreement after due diligence.",
  },
  {
    heading: "4. Intellectual property",
    body: "The INKOTEA name, logo, copy, photography and other site assets are owned by INKOTEA and protected by applicable IP law. You may not reuse them without our written consent.",
  },
  {
    heading: "5. Third-party links",
    body: "We may link to third-party sites (e.g. social platforms or partner brands). We are not responsible for the content, accuracy or practices of those sites.",
  },
  {
    heading: "6. Disclaimers",
    body: "Investment ranges, ROI projections and timelines shared on the site are indicative based on past performance and assumptions. Actual results vary by location, operator and market conditions. Nothing on this site is investment advice.",
  },
  {
    heading: "7. Governing law",
    body: "These terms are governed by the laws of India. Any dispute will be subject to the exclusive jurisdiction of the courts at Hyderabad, Telangana.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="The basics of how this website may be used. Please read before submitting any enquiry."
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
                Need clarification?
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", lineHeight: 1.7 }}
              >
                Reach us at{" "}
                <Box
                  component="a"
                  href={`mailto:${BRAND.emails.hello}`}
                  sx={{ color: "primary.main", fontWeight: 600 }}
                >
                  {BRAND.emails.hello}
                </Box>{" "}
                or via the{" "}
                <Box
                  component={Link}
                  href="/contact"
                  sx={{ color: "primary.main", fontWeight: 600 }}
                >
                  contact form
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
