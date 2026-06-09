"use client";

import { useCallback, useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
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
  DEFAULT_CONTACT_CONTENT,
  type ContactPageContent,
} from "@shared/pageContent";

function ContactContent() {
  const { token } = useAdminAuth();
  const { showSuccess, showError } = useAdminToast();
  const [form, setForm] = useState<ContactPageContent>(DEFAULT_CONTACT_CONTENT);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    api
      .getPageContent<ContactPageContent>("contact")
      .then((r) => setForm(r.content));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    if (!token) return;
    setSaving(true);
    try {
      await api.updatePageContent(token, "contact", form);
      showSuccess("Contact page updated");
      load();
    } catch (err) {
      showError(getAdminErrorMessage(err, "Failed to save contact page"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <AdminPageHeader
        title="Contact Page"
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
          label="Eyebrow"
          value={form.eyebrow}
          onChange={(e) => setForm((f) => ({ ...f, eyebrow: e.target.value }))}
        />
        <AdminFormField
          label="Title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
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
          value={form.heroImage}
          onChange={(url) => setForm((f) => ({ ...f, heroImage: url }))}
        />
        <AdminFormField
          label="Google Maps link"
          value={form.mapsUrl}
          onChange={(e) => setForm((f) => ({ ...f, mapsUrl: e.target.value }))}
        />
        <AdminFormField
          label="Maps embed URL"
          value={form.mapsEmbedSrc}
          onChange={(e) =>
            setForm((f) => ({ ...f, mapsEmbedSrc: e.target.value }))
          }
        />

        <Typography variant="subtitle1" fontWeight={700} sx={{ pt: 1 }}>
          Contact channels
        </Typography>
        {form.channels.map((channel, index) => (
          <Stack
            key={channel.label}
            spacing={1.5}
            sx={{ p: 2, border: 1, borderColor: "divider", borderRadius: 2 }}
          >
            <Typography variant="body2" fontWeight={600}>
              Channel {index + 1}
            </Typography>
            <AdminFormField
              label="Label"
              value={channel.label}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  channels: f.channels.map((c, i) =>
                    i === index ? { ...c, label: e.target.value } : c,
                  ),
                }))
              }
            />
            <AdminFormField
              label="Title"
              value={channel.title}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  channels: f.channels.map((c, i) =>
                    i === index ? { ...c, title: e.target.value } : c,
                  ),
                }))
              }
            />
            <AdminFormField
              label="Description"
              multiline
              rows={2}
              value={channel.text}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  channels: f.channels.map((c, i) =>
                    i === index ? { ...c, text: e.target.value } : c,
                  ),
                }))
              }
            />
            <AdminFormField
              label="Button label"
              value={channel.ctaLabel}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  channels: f.channels.map((c, i) =>
                    i === index ? { ...c, ctaLabel: e.target.value } : c,
                  ),
                }))
              }
            />
            <AdminFormField
              label="Button link"
              value={channel.ctaHref}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  channels: f.channels.map((c, i) =>
                    i === index ? { ...c, ctaHref: e.target.value } : c,
                  ),
                }))
              }
            />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default function AdminContactPage() {
  return (
    <AdminGuard>
      <ContactContent />
    </AdminGuard>
  );
}
