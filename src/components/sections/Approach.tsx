import { Crosshair } from "lucide-react";

const Approach = () => {
  const keyDifferentiators = [
    "Multi-disciplinary expertise in law, governance, finance, risk and compliance",
    "Holistic support—looking at Board, management, processes and culture as an integrated system",
    "Go beyond minimum compliance to design governance that aligns with strategy and risk",
    "Make governance a key enabler of decision-making, not an administrative burden",
    "Context-specific solutions anchored in Kenyan and regional regulatory frameworks",
  ];

  return (
    <section id="approach" className="section-padding bg-foreground text-primary-foreground">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
            Our Mission
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Driving Governance Excellence
          </h2>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            To be the trusted partner for organizations seeking to embed governance as a strategic enabler—helping boards and management teams make better decisions, manage risk effectively, and build lasting stakeholder confidence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Content */}
          <div>
            <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
              Key Differentiators
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold mb-8">
              What Sets Us Apart
            </h3>
            <div className="space-y-4">
              {keyDifferentiators.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 bg-primary-foreground/5 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded flex items-center justify-center">
                    <Crosshair className="text-primary-foreground" size={16} />
                  </div>
                  <p className="text-primary-foreground/90 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Quote */}
          <div>
            <div className="relative bg-primary-foreground/5 rounded-lg p-8 lg:p-10 h-full flex flex-col justify-center">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary rounded-l-lg" />
              
              <blockquote className="relative">
                <div className="text-5xl text-primary font-serif absolute -top-2 -left-2">"</div>
                <p className="text-xl lg:text-2xl text-primary-foreground font-medium leading-relaxed pl-8">
                  Good governance is not a "tick-box exercise" but a core driver of organizational performance, resilience and stakeholder confidence.
                </p>
                <footer className="mt-8 pl-8">
                  <div className="w-16 h-1 bg-primary mb-4" />
                  <p className="text-primary font-bold">CGC Philosophy</p>
                  <p className="text-sm text-primary-foreground/60 mt-1">Governance as a value-adding enabler</p>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
