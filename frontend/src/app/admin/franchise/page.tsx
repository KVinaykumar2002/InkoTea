"use client";

import { useCallback, useEffect, useState } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdminGuard } from "@/features/admin/AdminGuard";
import { AdminFormField } from "@/features/admin/AdminFormField";
import { AdminPageHeader } from "@/features/admin/AdminPageHeader";
import { ImageDropzone } from "@/features/admin/ImageDropzone";
import {
  getAdminErrorMessage,
  useAdminToast,
} from "@/features/admin/AdminToastProvider";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { api } from "@/lib/api";
import {
  DEFAULT_FRANCHISE_CONTENT,
  type FranchisePageContent,
} from "@shared/pageContent";

function FranchiseContent() {
  const { token } = useAdminAuth();
  const { showSuccess, showError } = useAdminToast();
  const [form, setForm] = useState<FranchisePageContent>(DEFAULT_FRANCHISE_CONTENT);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    api
      .getPageContent<FranchisePageContent>("franchise")
      .then((r) => setForm(r.content));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    if (!token) return;
    setSaving(true);
    try {
      await api.updatePageContent(token, "franchise", form);
      showSuccess("Franchise page updated");
      load();
    } catch (err) {
      showError(getAdminErrorMessage(err, "Failed to save franchise page"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <AdminPageHeader
        title="Franchise Page"
        action={
          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            onClick={save}
            disabled={saving}
          >
            Save changes
          </Button>
        }
      />

      <Stack spacing={2.5} maxWidth={720}>
        <AdminFormField
          label="Chip label"
          value={form.chip}
          onChange={(e) => setForm((f) => ({ ...f, chip: e.target.value }))}
        />
        <AdminFormField
          label="Title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        />
        <AdminFormField
          label="Title accent line"
          value={form.titleAccent}
          onChange={(e) =>
            setForm((f) => ({ ...f, titleAccent: e.target.value }))
          }
        />
        <AdminFormField
          label="Subtitle"
          multiline
          rows={3}
          value={form.subtitle}
          onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
        />
        <ImageDropzone
          label="Hero background image"
          value={form.backgroundImage}
          onChange={(url) => setForm((f) => ({ ...f, backgroundImage: url }))}
        />

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight={700}>
            Hero USPs
          </Typography>
          <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={() =>
              setForm((f) => ({ ...f, usps: [...f.usps, "New highlight"] }))
            }
          >
            Add USP
          </Button>
        </Stack>
        {form.usps.map((usp, index) => (
          <Stack key={index} direction="row" spacing={1} alignItems="flex-start">
            <AdminFormField
              label={`USP ${index + 1}`}
              value={usp}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  usps: f.usps.map((item, i) =>
                    i === index ? e.target.value : item,
                  ),
                }))
              }
              sx={{ flex: 1 }}
            />
            <IconButton
              aria-label="Remove USP"
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  usps: f.usps.filter((_, i) => i !== index),
                }))
              }
              sx={{ mt: 3 }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default function AdminFranchisePage() {
  return (
    <AdminGuard>
      <FranchiseContent />
    </AdminGuard>
  );
}
