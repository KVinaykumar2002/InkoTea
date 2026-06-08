"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdminGuard } from "@/features/admin/AdminGuard";
import { AdminFormModal } from "@/features/admin/AdminFormModal";
import { AdminFormField } from "@/features/admin/AdminFormField";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { api, type FAQ } from "@/lib/api";
import type { FAQ as FaqType } from "@/types";

const empty: FAQ = { id: "", question: "", answer: "", audience: "franchise" };

function FaqsContent() {
  const { token } = useAdminAuth();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [form, setForm] = useState<FAQ>(empty);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const load = useCallback(() => {
    api.getFaqs().then((r) => setFaqs(r.faqs));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setForm({ ...empty, id: `faq-${Date.now()}` });
    setEditing(false);
    setOpen(true);
  };

  const openEdit = (faq: FAQ) => {
    setForm(faq);
    setEditing(true);
    setOpen(true);
  };

  const save = async () => {
    if (!token) return;
    if (editing) await api.updateFaq(token, form.id, form);
    else await api.createFaq(token, form);
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    if (!token || !confirm("Delete this FAQ?")) return;
    await api.deleteFaq(token, id);
    load();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          FAQs
        </Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={openCreate}>
          Add FAQ
        </Button>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell>Audience</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {faqs.map((faq) => (
            <TableRow key={faq.id}>
              <TableCell>{faq.question}</TableCell>
              <TableCell>{faq.audience}</TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => openEdit(faq)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => remove(faq.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AdminFormModal
        open={open}
        title={editing ? "Edit FAQ" : "New FAQ"}
        subtitle="Questions shown on the FAQ page"
        onClose={() => setOpen(false)}
        onSave={save}
      >
        <AdminFormField
          label="ID"
          value={form.id}
          disabled={editing}
          onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
        />
        <AdminFormField
          label="Question"
          value={form.question}
          onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
        />
        <AdminFormField
          label="Answer"
          multiline
          rows={5}
          value={form.answer}
          onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
        />
        <AdminFormField
          label="Audience"
          value={form.audience}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              audience: e.target.value as FaqType["audience"],
            }))
          }
          hint="franchise or customer"
        />
      </AdminFormModal>
    </Box>
  );
}

export default function AdminFaqsPage() {
  return (
    <AdminGuard>
      <FaqsContent />
    </AdminGuard>
  );
}
