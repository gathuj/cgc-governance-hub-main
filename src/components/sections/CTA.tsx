import { Mail, Phone, MapPin, Clock, Globe, MessageCircle } from "lucide-react";
import ConsultationForm from "@/components/forms/ConsultationForm";

const CTA = () => {
  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-padding max-w-7xl mx-auto">
        {/* Working Hours & Location Card */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Working Hours */}
          <div className="bg-secondary rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Clock size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-bold text-lg">Working Hours</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mon – Fri:</span>
                <span className="font-medium">8:00 AM – 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saturday:</span>
                <span className="font-medium">9:00 AM – 1:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sunday & Holidays:</span>
                <span className="font-medium text-primary">Closed</span>
              </div>
            </div>
          </div>

          {/* Physical Location */}
          <div className="bg-secondary rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <MapPin size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-bold text-lg">Our Location</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Physical Address:</span>
                <p className="font-medium">8th Floor, Flamingo Towers, Mara Road</p>
              </div>
              <div>
                <span className="text-muted-foreground">Postal Address:</span>
                <p className="font-medium">P.O. Box 71433-00610, Nairobi</p>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-secondary rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Phone size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-bold text-lg">Contact Us</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-primary" />
                <span className="font-medium">+254 722 224 005</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={14} className="text-primary" />
                <span className="font-medium">+254 707 112 154</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-primary" />
                <a href="https://www.cgc.co.ke" className="font-medium hover:text-primary transition-colors">
                  www.cgc.co.ke
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative bg-primary rounded-2xl overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="text-primary-foreground">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                  Ready to Strengthen Your Governance?
                </h2>
                <p className="text-lg text-primary-foreground/90 leading-relaxed mb-8">
                  Let us help you design and embed governance arrangements that are aligned with your strategy, proportionate to risk, and practical to implement.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                <ConsultationForm />
                </div>
              </div>

              {/* Contact Info */}
              <div className="lg:justify-self-end">
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-8">
                  <h3 className="text-xl font-bold text-primary-foreground mb-6">Get in Touch</h3>
                  
                  <div className="space-y-4">
                    <a
                      href="mailto:info@cgc.co.ke"
                      className="flex items-center gap-4 text-primary-foreground hover:text-primary-foreground/80 transition-colors"
                    >
                      <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-primary-foreground/60">General Inquiries</p>
                        <p className="font-medium">info@cgc.co.ke</p>
                      </div>
                    </a>

                    <a
                      href="mailto:training@cgc.co.ke"
                      className="flex items-center gap-4 text-primary-foreground hover:text-primary-foreground/80 transition-colors"
                    >
                      <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-primary-foreground/60">Training Inquiries</p>
                        <p className="font-medium">training@cgc.co.ke</p>
                      </div>
                    </a>
                    
                    <a
                      href="tel:+254722224005"
                      className="flex items-center gap-4 text-primary-foreground hover:text-primary-foreground/80 transition-colors"
                    >
                      <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-primary-foreground/60">Call Us</p>
                        <p className="font-medium">+254 722 224 005</p>
                      </div>
                    </a>

                    <a
                      href="https://wa.me/254707112154"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-primary-foreground hover:text-primary-foreground/80 transition-colors"
                    >
                      <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                        <MessageCircle size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-primary-foreground/60">WhatsApp</p>
                        <p className="font-medium">+254 707 112 154</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
