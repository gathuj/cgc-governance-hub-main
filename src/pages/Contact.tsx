import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import { Mail, Phone, MapPin, Clock, Globe, MessageCircle } from "lucide-react";
import ConsultationForm from "@/components/forms/ConsultationForm";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="section-padding bg-background">
          <div className="container-padding max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="text-primary font-medium tracking-wider uppercase text-sm">
                Get in Touch
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
                Contact Us
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Reach out to our offices in Kenya or Singapore. We're here to help you strengthen your governance.
              </p>
            </div>

            {/* Two Office Locations */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Kenya Office */}
              <div className="bg-secondary rounded-2xl p-8 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <MapPin size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-bold text-xl">Kenya Office</h2>
                    <p className="text-muted-foreground text-sm">Headquarters</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Physical Address</p>
                    <p className="font-medium">8th Floor, Flamingo Towers, Mara Road, Nairobi</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Postal Address</p>
                    <p className="font-medium">P.O. Box 71433-00610, Nairobi</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-primary" />
                    <a href="tel:+254722224005" className="font-medium hover:text-primary transition-colors">+254 722 224 005</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={14} className="text-primary" />
                    <a href="https://wa.me/254707112154" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary transition-colors">+254 707 112 154 (WhatsApp)</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-primary" />
                    <a href="mailto:info@cgc.co.ke" className="font-medium hover:text-primary transition-colors">info@cgc.co.ke</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-primary" />
                    <a href="mailto:training@cgc.co.ke" className="font-medium hover:text-primary transition-colors">training@cgc.co.ke</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-primary" />
                    <a href="https://www.cgc.co.ke" className="font-medium hover:text-primary transition-colors">www.cgc.co.ke</a>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={14} className="text-primary" />
                      <span className="text-sm font-semibold">Working Hours</span>
                    </div>
                    <div className="text-sm space-y-1 pl-6">
                      <p><span className="text-muted-foreground">Mon – Fri:</span> 8:00 AM – 5:00 PM</p>
                      <p><span className="text-muted-foreground">Saturday:</span> 9:00 AM – 1:00 PM</p>
                      <p><span className="text-muted-foreground">Sunday:</span> <span className="text-primary">Closed</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Singapore Office */}
              <div className="bg-secondary rounded-2xl p-8 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <MapPin size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-bold text-xl">Singapore Office</h2>
                    <p className="text-muted-foreground text-sm">Asia-Pacific</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Physical Address</p>
                    <p className="font-medium">1 Raffles Place, #20-61, Tower 2, Singapore 048616</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-primary" />
                    <a href="tel:+6531234567" className="font-medium hover:text-primary transition-colors">+65 3123 4567</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-primary" />
                    <a href="mailto:singapore@cgc.co.ke" className="font-medium hover:text-primary transition-colors">singapore@cgc.co.ke</a>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={14} className="text-primary" />
                      <span className="text-sm font-semibold">Working Hours</span>
                    </div>
                    <div className="text-sm space-y-1 pl-6">
                      <p><span className="text-muted-foreground">Mon – Fri:</span> 9:00 AM – 6:00 PM (SGT)</p>
                      <p><span className="text-muted-foreground">Sat – Sun:</span> <span className="text-primary">Closed</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="relative bg-primary rounded-2xl overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>
              <div className="relative z-10 px-8 py-16 lg:px-16 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
                  Ready to Strengthen Your Governance?
                </h2>
                <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
                  Schedule a consultation with our experts today.
                </p>
                <ConsultationForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default ContactPage;