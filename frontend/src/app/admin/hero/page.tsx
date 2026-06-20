"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveIcon from "@mui/icons-material/Save";
import { AdminGuard } from "@/features/admin/AdminGuard";
import { useAdminDeleteConfirm } from "@/features/admin/AdminDeleteConfirmProvider";
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
  createDefaultHeroSlide,
  DEFAULT_HERO_CONTENT,
  MAX_HERO_SLIDES,
  MIN_HERO_SLIDES,
  normalizeHeroContent,
  type HeroPageContent,
} from "@shared/pageContent";

function HeroContent() {
  const { token } = useAdminAuth();
  const { showSuccess, showError } = useAdminToast();
  const { confirmDelete } = useAdminDeleteConfirm();
  const [form, setForm] = useState<HeroPageContent>(DEFAULT_HERO_CONTENT);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    api
      .getPageContent<HeroPageContent>("hero")
      .then((r) => setForm(normalizeHeroContent(r.content)));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    if (!token) return;
    if (form.slides.length < MIN_HERO_SLIDES) {
      showError(`Keep at least ${MIN_HERO_SLIDES} hero slide.`);
      return;
    }
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

  const addSlide = () => {
    if (form.slides.length >= MAX_HERO_SLIDES) {
      showError(`You can add up to ${MAX_HERO_SLIDES} hero slides.`);
      return;
    }
    setForm((prev) => ({
      ...prev,
      slides: [...prev.slides, createDefaultHeroSlide()],
    }));
  };

  const removeSlide = async (index: number) => {
    if (form.slides.length <= MIN_HERO_SLIDES) {
      showError(`At least ${MIN_HERO_SLIDES} hero slide is required.`);
      return;
    }

    const confirmed = await confirmDelete({
      title: "Delete slide",
      message: "Remove this slide from the home hero carousel?",
      itemName: `Slide ${index + 1}`,
      confirmLabel: "Delete slide",
    });
    if (!confirmed) return;

    setForm((prev) => ({
      ...prev,
      slides: prev.slides.filter((_, i) => i !== index),
    }));
  };

  const canAddSlide = form.slides.length < MAX_HERO_SLIDES;
  const canDeleteSlide = form.slides.length > MIN_HERO_SLIDES;

  return (
    <Box>
      <AdminPageHeader
        title="Home Hero"
        action={
          <Stack direction="row" spacing={1}>
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              onClick={addSlide}
              disabled={!canAddSlide}
            >
              Add slide
            </Button>
            <Button
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={save}
              disabled={saving}
            >
              Save changes
            </Button>
          </Stack>
        }
      />

      <Stack spacing={2.5} maxWidth={720} sx={{ width: "100%" }}>
        <Typography variant="subtitle1" fontWeight={700}>
          Hero slides ({form.slides.length})
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Slide 1 includes overlay copy (headline, CTAs, metrics). Slides 2 and
          beyond are image-only in the carousel. Add or remove slides as needed
          (up to {MAX_HERO_SLIDES}). After uploading an image, click{" "}
          <strong>Save changes</strong> so it is stored.
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
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <Typography variant="body1" fontWeight={700}>
                Slide {index + 1}
              </Typography>
              <IconButton
                size="small"
                color="error"
                aria-label={`Delete slide ${index + 1}`}
                onClick={() => void removeSlide(index)}
                disabled={!canDeleteSlide}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Stack>

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

            {index === 0 ? (
              <>
                <Typography variant="body2" fontWeight={600} sx={{ pt: 1 }}>
                  Overlay copy
                </Typography>
                <AdminFormField
                  label="Chip label"
                  value={slide.chip}
                  onChange={(e) => updateSlide(index, { chip: e.target.value })}
                />
                <AdminFormField
                  label="Headline line 1"
                  value={slide.titleLine1}
                  onChange={(e) =>
                    updateSlide(index, { titleLine1: e.target.value })
                  }
                />
                <AdminFormField
                  label="Headline line 2"
                  value={slide.titleLine2}
                  onChange={(e) =>
                    updateSlide(index, { titleLine2: e.target.value })
                  }
                />
                <AdminFormField
                  label="Subhead"
                  multiline
                  rows={3}
                  value={slide.subhead}
                  onChange={(e) =>
                    updateSlide(index, { subhead: e.target.value })
                  }
                />
                <AdminFormField
                  label="Primary CTA label"
                  value={slide.primaryCtaLabel}
                  onChange={(e) =>
                    updateSlide(index, { primaryCtaLabel: e.target.value })
                  }
                />
                <AdminFormField
                  label="Primary CTA link"
                  value={slide.primaryCtaHref}
                  onChange={(e) =>
                    updateSlide(index, { primaryCtaHref: e.target.value })
                  }
                />
                <AdminFormField
                  label="Secondary CTA label"
                  value={slide.secondaryCtaLabel}
                  onChange={(e) =>
                    updateSlide(index, { secondaryCtaLabel: e.target.value })
                  }
                />
                <AdminFormField
                  label="Secondary CTA link"
                  value={slide.secondaryCtaHref}
                  onChange={(e) =>
                    updateSlide(index, { secondaryCtaHref: e.target.value })
                  }
                />
              </>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ pt: 0.5 }}>
                Image-only slide — no overlay text on the home page.
              </Typography>
            )}
          </Stack>
        ))}

        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={addSlide}
          disabled={!canAddSlide}
          sx={{ alignSelf: "flex-start" }}
        >
          Add slide
        </Button>

        <Typography variant="subtitle1" fontWeight={700} sx={{ pt: 1 }}>
          Metrics
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Shown below the overlay copy on slide 1 only.
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
