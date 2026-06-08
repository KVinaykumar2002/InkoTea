import type {
  BlogPost,
  FAQ,
  FranchiseModelKey,
  MenuCategoryMeta,
  MenuItem,
  Outlet,
  Testimonial,
} from "@/types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export type { BlogPost, FAQ, MenuCategoryMeta, MenuItem, Outlet, Testimonial };

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(
      (body as { error?: string }).error || res.statusText,
      res.status,
    );
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  health: () => request<{ ok: boolean }>("/health"),

  login: (email: string, password: string) =>
    request<{ token: string; user: { id: string; email: string; name: string } }>(
      "/auth/login",
      { method: "POST", body: JSON.stringify({ email, password }) },
    ),

  me: (token: string) =>
    request<{ user: { id: string; email: string; name: string } }>(
      "/auth/me",
      {},
      token,
    ),

  submitLead: (payload: Record<string, unknown>) =>
    request<{ ok: boolean; id: string; message: string }>("/leads", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getDashboardStats: (token: string) =>
    request<{
      leads: {
        total: number;
        byStatus: Record<string, number>;
        recent: Array<{
          id: string;
          name: string;
          phone: string;
          city: string;
          source: string;
          status: string;
          created_at: string;
        }>;
      };
      content: Record<string, number>;
    }>("/dashboard/stats", {}, token),

  getLeads: (token: string, params?: Record<string, string>) => {
    const qs = params ? `?${new URLSearchParams(params)}` : "";
    return request<{ leads: Lead[] }>(`/leads${qs}`, {}, token);
  },

  updateLeadStatus: (token: string, id: string, status: string) =>
    request<{ lead: Lead }>(
      `/leads/${id}`,
      { method: "PATCH", body: JSON.stringify({ status }) },
      token,
    ),

  deleteLead: (token: string, id: string) =>
    request<void>(`/leads/${id}`, { method: "DELETE" }, token),

  getOutlets: () =>
    request<{ outlets: Outlet[]; cities: string[] }>("/outlets"),

  createOutlet: (token: string, outlet: Outlet) =>
    request<{ outlet: Outlet }>(
      "/outlets",
      { method: "POST", body: JSON.stringify(outlet) },
      token,
    ),

  updateOutlet: (token: string, id: string, outlet: Outlet) =>
    request<{ outlet: Outlet }>(
      `/outlets/${id}`,
      { method: "PUT", body: JSON.stringify(outlet) },
      token,
    ),

  deleteOutlet: (token: string, id: string) =>
    request<void>(`/outlets/${id}`, { method: "DELETE" }, token),

  getMenu: () =>
    request<{ categories: MenuCategoryMeta[]; items: MenuItem[] }>("/menu"),

  createMenuItem: (token: string, item: MenuItem) =>
    request<{ item: MenuItem }>(
      "/menu/items",
      { method: "POST", body: JSON.stringify(item) },
      token,
    ),

  updateMenuItem: (token: string, id: string, item: MenuItem) =>
    request<{ item: MenuItem }>(
      `/menu/items/${id}`,
      { method: "PUT", body: JSON.stringify(item) },
      token,
    ),

  deleteMenuItem: (token: string, id: string) =>
    request<void>(`/menu/items/${id}`, { method: "DELETE" }, token),

  getBlogPosts: () => request<{ posts: BlogPost[] }>("/blog"),

  getBlogPost: (slug: string) =>
    request<{ post: BlogPost }>(`/blog/${slug}`),

  createBlogPost: (token: string, post: BlogPost) =>
    request<{ post: BlogPost }>(
      "/blog",
      { method: "POST", body: JSON.stringify(post) },
      token,
    ),

  updateBlogPost: (token: string, slug: string, post: BlogPost) =>
    request<{ post: BlogPost }>(
      `/blog/${slug}`,
      { method: "PUT", body: JSON.stringify(post) },
      token,
    ),

  deleteBlogPost: (token: string, slug: string) =>
    request<void>(`/blog/${slug}`, { method: "DELETE" }, token),

  getFaqs: () => request<{ faqs: FAQ[] }>("/faqs"),

  createFaq: (token: string, faq: FAQ) =>
    request<{ faq: FAQ }>(
      "/faqs",
      { method: "POST", body: JSON.stringify(faq) },
      token,
    ),

  updateFaq: (token: string, id: string, faq: FAQ) =>
    request<{ faq: FAQ }>(
      `/faqs/${id}`,
      { method: "PUT", body: JSON.stringify(faq) },
      token,
    ),

  deleteFaq: (token: string, id: string) =>
    request<void>(`/faqs/${id}`, { method: "DELETE" }, token),

  getTestimonials: () =>
    request<{ testimonials: Testimonial[] }>("/testimonials"),

  createTestimonial: (token: string, t: Testimonial) =>
    request<{ testimonial: Testimonial }>(
      "/testimonials",
      { method: "POST", body: JSON.stringify(t) },
      token,
    ),

  updateTestimonial: (token: string, id: string, t: Testimonial) =>
    request<{ testimonial: Testimonial }>(
      `/testimonials/${id}`,
      { method: "PUT", body: JSON.stringify(t) },
      token,
    ),

  deleteTestimonial: (token: string, id: string) =>
    request<void>(`/testimonials/${id}`, { method: "DELETE" }, token),

  uploadImage: async (token: string, file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`${API_BASE}/uploads`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new ApiError(
        (body as { error?: string }).error || res.statusText,
        res.status,
      );
    }
    return res.json() as Promise<{ url: string }>;
  },
};

export interface Lead {
  id: string;
  name: string;
  phone: string;
  city: string;
  email?: string;
  investmentRange?: string;
  model?: FranchiseModelKey | "both";
  message?: string;
  source: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
