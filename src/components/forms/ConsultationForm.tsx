 import { useState } from "react";
 import { useForm } from "react-hook-form";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { z } from "zod";
 import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
 import { ArrowRight, Loader2 } from "lucide-react";
 import { useToast } from "@/hooks/use-toast";
 
 const enquiryTypes = ["General Enquiry", "Training Enquiry"] as const;
 
 const organizations = [
   "Listed Company",
   "Unlisted Company",
   "State Corporation",
   "Regulator",
   "Professional Body",
   "NGO / Not-for-Profit",
   "Development Actor",
   "Family-Owned Business",
   "County Government",
   "Other",
 ] as const;
 
 const services = [
   "Governance Training & Development",
   "Corporate Secretarial Services",
   "Governance Audit",
   "Legal & Compliance Audit",
   "Board Advisory",
   "Entity Formation & Structuring",
   "Board & Committee Charters",
   "Other",
 ] as const;
 
 const formSchema = z.object({
   name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
   enquiryType: z.enum(enquiryTypes, { required_error: "Please select enquiry type" }),
   organization: z.string().min(1, "Organization type is required"),
   phoneNumber: z.string()
     .min(1, "Phone number is required")
     .regex(/^[0-9+\-\s()]+$/, "Phone number can only contain numbers and + - ( ) characters")
     .max(20, "Phone number must be less than 20 characters"),
   email: z.string()
     .trim()
     .min(1, "Email is required")
     .email("Please enter a valid email address")
     .max(255, "Email must be less than 255 characters"),
   service: z.string().optional(),
   description: z.string().max(1000, "Description must be less than 1000 characters").optional(),
 }).refine((data) => {
   if (data.enquiryType === "Training Enquiry" && !data.service) {
     return false;
   }
   return true;
 }, {
   message: "Service is required for Training Enquiry",
   path: ["service"],
 });
 
 type FormData = z.infer<typeof formSchema>;
 
 interface ConsultationFormProps {
   trigger?: React.ReactNode;
 }
 
 const ConsultationForm = ({ trigger }: ConsultationFormProps) => {
   const [open, setOpen] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const { toast } = useToast();
 
   const form = useForm<FormData>({
     resolver: zodResolver(formSchema),
     defaultValues: {
       name: "",
       enquiryType: undefined,
       organization: "",
       phoneNumber: "",
       email: "",
       service: "",
       description: "",
     },
   });
 
   const watchEnquiryType = form.watch("enquiryType");
 
   const onSubmit = async (data: FormData) => {
     setIsSubmitting(true);
     
     const emailTo = data.enquiryType === "Training Enquiry" ? "training@cgc.co.ke" : "info@cgc.co.ke";
     
     const subject = encodeURIComponent(`${data.enquiryType} - ${data.name}`);
     const body = encodeURIComponent(
       `Name: ${data.name}\n` +
       `Type of Enquiry: ${data.enquiryType}\n` +
       `Organization Type: ${data.organization}\n` +
       `Phone: ${data.phoneNumber}\n` +
       `Email: ${data.email}\n` +
       `${data.service ? `Service: ${data.service}\n` : ""}` +
       `${data.description ? `\nDescription:\n${data.description}` : ""}`
     );
     
     // Open email client
     window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
     
     setIsSubmitting(false);
     setOpen(false);
     form.reset();
     
     toast({
       title: "Opening email client",
       description: `Your consultation request will be sent to ${emailTo}`,
     });
   };
 
   return (
     <Dialog open={open} onOpenChange={setOpen}>
       <DialogTrigger asChild>
         {trigger || (
           <Button variant="hero" size="xl" className="group">
             Schedule a Consultation
             <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
           </Button>
         )}
       </DialogTrigger>
       <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
         <DialogHeader>
           <DialogTitle className="text-2xl font-bold">Schedule a Consultation</DialogTitle>
         </DialogHeader>
         
         <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
             <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Name *</FormLabel>
                   <FormControl>
                     <Input placeholder="Your full name" {...field} />
                   </FormControl>
                   <FormMessage />
                 </FormItem>
               )}
             />
             
             <FormField
               control={form.control}
               name="enquiryType"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Type of Enquiry *</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                     <FormControl>
                       <SelectTrigger>
                         <SelectValue placeholder="Select enquiry type" />
                       </SelectTrigger>
                     </FormControl>
                     <SelectContent>
                       {enquiryTypes.map((type) => (
                         <SelectItem key={type} value={type}>
                           {type}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                   <FormMessage />
                 </FormItem>
               )}
             />
             
             <FormField
               control={form.control}
               name="organization"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Organization Type *</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                     <FormControl>
                       <SelectTrigger>
                         <SelectValue placeholder="Select organization type" />
                       </SelectTrigger>
                     </FormControl>
                     <SelectContent>
                       {organizations.map((org) => (
                         <SelectItem key={org} value={org}>
                           {org}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                   <FormMessage />
                 </FormItem>
               )}
             />
             
             <FormField
               control={form.control}
               name="phoneNumber"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Phone Number *</FormLabel>
                   <FormControl>
                     <Input 
                       placeholder="+254 700 000 000" 
                       {...field}
                       onKeyPress={(e) => {
                         if (!/[0-9+\-\s()]/.test(e.key)) {
                           e.preventDefault();
                         }
                       }}
                     />
                   </FormControl>
                   <FormMessage />
                 </FormItem>
               )}
             />
             
             <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Email *</FormLabel>
                   <FormControl>
                     <Input type="email" placeholder="your@email.com" {...field} />
                   </FormControl>
                   <FormMessage />
                 </FormItem>
               )}
             />
             
             <FormField
               control={form.control}
               name="service"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>
                     Service {watchEnquiryType === "Training Enquiry" ? "*" : "(optional)"}
                   </FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                     <FormControl>
                       <SelectTrigger>
                         <SelectValue placeholder="Select a service" />
                       </SelectTrigger>
                     </FormControl>
                     <SelectContent>
                       {services.map((service) => (
                         <SelectItem key={service} value={service}>
                           {service}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                   <FormMessage />
                 </FormItem>
               )}
             />
             
             <FormField
               control={form.control}
               name="description"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Description (optional)</FormLabel>
                   <FormControl>
                     <Textarea 
                       placeholder="Tell us more about your enquiry..."
                       className="min-h-[100px]"
                       {...field} 
                     />
                   </FormControl>
                   <FormMessage />
                 </FormItem>
               )}
             />
             
             <Button type="submit" className="w-full" disabled={isSubmitting}>
               {isSubmitting ? (
                 <>
                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                   Submitting...
                 </>
               ) : (
                 "Submit Enquiry"
               )}
             </Button>
           </form>
         </Form>
       </DialogContent>
     </Dialog>
   );
 };
 
 export default ConsultationForm;