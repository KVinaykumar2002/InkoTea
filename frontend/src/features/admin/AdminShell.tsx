"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ArticleIcon from "@mui/icons-material/Article";
import HelpIcon from "@mui/icons-material/Help";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

const DRAWER_WIDTH = 260;

const NAV = [
  { href: "/admin", label: "Dashboard", icon: <DashboardIcon /> },
  { href: "/admin/leads", label: "Leads", icon: <PeopleIcon /> },
  { href: "/admin/outlets", label: "Outlets", icon: <StoreIcon /> },
  { href: "/admin/menu", label: "Menu", icon: <RestaurantMenuIcon /> },
  { href: "/admin/blog", label: "Blog", icon: <ArticleIcon /> },
  { href: "/admin/faqs", label: "FAQs", icon: <HelpIcon /> },
  { href: "/admin/testimonials", label: "Testimonials", icon: <RateReviewIcon /> },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAdminAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 2.5, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6" fontWeight={700} color="primary">
          INKOTEA
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Admin Dashboard
        </Typography>
      </Box>
      <List sx={{ flex: 1, px: 1, py: 2 }}>
        {NAV.map((item) => (
          <ListItemButton
            key={item.href}
            component={Link}
            href={item.href}
            selected={
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href)
            }
            onClick={() => setMobileOpen(false)}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
        <Typography variant="body2" fontWeight={600} noWrap>
          {user?.name}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          {user?.email}
        </Typography>
        <Button
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={() => {
            logout();
            router.push("/admin/login");
          }}
          sx={{ mt: 1 }}
          color="inherit"
        >
          Sign out
        </Button>
      </Box>
    </Box>
  );

  const pageTitle =
    NAV.find((n) =>
      n.href === "/admin"
        ? pathname === "/admin"
        : pathname.startsWith(n.href),
    )?.label || "Admin";

  return (
    <Box
      className="admin-shell"
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "grey.50",
        overflow: "hidden",
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { xs: "100%", md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          bgcolor: "background.paper",
          color: "text.primary",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, px: { xs: 1.5, sm: 2 } }}>
          {isMobile && (
            <IconButton
              onClick={() => setMobileOpen(true)}
              edge="start"
              aria-label="Open navigation menu"
              sx={{ mr: 0.5 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            fontWeight={600}
            noWrap
            sx={{
              flex: 1,
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            {pageTitle}
          </Typography>
          <Button
            component={Link}
            href="/"
            size="small"
            color="primary"
            sx={{ flexShrink: 0, px: { xs: 1, sm: 1.5 } }}
          >
            <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
              View site
            </Box>
            <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
              Site
            </Box>
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { xs: 0, md: DRAWER_WIDTH },
          flexShrink: { md: 0 },
        }}
      >
        {isMobile ? (
          <Drawer
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
          >
            <Box sx={{ width: DRAWER_WIDTH }}>{drawer}</Box>
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              "& .MuiDrawer-paper": {
                width: DRAWER_WIDTH,
                boxSizing: "border-box",
                borderRight: 1,
                borderColor: "divider",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          p: { xs: 1.5, sm: 2, md: 3 },
          width: { xs: "100%", md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: { xs: 7, sm: 8 },
          overflowX: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
