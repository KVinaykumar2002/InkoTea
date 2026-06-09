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
  DEFAULT_CHOOSE_YOUR_MODEL,
  type ChooseYourModelContent,
  type FranchiseModelCardContent,
  type FranchiseModelKey,
  type FranchisePageContent,
} from "@shared/pageContent";

const MODEL_LABELS: Record<FranchiseModelKey, string> = {
  kiosk: "INKOTEA Kiosk",
  cafe: "INKOTEA Social Cafe",
};

function FranchiseContent() {
  const { token } = useAdminAuth();
  const { showSuccess, showError } = useAdminToast();
  const [section, setSection] = useState<ChooseYourModelContent>(
    DEFAULT_CHOOSE_YOUR_MODEL,
  );
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    api
      .getPageContent<FranchisePageContent>("franchise")
      .then((r) => setSection(r.content.chooseYourModel));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    if (!token) return;
    setSaving(true);
    try {
      const content: FranchisePageContent = { chooseYourModel: section };
      await api.updatePageContent(token, "franchise", content);
      showSuccess("Choose Your Model section updated");
      load();
    } catch (err) {
      showError(
        getAdminErrorMessage(err, "Failed to save Choose Your Model section"),
      );
    } finally {
      setSaving(false);
    }
  };

  const updateModel = (
    key: FranchiseModelKey,
    patch: Partial<FranchiseModelCardContent>,
  ) => {
    setSection((prev) => ({
      ...prev,
      models: prev.models.map((m) =>
        m.key === key ? { ...m, ...patch } : m,
      ),
    }));
  };

  const updateModelList = (
    key: FranchiseModelKey,
    field: "highlights" | "idealLocations",
    index: number,
    value: string,
  ) => {
    setSection((prev) => ({
      ...prev,
      models: prev.models.map((m) => {
        if (m.key !== key) return m;
        return {
          ...m,
          [field]: m[field].map((item, i) => (i === index ? value : item)),
        };
      }),
    }));
  };

  const addModelListItem = (
    key: FranchiseModelKey,
    field: "highlights" | "idealLocations",
  ) => {
    setSection((prev) => ({
      ...prev,
      models: prev.models.map((m) =>
        m.key === key ? { ...m, [field]: [...m[field], ""] } : m,
      ),
    }));
  };

  const removeModelListItem = (
    key: FranchiseModelKey,
    field: "highlights" | "idealLocations",
    index: number,
  ) => {
    setSection((prev) => ({
      ...prev,
      models: prev.models.map((m) =>
        m.key === key
          ? { ...m, [field]: m[field].filter((_, i) => i !== index) }
          : m,
      ),
    }));
  };

  return (
    <Box>
      <AdminPageHeader
        title="Choose Your Model"
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
        Edit the franchise model comparison section on the franchise page.
      </Typography>

      <Stack spacing={3} maxWidth={760}>
        <Stack
          spacing={2}
          sx={{ p: 2, border: 1, borderColor: "divider", borderRadius: 2 }}
        >
          <Typography variant="subtitle1" fontWeight={700}>
            Section heading
          </Typography>
          <AdminFormField
            label="Eyebrow"
            value={section.eyebrow}
            onChange={(e) =>
              setSection((s) => ({ ...s, eyebrow: e.target.value }))
            }
          />
          <AdminFormField
            label="Title"
            value={section.title}
            onChange={(e) => setSection((s) => ({ ...s, title: e.target.value }))}
          />
          <AdminFormField
            label="Description"
            multiline
            rows={2}
            value={section.description}
            onChange={(e) =>
              setSection((s) => ({ ...s, description: e.target.value }))
            }
          />
        </Stack>

        {section.models.map((model) => (
          <Stack
            key={model.key}
            spacing={2}
            sx={{ p: 2, border: 1, borderColor: "divider", borderRadius: 2 }}
          >
            <Typography variant="subtitle1" fontWeight={700}>
              {MODEL_LABELS[model.key]}
            </Typography>

            <ImageDropzone
              label="Header image"
              value={model.headerImage}
              onChange={(url) => updateModel(model.key, { headerImage: url })}
            />
            <AdminFormField
              label="Name"
              value={model.name}
              onChange={(e) => updateModel(model.key, { name: e.target.value })}
            />
            <AdminFormField
              label="Tagline"
              value={model.tagline}
              onChange={(e) =>
                updateModel(model.key, { tagline: e.target.value })
              }
            />
            <AdminFormField
              label="Description"
              multiline
              rows={3}
              value={model.description}
              onChange={(e) =>
                updateModel(model.key, { description: e.target.value })
              }
            />
            <AdminFormField
              label="Format"
              value={model.format}
              onChange={(e) =>
                updateModel(model.key, { format: e.target.value })
              }
            />
            <AdminFormField
              label="Investment"
              value={model.investment}
              onChange={(e) =>
                updateModel(model.key, { investment: e.target.value })
              }
              hint="e.g. ₹2.5L"
            />
            <AdminFormField
              label="Minimum space"
              value={model.spaceSqFt}
              onChange={(e) =>
                updateModel(model.key, { spaceSqFt: e.target.value })
              }
            />
            <AdminFormField
              label="Setup time"
              value={model.setupTime}
              onChange={(e) =>
                updateModel(model.key, { setupTime: e.target.value })
              }
            />
            <AdminFormField
              label="Staff"
              value={model.staff}
              onChange={(e) => updateModel(model.key, { staff: e.target.value })}
            />
            <AdminFormField
              label="ROI speed"
              value={model.roiSpeed}
              onChange={(e) =>
                updateModel(model.key, { roiSpeed: e.target.value })
              }
            />
            <AdminFormField
              label="Best for"
              value={model.target}
              onChange={(e) =>
                updateModel(model.key, { target: e.target.value })
              }
            />

            <ListEditor
              title="Highlights"
              items={model.highlights}
              onChange={(index, value) =>
                updateModelList(model.key, "highlights", index, value)
              }
              onAdd={() => addModelListItem(model.key, "highlights")}
              onRemove={(index) =>
                removeModelListItem(model.key, "highlights", index)
              }
            />

            <ListEditor
              title="Ideal locations"
              items={model.idealLocations}
              onChange={(index, value) =>
                updateModelList(model.key, "idealLocations", index, value)
              }
              onAdd={() => addModelListItem(model.key, "idealLocations")}
              onRemove={(index) =>
                removeModelListItem(model.key, "idealLocations", index)
              }
            />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

function ListEditor({
  title,
  items,
  onChange,
  onAdd,
  onRemove,
}: {
  title: string;
  items: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}) {
  return (
    <Stack spacing={1.5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" fontWeight={600}>
          {title}
        </Typography>
        <Button size="small" startIcon={<AddIcon />} onClick={onAdd}>
          Add
        </Button>
      </Stack>
      {items.map((item, index) => (
        <Stack key={index} direction="row" spacing={1} alignItems="flex-start">
          <AdminFormField
            label={`${title} ${index + 1}`}
            value={item}
            onChange={(e) => onChange(index, e.target.value)}
            sx={{ flex: 1 }}
          />
          <IconButton
            aria-label={`Remove ${title} ${index + 1}`}
            onClick={() => onRemove(index)}
            sx={{ mt: 3 }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ))}
    </Stack>
  );
}

export default function AdminFranchisePage() {
  return (
    <AdminGuard>
      <FranchiseContent />
    </AdminGuard>
  );
}
