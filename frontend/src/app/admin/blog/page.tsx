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
import { AdminPageHeader } from "@/features/admin/AdminPageHeader";
import { AdminTableContainer } from "@/features/admin/AdminTableContainer";
import { AdminTablePagination } from "@/features/admin/AdminTablePagination";
import { ImageDropzone } from "@/features/admin/ImageDropzone";
import { useTablePagination } from "@/features/admin/useTablePagination";
import { useAdminDeleteConfirm } from "@/features/admin/AdminDeleteConfirmProvider";
import {
  getAdminErrorMessage,
  useAdminToast,
} from "@/features/admin/AdminToastProvider";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { api, type BlogPost } from "@/lib/api";
import type { BlogCategory } from "@/types";

const empty: BlogPost = {
  slug: "",
  title: "",
  excerpt: "",
  category: "brand",
  author: "INKOTEA Editorial",
  publishedAt: new Date().toISOString().slice(0, 10),
  readingMinutes: 5,
  cover: "",
  body: "",
};

function BlogContent() {
  const { token } = useAdminAuth();
  const { showSuccess, showError } = useAdminToast();
  const { confirmDelete } = useAdminDeleteConfirm();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<BlogPost>(empty);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [originalSlug, setOriginalSlug] = useState("");

  const load = useCallback(() => {
    api.getBlogPosts().then((r) => setPosts(r.posts));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setForm({ ...empty, slug: `post-${Date.now()}` });
    setEditing(false);
    setOriginalSlug("");
    setOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setForm(post);
    setOriginalSlug(post.slug);
    setEditing(true);
    setOpen(true);
  };

  const save = async () => {
    if (!token) return;
    try {
      if (editing) await api.updateBlogPost(token, originalSlug, form);
      else await api.createBlogPost(token, form);
      setOpen(false);
      load();
      showSuccess(editing ? "Blog post updated" : "Blog post created");
    } catch (err) {
      showError(getAdminErrorMessage(err, "Failed to save blog post"));
    }
  };

  const remove = async (post: BlogPost) => {
    if (!token) return;
    const confirmed = await confirmDelete({
      title: "Delete blog post",
      message: "This will permanently remove the post from the blog.",
      itemName: post.title,
    });
    if (!confirmed) return;
    try {
      await api.deleteBlogPost(token, post.slug);
      load();
      showSuccess("Blog post deleted");
    } catch (err) {
      showError(getAdminErrorMessage(err, "Failed to delete blog post"));
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
  } = useTablePagination(posts);

  return (
    <Box>
      <AdminPageHeader
        title="Blog posts"
        action={
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={openCreate}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Add post
          </Button>
        }
      />
      <AdminTableContainer minWidth={720}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 88, minWidth: 88, whiteSpace: "nowrap" }}>
              Image
            </TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Published</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedItems.map((post) => (
            <TableRow key={post.slug}>
              <TableCell sx={{ width: 88, minWidth: 88 }}>
                {post.cover ? (
                  <Box
                    component="img"
                    src={post.cover}
                    alt={post.title}
                    sx={{
                      width: 56,
                      height: 40,
                      borderRadius: 1,
                      objectFit: "cover",
                      display: "block",
                      bgcolor: "grey.100",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 56,
                      height: 40,
                      borderRadius: 1,
                      bgcolor: "grey.100",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      —
                    </Typography>
                  </Box>
                )}
              </TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.category}</TableCell>
              <TableCell>{post.publishedAt}</TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => openEdit(post)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => remove(post)}>
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
        title={editing ? "Edit blog post" : "New blog post"}
        subtitle="Articles published on the blog page"
        onClose={() => setOpen(false)}
        onSave={save}
      >
        <AdminFormField
          label="Slug"
          value={form.slug}
          disabled={editing}
          onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
        />
        <AdminFormField
          label="Title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        />
        <AdminFormField
          label="Excerpt"
          multiline
          rows={3}
          value={form.excerpt}
          onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
        />
        <AdminFormField
          label="Category"
          value={form.category}
          onChange={(e) =>
            setForm((f) => ({ ...f, category: e.target.value as BlogCategory }))
          }
        />
        <AdminFormField
          label="Author"
          value={form.author}
          onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
        />
        <AdminFormField
          label="Published date"
          value={form.publishedAt}
          onChange={(e) => setForm((f) => ({ ...f, publishedAt: e.target.value }))}
          placeholder="YYYY-MM-DD"
        />
        <AdminFormField
          label="Reading minutes"
          type="number"
          value={form.readingMinutes}
          onChange={(e) =>
            setForm((f) => ({ ...f, readingMinutes: Number(e.target.value) }))
          }
        />
        <ImageDropzone
          label="Cover image"
          value={form.cover}
          onChange={(url) => setForm((f) => ({ ...f, cover: url }))}
        />
        <AdminFormField
          label="Body (markdown)"
          multiline
          rows={8}
          value={form.body}
          onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
        />
      </AdminFormModal>
    </Box>
  );
}

export default function AdminBlogPage() {
  return (
    <AdminGuard>
      <BlogContent />
    </AdminGuard>
  );
}
