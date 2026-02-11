import type { Registration, Payment, Event, Testimonial, Stat, GalleryItem } from "@/types/models";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// Generate a unique reference ID
export const generateConfirmationRef = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const prefix = "CGC";
  const suffix = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `${prefix}-${suffix}`;
};

// --- Registrations ---
const registrations: Registration[] = [];

export const registrationApi = {
  create: async (data: Omit<Registration, "id" | "confirmationRef" | "createdAt">): Promise<Registration> => {
    const registration: Registration = {
      ...data,
      id: crypto.randomUUID(),
      confirmationRef: generateConfirmationRef(),
      createdAt: new Date(),
    };
    registrations.push(registration);
    return registration;
  },

  getByRef: async (ref: string): Promise<Registration | undefined> => {
    return registrations.find((r) => r.confirmationRef === ref);
  },

  getAll: async (): Promise<Registration[]> => {
    return [...registrations];
  },
};

// --- Payments ---
const payments: Payment[] = [];

export const paymentApi = {
  create: async (data: Omit<Payment, "id" | "createdAt">): Promise<Payment> => {
    const payment: Payment = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    payments.push(payment);
    return payment;
  },

  updateStatus: async (paymentId: string, status: Payment["status"], transactionRef?: string): Promise<Payment | undefined> => {
    const payment = payments.find((p) => p.id === paymentId);
    if (payment) {
      payment.status = status;
      if (transactionRef) payment.transactionRef = transactionRef;
      // Also update registration payment status
      const reg = registrations.find((r) => r.id === payment.registrationId);
      if (reg && status === "completed") {
        reg.paymentStatus = "completed";
      }
    }
    return payment;
  },

  getByRegistration: async (registrationId: string): Promise<Payment | undefined> => {
    return payments.find((p) => p.registrationId === registrationId);
  },
};

// --- Email (mock) ---
export const emailApi = {
  sendConfirmation: async (data: {
    to: string;
    userName: string;
    eventTitle: string;
    eventDate: string;
    eventType: string;
    meetingDetails: string;
    confirmationRef: string;
  }): Promise<{ success: boolean }> => {
    // Mock: In production, POST to /api/send-confirmation-email
    console.log("[Mock Email] Confirmation sent to:", data.to, data);
    return { success: true };
  },
};

// --- Events CRUD (for admin) ---
export const eventsApi = {
  getAll: async (): Promise<Event[]> => {
    // In production, GET /api/events
    return [];
  },
  create: async (event: Omit<Event, "id">): Promise<Event> => {
    return { ...event, id: crypto.randomUUID() };
  },
  update: async (id: string, event: Partial<Event>): Promise<Event> => {
    return { id, ...event } as Event;
  },
  delete: async (id: string): Promise<void> => {
    console.log("[Mock] Deleted event:", id);
  },
};

// --- Testimonials CRUD (for admin) ---
export const testimonialsApi = {
  getAll: async (): Promise<Testimonial[]> => { return []; },
  create: async (t: Omit<Testimonial, "id">): Promise<Testimonial> => {
    return { ...t, id: crypto.randomUUID() };
  },
  update: async (id: string, t: Partial<Testimonial>): Promise<Testimonial> => {
    return { id, ...t } as Testimonial;
  },
  delete: async (id: string): Promise<void> => {
    console.log("[Mock] Deleted testimonial:", id);
  },
};

// --- Stats CRUD (for admin) ---
export const statsApi = {
  getAll: async (): Promise<Stat[]> => { return []; },
  update: async (id: string, s: Partial<Stat>): Promise<Stat> => {
    return { id, ...s } as Stat;
  },
};

// --- Gallery CRUD (for admin) ---
export const galleryApi = {
  getAll: async (): Promise<GalleryItem[]> => { return []; },
  create: async (g: Omit<GalleryItem, "id">): Promise<GalleryItem> => {
    return { ...g, id: crypto.randomUUID() };
  },
  delete: async (id: string): Promise<void> => {
    console.log("[Mock] Deleted gallery item:", id);
  },
};
