"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { BrandLogo } from "@/components/common/BrandLogo";
import { BRAND, NAV_LINKS, NAV_MORE, NAV_PRIMARY } from "@/lib/brand";
import { brandColors } from "@/theme/palette";

const NAV_DARK_BG = brandColors.charcoal;
const NAV_TEXT = brandColors.textOnDark;
const NAV_TEXT_MUTED = "rgba(245, 239, 229, 0.72)";
const NAV_ACCENT = brandColors.amberGold;

/** Resolves whether a link should appear active for the current pathname. */
const isLinkActive = (pathname: string, href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

const navLinkSx = (active: boolean) => ({
  color: active ? NAV_ACCENT : NAV_TEXT,
  fontSize: "0.9rem",
  fontWeight: active ? 600 : 500,
  textDecoration: "none",
  position: "relative",
  py: 1,
  whiteSpace: "nowrap",
  borderRadius: 1,
  transition: "color 0.2s ease",
  "&:hover": { color: NAV_ACCENT },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: active ? "100%" : 0,
    height: 2,
    bgcolor: NAV_ACCENT,
    transition: "width 0.25s ease",
  },
  "&:hover::after": { width: "100%" },
});

export function Navbar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const moreButtonRef = useRef<HTMLButtonElement | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = useMemo(
    () => alpha(NAV_DARK_BG, scrolled ? 0.97 : 0.94),
    [scrolled],
  );

  const moreActive = NAV_MORE.some((l) => isLinkActive(pathname, l.href));

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: navBg,
          backdropFilter: "saturate(180%) blur(14px)",
          WebkitBackdropFilter: "saturate(180%) blur(14px)",
          borderBottom: `1px solid ${
            scrolled ? alpha(NAV_TEXT, 0.12) : "transparent"
          }`,
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: scrolled
            ? "0 8px 28px -12px rgba(0,0,0,0.45)"
            : "none",
          color: NAV_TEXT,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            maxWidth: 1280,
            width: "100%",
            mx: "auto",
            px: { xs: 2, md: 3 },
            minHeight: { xs: 64, md: 72 },
            gap: { xs: 1.5, md: 2 },
          }}
        >
          <Box sx={{ flexShrink: 0 }}>
            <BrandLogo size="md" variant="wordmark" />
          </Box>

          {isDesktop ? (
            <Stack
              direction="row"
              spacing={{ md: 1.5, lg: 2.25 }}
              alignItems="center"
              justifyContent="center"
              sx={{ flexGrow: 1, px: 1 }}
            >
              {NAV_PRIMARY.map((link) => {
                const active = isLinkActive(pathname, link.href);
                return (
                  <Box
                    key={link.href}
                    component={Link}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    sx={navLinkSx(active)}
                  >
                    {link.label}
                  </Box>
                );
              })}

              <Button
                ref={moreButtonRef}
                onClick={() => setMoreOpen(true)}
                aria-haspopup="menu"
                aria-expanded={moreOpen}
                aria-controls={moreOpen ? "navbar-more-menu" : undefined}
                endIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "inherit",
                      transition: "transform 0.2s ease",
                      transform: moreOpen ? "rotate(180deg)" : "none",
                    }}
                  />
                }
                sx={{
                  ...navLinkSx(moreActive),
                  textTransform: "none",
                  px: 1,
                  minWidth: 0,
                  "&:hover": { bgcolor: "transparent" },
                }}
              >
                More
              </Button>
              <Menu
                id="navbar-more-menu"
                anchorEl={moreButtonRef.current}
                open={moreOpen}
                onClose={() => setMoreOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1.5,
                      minWidth: 200,
                      bgcolor: brandColors.charcoalLight,
                      color: NAV_TEXT,
                      border: `1px solid ${alpha(NAV_TEXT, 0.12)}`,
                    },
                  },
                }}
              >
                {NAV_MORE.map((link) => {
                  const active = isLinkActive(pathname, link.href);
                  return (
                    <MenuItem
                      key={link.href}
                      component={Link}
                      href={link.href}
                      selected={active}
                      onClick={() => setMoreOpen(false)}
                      aria-current={active ? "page" : undefined}
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: active ? 600 : 500,
                        py: 1,
                        color: active ? NAV_ACCENT : NAV_TEXT,
                        "&:hover": { bgcolor: alpha(NAV_ACCENT, 0.12) },
                        "&.Mui-selected": {
                          bgcolor: alpha(NAV_ACCENT, 0.16),
                          "&:hover": { bgcolor: alpha(NAV_ACCENT, 0.2) },
                        },
                      }}
                    >
                      {link.label}
                    </MenuItem>
                  );
                })}
              </Menu>
            </Stack>
          ) : (
            <Box sx={{ flexGrow: 1 }} />
          )}

          <Stack direction="row" spacing={1} alignItems="center" sx={{ flexShrink: 0 }}>
            {isDesktop ? (
              <Button
                component={Link}
                href="/franchise"
                variant="contained"
                color="secondary"
                size="medium"
                sx={{
                  whiteSpace: "nowrap",
                  fontWeight: 700,
                  display: "inline-flex",
                }}
              >
                Apply for Franchise
              </Button>
            ) : (
              <IconButton
                aria-label="Open navigation menu"
                onClick={() => setDrawerOpen(true)}
                sx={{
                  color: NAV_TEXT,
                  border: `1px solid ${alpha(NAV_TEXT, 0.22)}`,
                  "&:hover": {
                    bgcolor: alpha(NAV_ACCENT, 0.12),
                    borderColor: NAV_ACCENT,
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "85vw", sm: 360 },
              p: 2,
              display: "flex",
              flexDirection: "column",
              bgcolor: NAV_DARK_BG,
              color: NAV_TEXT,
            },
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <BrandLogo size="sm" variant="wordmark" />
          <IconButton
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            sx={{ color: NAV_TEXT }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <List sx={{ flexGrow: 1, overflowY: "auto" }}>
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(pathname, link.href);
            return (
              <ListItem key={link.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  selected={active}
                  aria-current={active ? "page" : undefined}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    color: NAV_TEXT,
                    "&.Mui-selected": {
                      bgcolor: alpha(NAV_ACCENT, 0.2),
                      color: NAV_ACCENT,
                      "&:hover": { bgcolor: alpha(NAV_ACCENT, 0.28) },
                    },
                    "&:hover": { bgcolor: alpha(NAV_TEXT, 0.06) },
                  }}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ my: 2, borderColor: alpha(NAV_TEXT, 0.12) }} />
        <Typography
          variant="overline"
          sx={{
            color: NAV_TEXT_MUTED,
            letterSpacing: "0.16em",
            px: 1,
            mb: 1,
          }}
        >
          Quick contact
        </Typography>
        <Stack direction="row" spacing={1} sx={{ px: 1, mb: 2 }}>
          <Button
            component="a"
            href={`tel:${BRAND.phoneDigits}`}
            startIcon={<PhoneIcon />}
            variant="outlined"
            fullWidth
            onClick={() => setDrawerOpen(false)}
            sx={{
              justifyContent: "flex-start",
              color: NAV_TEXT,
              borderColor: alpha(NAV_TEXT, 0.28),
              "&:hover": {
                borderColor: NAV_ACCENT,
                bgcolor: alpha(NAV_ACCENT, 0.1),
              },
            }}
          >
            Call
          </Button>
          <Button
            component="a"
            href={BRAND.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<WhatsAppIcon />}
            variant="outlined"
            fullWidth
            onClick={() => setDrawerOpen(false)}
            sx={{
              justifyContent: "flex-start",
              color: NAV_TEXT,
              borderColor: alpha(NAV_TEXT, 0.28),
              "&:hover": {
                borderColor: NAV_ACCENT,
                bgcolor: alpha(NAV_ACCENT, 0.1),
              },
            }}
          >
            WhatsApp
          </Button>
        </Stack>
        <Box sx={{ px: 1, pb: 1 }}>
          <Button
            component={Link}
            href="/franchise"
            onClick={() => setDrawerOpen(false)}
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            sx={{ fontWeight: 700 }}
          >
            Apply for Franchise
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
