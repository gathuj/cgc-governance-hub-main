export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  description: string;
  type: "training" | "workshop";
  meetingOption: "online" | "physical";
  status: "upcoming" | "past";
  price: "free" | number;
  meetingLink?: string;
  meetingId?: string;
}

export interface Registration {
  id: string;
  eventId: string;
  fullName: string;
  idPassport: string;
  gender: "male" | "female" | "other";
  email: string;
  phone: string;
  organization: string;
  emergencyContact?: EmergencyContact;
  confirmationRef: string;
  paymentStatus: "pending" | "completed" | "not_required";
  createdAt: Date;
}

export interface EmergencyContact {
  fullName: string;
  relationship: string;
  email: string;
  phone: string;
}

export interface Payment {
  id: string;
  registrationId: string;
  amount: number;
  method: "paypal" | "mpesa" | "card";
  status: "pending" | "completed" | "failed";
  transactionRef?: string;
  createdAt: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  quote: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  icon: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  location: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  email?: string;
  phone?: string;
}

export interface ConfirmationDetails {
  registration: Registration;
  event: Event;
}
