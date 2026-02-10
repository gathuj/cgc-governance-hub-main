import { Mail, Phone, MapPin, Clock, Globe, MessageCircle } from "lucide-react";
import ConsultationForm from "@/components/forms/ConsultationForm";

const CTA = () => {
  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            Our Offices
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Reach out to our offices in Kenya or Singapore.
          </p>
        </div>

        {/* Three Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Kenya Office */}
          <div className="bg-secondary rounded-xl p-6 border border-border flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Kenya Office</h3>
                <p className="text-xs text-muted-foreground">Headquarters</p>
              </div>
            </div>
            <div className="space-y-3 text-sm flex-1">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-0.5">Physical Address</p>
                <p className="font-medium">8th Floor, Flamingo Towers, Mara Road, Nairobi</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-0.5">Postal Address</p>
                <p className="font-medium">P.O. Box 71433-00610, Nairobi</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-primary shrink-0" />
                <a href="tel:+254722224005" className="font-medium hover:text-primary transition-colors">+254 722 224 005</a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={14} className="text-primary shrink-0" />
                <a href="https://wa.me/254707112154" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary transition-colors">+254 707 112 154</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-primary shrink-0" />
                <a href="mailto:info@cgc.co.ke" className="font-medium hover:text-primary transition-colors">info@cgc.co.ke</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-primary shrink-0" />
                <a href="mailto:training@cgc.co.ke" className="font-medium hover:text-primary transition-colors">training@cgc.co.ke</a>
              </div>
            </div>
          </div>

          {/* Singapore Office */}
          <div className="bg-secondary rounded-xl p-6 border border-border flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Singapore Office</h3>
                <p className="text-xs text-muted-foreground">Asia-Pacific</p>
              </div>
            </div>
            <div className="space-y-3 text-sm flex-1">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-0.5">Physical Address</p>
                <p className="font-medium">Midview City, #05-125, Blk 26, Sin Ming Lane, Singapore 573960</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-primary shrink-0" />
                <a href="tel:+6531234567" className="font-medium hover:text-primary transition-colors">+65 3123 4567</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-primary shrink-0" />
                <a href="mailto:singapore@cgc.co.ke" className="font-medium hover:text-primary transition-colors">singapore@cgc.co.ke</a>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-secondary rounded-xl p-6 border border-border flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shrink-0">
                <Clock size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-bold text-lg leading-tight">Working Hours</h3>
            </div>
            <div className="space-y-4 text-sm flex-1">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Kenya</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mon – Fri:</span>
                    <span className="font-medium">8:00 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday:</span>
                    <span className="font-medium">9:00 AM – 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sun & Holidays:</span>
                    <span className="font-medium text-primary">Closed</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Singapore</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mon – Fri:</span>
                    <span className="font-medium">9:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sat – Sun:</span>
                    <span className="font-medium text-primary">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="relative bg-primary rounded-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          <div className="relative z-10 px-8 py-12 lg:px-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-3">
              Ready to Strengthen Your Governance?
            </h2>
            <p className="text-primary-foreground/90 mb-6 max-w-xl mx-auto">
              Get in touch to schedule a consultation with our experts.
            </p>
            <ConsultationForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
