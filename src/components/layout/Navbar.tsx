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
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { BrandLogo } from "@/components/common/BrandLogo";
import { useThemeMode } from "@/theme/ThemeModeProvider";
import { BRAND, NAV_LINKS, NAV_MORE, NAV_PRIMARY } from "@/lib/brand";

/** Resolves whether a link should appear active for the current pathname. */
const isLinkActive = (pathname: string, href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

export function Navbar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const pathname = usePathname();
  const { mode, toggleMode } = useThemeMode();
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
    () =>
      mode === "dark"
        ? alpha(theme.palette.background.default, 0.92)
        : alpha("#FFFFFF", 0.92),
    [mode, theme.palette.background.default],
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
            scrolled ? theme.palette.divider : "transparent"
          }`,
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: scrolled
            ? "0 6px 20px -16px rgba(0,0,0,0.18)"
            : "none",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            maxWidth: 1280,
            width: "100%",
            mx: "auto",
            px: { xs: 2, md: 3 },
            minHeight: { xs: 64, md: 76 },
            gap: 2,
          }}
        >
          <BrandLogo size="md" variant="wordmark" />

          {isDesktop ? (
            <Stack
              direction="row"
              spacing={{ md: 1.25, lg: 2 }}
              alignItems="center"
              sx={{ ml: { md: 2, lg: 4 }, flexGrow: 1 }}
            >
              {NAV_PRIMARY.map((link) => {
                const active = isLinkActive(pathname, link.href);
                return (
                  <Box
                    key={link.href}
                    component={Link}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    sx={{
                      color: active ? "primary.main" : "text.primary",
                      fontSize: "0.9rem",
                      fontWeight: active ? 600 : 500,
                      textDecoration: "none",
                      position: "relative",
                      py: 1,
                      whiteSpace: "nowrap",
                      borderRadius: 1,
                      "&:hover": { color: "primary.main" },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: active ? "100%" : 0,
                        height: 2,
                        bgcolor: "primary.main",
                        transition: "width 0.25s ease",
                      },
                      "&:hover::after": { width: "100%" },
                    }}
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
                      transition: "transform 0.2s ease",
                      transform: moreOpen ? "rotate(180deg)" : "none",
                    }}
                  />
                }
                sx={{
                  color: moreActive ? "primary.main" : "text.primary",
                  fontSize: "0.9rem",
                  fontWeight: moreActive ? 600 : 500,
                  textTransform: "none",
                  px: 1,
                  py: 1,
                  minWidth: 0,
                  borderRadius: 1,
                  "&:hover": {
                    color: "primary.main",
                    bgcolor: "transparent",
                  },
                }}
              >
                More
              </Button>
              <Menu
                id="navbar-more-menu"
                anchorEl={moreButtonRef.current}
                open={moreOpen}
                onClose={() => setMoreOpen(false)}
                MenuListProps={{ "aria-labelledby": "navbar-more-button" }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{
                  paper: { sx: { mt: 1, minWidth: 200 } },
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
                        color: active ? "primary.main" : "text.primary",
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

          <Stack direction="row" spacing={1.5} alignItems="center">
            <IconButton
              onClick={toggleMode}
              size="small"
              aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
              sx={{
                color: "text.primary",
                border: 1,
                borderColor: "divider",
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  borderColor: "primary.main",
                  color: "primary.main",
                },
              }}
            >
              {mode === "light" ? (
                <DarkModeIcon fontSize="small" />
              ) : (
                <LightModeIcon fontSize="small" />
              )}
            </IconButton>
            {isDesktop ? (
              <Button
                component={Link}
                href="/franchise"
                variant="contained"
                color="secondary"
                size="medium"
                sx={{
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  display: { md: "none", lg: "inline-flex" },
                  fontWeight: 700,
                }}
              >
                Apply for Franchise
              </Button>
            ) : (
              <IconButton
                aria-label="Open navigation menu"
                onClick={() => setDrawerOpen(true)}
                sx={{
                  color: "text.primary",
                  border: 1,
                  borderColor: "divider",
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
                    "&.Mui-selected": {
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      "&:hover": { bgcolor: "primary.dark" },
                    },
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

        <Divider sx={{ my: 2 }} />
        <Typography
          variant="overline"
          sx={{
            color: "text.secondary",
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
            color="primary"
            fullWidth
            onClick={() => setDrawerOpen(false)}
            sx={{ justifyContent: "flex-start" }}
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
            color="primary"
            fullWidth
            onClick={() => setDrawerOpen(false)}
            sx={{ justifyContent: "flex-start" }}
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
