"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { ApiError } from "@/lib/api";

type ToastSeverity = "success" | "error" | "info";

interface ToastState {
  open: boolean;
  message: string;
  severity: ToastSeverity;
}

interface AdminToastContextValue {
  showToast: (message: string, severity?: ToastSeverity) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

const AdminToastContext = createContext<AdminToastContextValue | null>(null);

export function getAdminErrorMessage(err: unknown, fallback: string): string {
  return err instanceof ApiError ? err.message : fallback;
}

export function AdminToastProvider({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    severity: "success",
  });

  const close = useCallback(
    () => setToast((current) => ({ ...current, open: false })),
    [],
  );

  const showToast = useCallback(
    (message: string, severity: ToastSeverity = "success") => {
      setToast({ open: true, message, severity });
    },
    [],
  );

  const showSuccess = useCallback(
    (message: string) => showToast(message, "success"),
    [showToast],
  );

  const showError = useCallback(
    (message: string) => showToast(message, "error"),
    [showToast],
  );

  const value = useMemo(
    () => ({ showToast, showSuccess, showError }),
    [showToast, showSuccess, showError],
  );

  return (
    <AdminToastContext.Provider value={value}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={close}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: isMobile ? "center" : "right",
        }}
        sx={{
          left: { xs: 16, sm: "auto" },
          right: { xs: 16, sm: 24 },
          bottom: { xs: 16, sm: 24 },
        }}
      >
        <Alert
          onClose={close}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%", minWidth: { xs: 0, sm: 280 } }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </AdminToastContext.Provider>
  );
}

export function useAdminToast() {
  const context = useContext(AdminToastContext);
  if (!context) {
    throw new Error("useAdminToast must be used within AdminToastProvider");
  }
  return context;
}
