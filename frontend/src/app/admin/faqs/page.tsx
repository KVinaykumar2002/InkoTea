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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdminGuard } from "@/features/admin/AdminGuard";
import { AdminFormModal } from "@/features/admin/AdminFormModal";
import { AdminFormField } from "@/features/admin/AdminFormField";
import { AdminPageHeader } from "@/features/admin/AdminPageHeader";
import { AdminTableContainer } from "@/features/admin/AdminTableContainer";
import { AdminTablePagination } from "@/features/admin/AdminTablePagination";
import { useTablePagination } from "@/features/admin/useTablePagination";
import { useAdminDeleteConfirm } from "@/features/admin/AdminDeleteConfirmProvider";
import {
  getAdminErrorMessage,
  useAdminToast,
} from "@/features/admin/AdminToastProvider";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { api, type FAQ } from "@/lib/api";
import type { FAQ as FaqType } from "@/types";

const empty: FAQ = { id: "", question: "", answer: "", audience: "franchise" };

function FaqsContent() {
  const { token } = useAdminAuth();
  const { showSuccess, showError } = useAdminToast();
  const { confirmDelete } = useAdminDeleteConfirm();
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
    try {
      if (editing) await api.updateFaq(token, form.id, form);
      else await api.createFaq(token, form);
      setOpen(false);
      load();
      showSuccess(editing ? "FAQ updated" : "FAQ created");
    } catch (err) {
      showError(getAdminErrorMessage(err, "Failed to save FAQ"));
    }
  };

  const remove = async (faq: FAQ) => {
    if (!token) return;
    const confirmed = await confirmDelete({
      title: "Delete FAQ",
      message: "This will permanently remove the question from the FAQ page.",
      itemName: faq.question,
    });
    if (!confirmed) return;
    try {
      await api.deleteFaq(token, faq.id);
      load();
      showSuccess("FAQ deleted");
    } catch (err) {
      showError(getAdminErrorMessage(err, "Failed to delete FAQ"));
    }
  };

  const {
    page,
    setPage,
    pageSize,
    totalPages,
    showPagination,
    paginatedItems,
    totalItems,
  } = useTablePagination(faqs);

  return (
    <Box>
      <AdminPageHeader
        title="FAQs"
        action={
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={openCreate}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Add FAQ
          </Button>
        }
      />
      <AdminTableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell>Audience</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedItems.map((faq) => (
            <TableRow key={faq.id}>
              <TableCell>{faq.question}</TableCell>
              <TableCell>{faq.audience}</TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => openEdit(faq)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => remove(faq)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </AdminTableContainer>
      {showPagination && (
        <AdminTablePagination
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      )}
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
