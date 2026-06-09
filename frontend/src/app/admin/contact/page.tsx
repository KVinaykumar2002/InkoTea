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
  DEFAULT_QUICK_CHAT,
  type ContactPageContent,
  type QuickChatContent,
} from "@shared/pageContent";

function ContactContent() {
  const { token } = useAdminAuth();
  const { showSuccess, showError } = useAdminToast();
  const [quickChat, setQuickChat] = useState<QuickChatContent>(DEFAULT_QUICK_CHAT);
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    api
      .getPageContent<ContactPageContent>("contact")
      .then((r) => setQuickChat(r.content.quickChat));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    if (!token) return;
    setSaving(true);
    try {
      const content: ContactPageContent = { quickChat };
      await api.updatePageContent(token, "contact", content);
      showSuccess("Quick Chat card updated");
      load();
    } catch (err) {
      showError(getAdminErrorMessage(err, "Failed to save Quick Chat card"));
    } finally {
      setSaving(false);
    }
  };

  const update = (patch: Partial<QuickChatContent>) => {
    setQuickChat((prev) => ({ ...prev, ...patch }));
  };

  return (
    <Box>
      <AdminPageHeader
        title="Quick Chat"
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
        Edit the WhatsApp Quick Chat card shown on the contact page.
      </Typography>

      <Stack
        spacing={2.5}
        maxWidth={720}
        sx={{ p: 2, border: 1, borderColor: "divider", borderRadius: 2 }}
      >
        <AdminFormField
          label="Card title"
          value={quickChat.title}
          onChange={(e) => update({ title: e.target.value })}
        />
        <AdminFormField
          label="Phone number 1"
          value={quickChat.phonePrimary}
          onChange={(e) => update({ phonePrimary: e.target.value })}
          hint="Shown in the card body text"
        />
        <AdminFormField
          label="Phone number 2"
          value={quickChat.phoneSecondary}
          onChange={(e) => update({ phoneSecondary: e.target.value })}
        />
        <AdminFormField
          label="Operating hours"
          value={quickChat.hours}
          onChange={(e) => update({ hours: e.target.value })}
          hint="e.g. Mon–Sat, 10am to 7pm IST"
        />
        <AdminFormField
          label="Button label"
          value={quickChat.ctaLabel}
          onChange={(e) => update({ ctaLabel: e.target.value })}
        />
        <AdminFormField
          label="WhatsApp link"
          value={quickChat.whatsappLink}
          onChange={(e) => update({ whatsappLink: e.target.value })}
          hint="e.g. https://wa.me/918464020418"
        />
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
