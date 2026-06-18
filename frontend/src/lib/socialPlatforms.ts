import type { SvgIconComponent } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

import type { SocialPageContent } from "@shared/pageContent";

export const SOCIAL_PLATFORMS: Array<{
  key: keyof SocialPageContent;
  label: string;
  icon: SvgIconComponent;
}> = [
  { key: "instagram", label: "Instagram", icon: InstagramIcon },
  { key: "facebook", label: "Facebook", icon: FacebookIcon },
  { key: "youtube", label: "YouTube", icon: YouTubeIcon },
  { key: "linkedin", label: "LinkedIn", icon: LinkedInIcon },
];

export function socialLinksFromContent(content: SocialPageContent) {
  return SOCIAL_PLATFORMS.map(({ key, label, icon }) => ({
    key,
    label,
    icon,
    href: content[key].trim(),
  })).filter((item) => item.href.length > 0);
}
