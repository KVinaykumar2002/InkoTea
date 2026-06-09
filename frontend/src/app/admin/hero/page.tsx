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
  DEFAULT_HERO_CONTENT,
  type HeroPageContent,
} from "@shared/pageContent";

function HeroContent() {
  const { token } = useAdminAuth();
  const { showSuccess, showError } = useAdminToast();
  const [form, setForm] = useState<HeroPageContent>(DEFAULT_HERO_CONTENT);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    api.getPageContent<HeroPageContent>("hero").then((r) => setForm(r.content));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    if (!token) return;
    setSaving(true);
    try {
      await api.updatePageContent(token, "hero", form);
      showSuccess("Home hero updated");
      load();
    } catch (err) {
      showError(getAdminErrorMessage(err, "Failed to save hero"));
    } finally {
      setSaving(false);
    }
  };

  const updateSlide = (
    index: number,
    patch: Partial<HeroPageContent["slides"][number]>,
  ) => {
    setForm((prev) => ({
      ...prev,
      slides: prev.slides.map((slide, i) =>
        i === index ? { ...slide, ...patch } : slide,
      ),
    }));
  };

  return (
    <Box>
      <AdminPageHeader
        title="Home Hero"
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
          label="Headline line 1"
          value={form.titleLine1}
          onChange={(e) =>
            setForm((f) => ({ ...f, titleLine1: e.target.value }))
          }
        />
        <AdminFormField
          label="Headline line 2"
          value={form.titleLine2}
          onChange={(e) =>
            setForm((f) => ({ ...f, titleLine2: e.target.value }))
          }
        />
        <AdminFormField
          label="Subhead"
          multiline
          rows={3}
          value={form.subhead}
          onChange={(e) => setForm((f) => ({ ...f, subhead: e.target.value }))}
        />
        <AdminFormField
          label="Primary CTA label"
          value={form.primaryCtaLabel}
          onChange={(e) =>
            setForm((f) => ({ ...f, primaryCtaLabel: e.target.value }))
          }
        />
        <AdminFormField
          label="Primary CTA link"
          value={form.primaryCtaHref}
          onChange={(e) =>
            setForm((f) => ({ ...f, primaryCtaHref: e.target.value }))
          }
        />
        <AdminFormField
          label="Secondary CTA label"
          value={form.secondaryCtaLabel}
          onChange={(e) =>
            setForm((f) => ({ ...f, secondaryCtaLabel: e.target.value }))
          }
        />
        <AdminFormField
          label="Secondary CTA link"
          value={form.secondaryCtaHref}
          onChange={(e) =>
            setForm((f) => ({ ...f, secondaryCtaHref: e.target.value }))
          }
        />

        <Typography variant="subtitle1" fontWeight={700} sx={{ pt: 1 }}>
          Metrics
        </Typography>
        {form.metrics.map((metric, index) => (
          <Stack key={metric.label} spacing={1.5} sx={{ pl: 1 }}>
            <AdminFormField
              label={`Metric ${index + 1} value`}
              value={metric.value}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  metrics: f.metrics.map((m, i) =>
                    i === index ? { ...m, value: e.target.value } : m,
                  ),
                }))
              }
            />
            <AdminFormField
              label={`Metric ${index + 1} label`}
              value={metric.label}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  metrics: f.metrics.map((m, i) =>
                    i === index ? { ...m, label: e.target.value } : m,
                  ),
                }))
              }
            />
          </Stack>
        ))}

        <Typography variant="subtitle1" fontWeight={700} sx={{ pt: 1 }}>
          Hero slides
        </Typography>
        {form.slides.map((slide, index) => (
          <Stack
            key={index}
            spacing={1.5}
            sx={{
              p: 2,
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Slide {index + 1}
            </Typography>
            <ImageDropzone
              label="Background image"
              value={slide.image}
              onChange={(url) => updateSlide(index, { image: url })}
            />
            <AdminFormField
              label="Background position"
              value={slide.position}
              onChange={(e) => updateSlide(index, { position: e.target.value })}
              hint="e.g. center center"
            />
            <AdminFormField
              label="Alt text"
              value={slide.alt}
              onChange={(e) => updateSlide(index, { alt: e.target.value })}
            />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default function AdminHeroPage() {
  return (
    <AdminGuard>
      <HeroContent />
    </AdminGuard>
  );
}
