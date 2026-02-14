// Types matching the backend MySQL schema exactly

export interface AdminEvent {
  id?: number;
  title: string;
  description: string;
  date: string; // ISO date string
  locationType: "physical" | "online" | "hybrid";
  locationDetails: string;
  isPaid: boolean;
  price: number | null;
  platform: string;
  meetingLink: string;
  meetingId: string;
}

export interface AdminRegistration {
  id: number;
  event_id: number;
  email: string;
  phone: string;
  is_paid: boolean;
  payment_reference: string;
}

export interface AdminGalleryItem {
  id?: number;
  filename: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface AdminStat {
  id?: number;
  label: string;
  value: string;
  icon: "Shield" | "Users" | "Scale";
}

export interface AdminTestimonial {
  id?: number;
  name: string;
  role: string;
  organization: string;
  quote: string;
}
