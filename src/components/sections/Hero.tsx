import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Eye } from "lucide-react";
import ConsultationForm from "@/components/forms/ConsultationForm";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const specialties = [
    "Corporate Secretarial Practice",
    "Compliance",
    "Board Advisory",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <section className="relative min-h-screen flex items-center bg-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Red accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />

      <div className="container-padding max-w-7xl mx-auto relative z-10 pt-20 w-full">
        <div className="relative min-h-[600px] flex items-center justify-center">
          {/* Slide 1 - Main Content */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
              currentSlide === 0
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-full pointer-events-none'
            }`}
          >
            <div className="text-primary-foreground text-center max-w-5xl mx-auto px-4">
              <p className="text-primary font-bold tracking-widest uppercase text-sm mb-6">
                Chartered Governance Centre
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6">
                Empowering Bonds,{" "}
                <span className="text-primary">Strengthening</span>{" "}
                Institutions
              </h1>

              <p className="text-lg sm:text-xl text-primary-foreground/80 mb-8 leading-relaxed max-w-3xl mx-auto">
                Excellence in corporate governance, secretarial practice, regulatory compliance and strategic board advisory for organizations that demand results.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#services">
                  <Button variant="hero" size="xl" className="group">
                    Explore Our Services
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                </a>
                <ConsultationForm
                  trigger={
                    <Button variant="heroWhite" size="xl" className="group">
                      Schedule Consultation
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </Button>
                  }
                />
              </div>

              {/* Specialties */}
              <div className="mt-12">
                <p className="text-primary font-bold tracking-wider text-sm mb-6">OUR SPECIALITY</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  {specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-7 py-3.5 bg-gradient-to-r from-primary/30 to-primary/10 border-2 border-primary/50 rounded-full text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:border-primary hover:scale-105 transition-all duration-300"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 - Mission & Vision */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
              currentSlide === 1
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-full pointer-events-none'
            }`}
          >
            <div className="text-primary-foreground text-center max-w-6xl mx-auto px-4 w-full">
              <div className="grid md:grid-cols-2 gap-12 mb-12">
                {/* Mission */}
                <div className="bg-background/10 backdrop-blur-sm rounded-xl p-10 border border-primary/30 text-left">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Target className="text-primary-foreground" size={32} />
                    </div>
                    <h2 className="font-bold text-primary text-3xl">OUR MISSION</h2>
                  </div>
                  <p className="text-primary-foreground/90 text-lg leading-relaxed">
                    To provide specialized training, expert advisory services and comprehensive compliance support that enhances board performance, strengthens governance structures, mitigates legal and compliance risk, and protects stakeholder value.
                  </p>
                </div>

                {/* Vision */}
                <div className="bg-background/10 backdrop-blur-sm rounded-xl p-10 border border-primary/30 text-left">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Eye className="text-primary-foreground" size={32} />
                    </div>
                    <h2 className="font-bold text-primary text-3xl">OUR VISION</h2>
                  </div>
                  <p className="text-primary-foreground/90 text-lg leading-relaxed">
                    To be the leading authority and preferred partner in governance, corporate secretarial and board advisory services in Africa, empowering public and private institutions to achieve sustainable success through exemplary governance practices.
                  </p>
                </div>
              </div>

              {/* Specialties on Slide 2 */}
              <div className="mb-12">
                <p className="text-primary font-bold tracking-wider text-sm mb-6">OUR SPECIALITY</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  {specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-7 py-3.5 bg-gradient-to-r from-primary/30 to-primary/10 border-2 border-primary/50 rounded-full text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:border-primary hover:scale-105 transition-all duration-300"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons on Slide 2 */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#services">
                  <Button variant="hero" size="xl" className="group">
                    Explore Our Services
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                </a>
                <ConsultationForm
                  trigger={
                    <Button variant="heroWhite" size="xl" className="group">
                      Schedule Consultation
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </Button>
                  }
                />
              </div>
            </div>
          </div>

          {/* Slide Indicators - Fixed at bottom */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-20">
            <button
              onClick={() => goToSlide(0)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === 0 ? 'bg-primary w-8' : 'bg-primary-foreground/30 hover:bg-primary-foreground/50'
              }`}
              aria-label="Go to slide 1"
            />
            <button
              onClick={() => goToSlide(1)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === 1 ? 'bg-primary w-8' : 'bg-primary-foreground/30 hover:bg-primary-foreground/50'
              }`}
              aria-label="Go to slide 2"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
