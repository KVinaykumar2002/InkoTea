"use client";

import { useCallback, useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { AdminGuard } from "@/features/admin/AdminGuard";
import { AdminFormField } from "@/features/admin/AdminFormField";
import { AdminPageHeader } from "@/features/admin/AdminPageHeader";
import {
  getAdminErrorMessage,
  useAdminToast,
} from "@/features/admin/AdminToastProvider";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { api } from "@/lib/api";
import {
  DEFAULT_SOCIAL_CONTENT,
  normalizeSocialContent,
  type SocialPageContent,
} from "@shared/pageContent";

const FIELDS: Array<{
  key: keyof SocialPageContent;
  label: string;
  hint: string;
}> = [
  {
    key: "instagram",
    label: "Instagram URL",
    hint: "e.g. https://instagram.com/inkotea",
  },
  {
    key: "facebook",
    label: "Facebook URL",
    hint: "e.g. https://facebook.com/inkotea",
  },
  {
    key: "youtube",
    label: "YouTube URL",
    hint: "e.g. https://youtube.com/@inkotea",
  },
  {
    key: "linkedin",
    label: "LinkedIn URL",
    hint: "e.g. https://linkedin.com/company/inkotea",
  },
];

function SocialContent() {
  const { token } = useAdminAuth();
  const { showSuccess, showError } = useAdminToast();
  const [form, setForm] = useState<SocialPageContent>(DEFAULT_SOCIAL_CONTENT);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    api
      .getPageContent<SocialPageContent>("social")
      .then((r) => setForm(normalizeSocialContent(r.content)));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    if (!token) return;
    setSaving(true);
    try {
      await api.updatePageContent(token, "social", form);
      showSuccess("Social links updated");
      load();
    } catch (err) {
      showError(getAdminErrorMessage(err, "Failed to save social links"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <AdminPageHeader
        title="Social Media"
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

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 560 }}>
        These links appear in the site footer and on the contact page. Leave a
        field blank to hide that platform.
      </Typography>

      <Stack
        spacing={2.5}
        maxWidth={720}
        sx={{
          width: "100%",
          p: 2,
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        {FIELDS.map(({ key, label, hint }) => (
          <AdminFormField
            key={key}
            label={label}
            value={form[key]}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, [key]: e.target.value }))
            }
            hint={hint}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default function AdminSocialPage() {
  return (
    <AdminGuard>
      <SocialContent />
    </AdminGuard>
  );
}
