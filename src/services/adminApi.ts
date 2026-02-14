/**
 * Admin API Service Layer
 * 
 * Plug-and-play: Replace BASE_URL with your Node.js backend URL.
 * All endpoints follow RESTful conventions.
 * 
 * Expected endpoints:
 *   GET    /api/events
 *   POST   /api/events
 *   PUT    /api/events/:id
 *   DELETE /api/events/:id
 *
 *   GET    /api/registrations
 *
 *   GET    /api/gallery
 *   POST   /api/gallery (multipart/form-data)
 *   DELETE /api/gallery/:id
 *
 *   GET    /api/stats
 *   POST   /api/stats
 *   PUT    /api/stats/:id
 *   DELETE /api/stats/:id
 *
 *   GET    /api/testimonials
 *   POST   /api/testimonials
 *   PUT    /api/testimonials/:id
 *   DELETE /api/testimonials/:id
 */

import type {
  AdminEvent,
  AdminRegistration,
  AdminGalleryItem,
  AdminStat,
  AdminTestimonial,
} from "@/types/admin";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const error = await res.text().catch(() => "Request failed");
    throw new Error(error);
  }
  return res.json();
}

// ─── Events ───────────────────────────────────────────────
export const adminEventsApi = {
  getAll: () => request<AdminEvent[]>("/api/events"),
  create: (data: Omit<AdminEvent, "id">) =>
    request<AdminEvent>("/api/events", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: Partial<AdminEvent>) =>
    request<AdminEvent>(`/api/events/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) =>
    request<void>(`/api/events/${id}`, { method: "DELETE" }),
};

// ─── Registrations ────────────────────────────────────────
export const adminRegistrationsApi = {
  getAll: () => request<AdminRegistration[]>("/api/registrations"),
  delete: (id: number) =>
    request<void>(`/api/registrations/${id}`, { method: "DELETE" }),
};

// ─── Gallery ──────────────────────────────────────────────
export const adminGalleryApi = {
  getAll: () => request<AdminGalleryItem[]>("/api/gallery"),
  upload: async (file: File, title: string, description: string): Promise<AdminGalleryItem> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    const res = await fetch(`${BASE_URL}/api/gallery`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  },
  delete: (id: number) =>
    request<void>(`/api/gallery/${id}`, { method: "DELETE" }),
};

// ─── Stats ────────────────────────────────────────────────
export const adminStatsApi = {
  getAll: () => request<AdminStat[]>("/api/stats"),
  create: (data: Omit<AdminStat, "id">) =>
    request<AdminStat>("/api/stats", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: Partial<AdminStat>) =>
    request<AdminStat>(`/api/stats/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) =>
    request<void>(`/api/stats/${id}`, { method: "DELETE" }),
};

// ─── Testimonials ─────────────────────────────────────────
export const adminTestimonialsApi = {
  getAll: () => request<AdminTestimonial[]>("/api/testimonials"),
  create: (data: Omit<AdminTestimonial, "id">) =>
    request<AdminTestimonial>("/api/testimonials", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: Partial<AdminTestimonial>) =>
    request<AdminTestimonial>(`/api/testimonials/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) =>
    request<void>(`/api/testimonials/${id}`, { method: "DELETE" }),
};
