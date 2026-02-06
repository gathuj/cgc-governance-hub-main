import {
  GraduationCap,
  Building2,
  Search,
  Scale,
  Target
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: GraduationCap,
      title: "Governance Training & Development",
      description: "Programmes designed for contemporary boards and executive teams operating in complex regulatory, strategic and stakeholder environments. Available as open programmes, in-house sessions, executive briefings, and board retreats.",
    },
    {
      icon: Building2,
      title: "Corporate Secretarial Services",
      description: "Full-scope corporate secretarial support ensuring institutions meet all statutory and administrative obligations with accuracy, timeliness and professionalism. Enabling Boards and shareholders to exercise their roles effectively.",
    },
    {
      icon: Search,
      title: "Governance Audit",
      description: "Independent and comprehensive assessment of an organization's governance framework—structures, policies, processes and culture. Ideal for strengthening accountability and preparing for growth or investment.",
    },
    {
      icon: Scale,
      title: "Legal and Compliance Audit",
      description: "Systematic, risk-based review of adherence to relevant laws, regulations, licenses, contractual obligations and internal policies. Helping Boards understand and mitigate legal and regulatory risk.",
    },
  ];

  const keyPillars = [
    {
      title: "Capacity Building",
      description: "Designing and delivering governance training programmes that are practical, context-specific and aligned to client realities. Equipping directors, board committees, senior management and governance professionals with tools, knowledge and mindset.",
    },
    {
      title: "Governance Architecture & Board Advisory",
      description: "Supporting organizations to develop and refine governance structures, policies, board and committee charters and delegation frameworks. Advising on board composition, succession planning, and alignment with strategy and risk.",
    },
    {
      title: "Governance Audit",
      description: "Independent assessment useful for organizations seeking to strengthen accountability, prepare for growth or investment, comply with governance codes, or respond to governance-related concerns.",
    },
    {
      title: "Sustainable Value Creation",
      description: "Helping institutions integrate environmental, social and governance considerations into their governance structures. Supporting boards to maintain ethical standards, manage conflicts of interest and build stakeholder trust.",
    },
  ];

  const targetMarket = [
    "Corporate entities",
    "Public sector institutions",
    "Non-governmental organizations",
    "Small and medium enterprises (SMEs)",
    "Professional firms and partnerships",
    "Boards and senior executives",
    "Investors and development partners",
  ];

  return (
    <section id="services" className="section-padding bg-secondary">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
            Our Services
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Supporting the Full Governance Lifecycle
          </h2>
          <p className="text-lg text-muted-foreground">
            From entity formation to continuous board advisory, we provide comprehensive governance solutions tailored to your organization's needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-background rounded-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <service.icon className="text-primary group-hover:text-primary-foreground transition-colors duration-300" size={28} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Key Pillars */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
              Key Pillars
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              Our Strategic Focus Areas
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyPillars.map((pillar, index) => (
              <div
                key={index}
                className="bg-foreground text-primary-foreground rounded-lg p-6 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <span className="text-primary font-bold text-4xl opacity-20 absolute top-2 right-4">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h4 className="font-bold text-lg mb-3 pr-8">{pillar.title}</h4>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Target Market */}
        <div className="bg-background rounded-lg p-8 border border-border mb-12">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="text-primary" size={28} />
              </div>
              <div>
                <p className="text-primary font-bold tracking-widest uppercase text-xs mb-1">
                  Target Market
                </p>
                <h3 className="text-xl font-bold text-foreground">Who We Serve</h3>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 md:flex-1">
              {targetMarket.map((market, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-secondary rounded-full text-sm font-medium text-foreground border border-border hover:border-primary transition-colors"
                >
                  {market}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
