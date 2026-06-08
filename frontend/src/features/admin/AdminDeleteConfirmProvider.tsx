"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export interface DeleteConfirmOptions {
  title?: string;
  message?: string;
  itemName?: string;
  confirmLabel?: string;
}

interface AdminDeleteConfirmContextValue {
  confirmDelete: (options?: DeleteConfirmOptions) => Promise<boolean>;
}

const AdminDeleteConfirmContext =
  createContext<AdminDeleteConfirmContextValue | null>(null);

const DEFAULT_OPTIONS: Required<DeleteConfirmOptions> = {
  title: "Delete item",
  message: "This action cannot be undone.",
  itemName: "",
  confirmLabel: "Delete",
};

export function AdminDeleteConfirmProvider({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<DeleteConfirmOptions>({});
  const [resolve, setResolve] = useState<((value: boolean) => void) | null>(
    null,
  );

  const confirmDelete = useCallback((nextOptions: DeleteConfirmOptions = {}) => {
    return new Promise<boolean>((promiseResolve) => {
      setOptions(nextOptions);
      setResolve(() => promiseResolve);
      setOpen(true);
    });
  }, []);

  const close = useCallback(
    (confirmed: boolean) => {
      setOpen(false);
      resolve?.(confirmed);
      setResolve(null);
      setOptions({});
    },
    [resolve],
  );

  const merged = { ...DEFAULT_OPTIONS, ...options };

  const value = useMemo(() => ({ confirmDelete }), [confirmDelete]);

  return (
    <AdminDeleteConfirmContext.Provider value={value}>
      {children}
      <Dialog
        className="admin-delete-dialog"
        open={open}
        onClose={() => close(false)}
        maxWidth="xs"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, sm: 2 },
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            pt: 3,
            pb: 2,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              bgcolor: "error.light",
              color: "error.dark",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <DeleteOutlineIcon />
          </Box>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            {merged.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {merged.message}
          </Typography>
          {merged.itemName ? (
            <Typography
              variant="subtitle2"
              fontWeight={700}
              sx={{ mt: 1.5, wordBreak: "break-word" }}
            >
              {merged.itemName}
            </Typography>
          ) : null}
        </Box>

        <DialogContent sx={{ px: { xs: 2, sm: 3 }, py: 0 }} />

        <DialogActions
          sx={{
            px: { xs: 2, sm: 3 },
            py: 2.5,
            gap: 1.5,
            flexDirection: { xs: "column-reverse", sm: "row" },
            alignItems: "stretch",
            borderTop: 1,
            borderColor: "divider",
            "& .MuiButton-root": { width: { xs: "100%", sm: "auto" }, m: 0 },
          }}
        >
          <Button onClick={() => close(false)} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => close(true)}
            variant="contained"
            color="error"
          >
            {merged.confirmLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminDeleteConfirmContext.Provider>
  );
}

export function useAdminDeleteConfirm() {
  const context = useContext(AdminDeleteConfirmContext);
  if (!context) {
    throw new Error(
      "useAdminDeleteConfirm must be used within AdminDeleteConfirmProvider",
    );
  }
  return context;
}
