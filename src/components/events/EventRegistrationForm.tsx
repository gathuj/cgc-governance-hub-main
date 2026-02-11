import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { registrationApi, emailApi } from "@/services/api";
import type { Event, Registration } from "@/types/models";
import EventConfirmation from "./EventConfirmation";

const registrationSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  idPassport: z.string().trim().min(1, "ID/Passport number is required").max(50),
  gender: z.enum(["male", "female", "other"], { required_error: "Gender is required" }),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().min(1, "Phone number is required").regex(/^[0-9+\-\s()]+$/, "Invalid phone number").max(20),
  organization: z.string().trim().min(1, "Organization is required").max(200),
  hasEmergencyContact: z.boolean().default(false),
  emergencyName: z.string().max(100).optional(),
  emergencyRelationship: z.string().max(100).optional(),
  emergencyEmail: z.string().email("Invalid email").max(255).optional().or(z.literal("")),
  emergencyPhone: z.string().regex(/^[0-9+\-\s()]*$/, "Invalid phone").max(20).optional().or(z.literal("")),
});

type FormData = z.infer<typeof registrationSchema>;

interface Props {
  event: Event;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EventRegistrationForm = ({ event, open, onOpenChange }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{ registration: Registration; event: Event } | null>(null);
  const [showPaymentPrompt, setShowPaymentPrompt] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "", idPassport: "", gender: undefined, email: "", phone: "",
      organization: "", hasEmergencyContact: false, emergencyName: "",
      emergencyRelationship: "", emergencyEmail: "", emergencyPhone: "",
    },
  });

  const hasEmergency = form.watch("hasEmergencyContact");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const isFree = event.price === "free";
      const registration = await registrationApi.create({
        eventId: event.id,
        fullName: data.fullName,
        idPassport: data.idPassport,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        organization: data.organization,
        emergencyContact: data.hasEmergencyContact ? {
          fullName: data.emergencyName || "",
          relationship: data.emergencyRelationship || "",
          email: data.emergencyEmail || "",
          phone: data.emergencyPhone || "",
        } : undefined,
        paymentStatus: isFree ? "not_required" : "pending",
      });

      if (isFree) {
        // Send confirmation email
        await emailApi.sendConfirmation({
          to: data.email,
          userName: data.fullName,
          eventTitle: event.title,
          eventDate: event.date.toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
          eventType: "Free",
          meetingDetails: event.meetingOption === "online"
            ? `Platform: Zoom | Meeting Link: ${event.meetingLink || "TBA"} | Meeting ID: ${event.meetingId || "TBA"}`
            : `Venue: ${event.location}`,
          confirmationRef: registration.confirmationRef,
        });

        setConfirmation({ registration, event });
        toast({ title: "Registration successful!", description: `Ref: ${registration.confirmationRef}` });
      } else {
        // Paid: show payment prompt
        setConfirmation({ registration, event });
        setShowPaymentPrompt(true);
        toast({ title: "Registration saved", description: "Please complete payment to confirm your booking." });
      }
    } catch {
      toast({ title: "Registration failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSimulation = async () => {
    if (!confirmation) return;
    // Simulate payment completion
    const updatedReg = { ...confirmation.registration, paymentStatus: "completed" as const };

    await emailApi.sendConfirmation({
      to: updatedReg.email,
      userName: updatedReg.fullName,
      eventTitle: event.title,
      eventDate: event.date.toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      eventType: `Paid (KES ${event.price})`,
      meetingDetails: event.meetingOption === "online"
        ? `Platform: Zoom | Meeting Link: ${event.meetingLink || "TBA"} | Meeting ID: ${event.meetingId || "TBA"}`
        : `Venue: ${event.location}`,
      confirmationRef: updatedReg.confirmationRef,
    });

    setConfirmation({ registration: updatedReg, event });
    setShowPaymentPrompt(false);
    toast({ title: "Payment confirmed!", description: "Your booking is now confirmed." });
  };

  const handleClose = () => {
    onOpenChange(false);
    setConfirmation(null);
    setShowPaymentPrompt(false);
    form.reset();
  };

  // Show confirmation screen
  if (confirmation && !showPaymentPrompt) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <EventConfirmation
            registration={confirmation.registration}
            event={confirmation.event}
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    );
  }

  // Show payment prompt for paid events
  if (showPaymentPrompt && confirmation) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Complete Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-muted-foreground">
              Your registration is saved. Please complete payment of{" "}
              <strong className="text-foreground">KES {typeof event.price === "number" ? event.price.toLocaleString() : event.price}</strong>{" "}
              to confirm your booking and receive meeting details.
            </p>
            <div className="bg-secondary rounded-lg p-4 border border-border space-y-2">
              <p className="text-sm"><strong>Ref:</strong> {confirmation.registration.confirmationRef}</p>
              <p className="text-sm"><strong>Event:</strong> {event.title}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase">Payment Methods (Coming Soon)</p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" disabled className="opacity-60">PayPal</Button>
                <Button variant="outline" disabled className="opacity-60">M-Pesa</Button>
              </div>
            </div>
            <Button onClick={handlePaymentSimulation} className="w-full">
              Simulate Payment (Demo)
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Register for Event</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mb-2">{event.title}</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField control={form.control} name="fullName" render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="idPassport" render={({ field }) => (
              <FormItem>
                <FormLabel>ID/Passport Number *</FormLabel>
                <FormControl><Input placeholder="12345678" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="gender" render={({ field }) => (
              <FormItem>
                <FormLabel>Gender *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl><Input type="email" placeholder="john@example.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number *</FormLabel>
                <FormControl><Input placeholder="+254 700 000 000" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="organization" render={({ field }) => (
              <FormItem>
                <FormLabel>Organization *</FormLabel>
                <FormControl><Input placeholder="Your organization" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Emergency Contact Toggle */}
            <div className="flex items-center justify-between pt-2 pb-1 border-t border-border">
              <span className="text-sm font-medium">Emergency Contact (Optional)</span>
              <FormField control={form.control} name="hasEmergencyContact" render={({ field }) => (
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              )} />
            </div>

            {hasEmergency && (
              <div className="space-y-3 pl-3 border-l-2 border-primary/30">
                <FormField control={form.control} name="emergencyName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="Emergency contact name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="emergencyRelationship" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship</FormLabel>
                    <FormControl><Input placeholder="e.g. Spouse, Colleague" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="emergencyEmail" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" placeholder="emergency@email.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="emergencyPhone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl><Input placeholder="+254 700 000 000" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            )}

            <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...</>
              ) : (
                "Register Now"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationForm;
