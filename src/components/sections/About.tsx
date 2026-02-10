import { CheckCircle, Shield, Eye, Zap, Award, Target } from "lucide-react";

const About = () => {
  const valueToClients = [
    "Define roles and accountability at Board and management levels for effective governance",
    "Improve decision-making, risk oversight, and Board–management collaboration",
    "Streamline board meetings, documentation, and recordkeeping for better efficiency",
    "Promote transparency, ethics, and stakeholder engagement to build trust",
    "Ensure compliance with regulators and stakeholders through strong governance and timely reporting",
  ];

  const coreValues = [
    {
      icon: Shield,
      title: "Integrity",
      description: "We uphold honesty, consistency, and ethical conduct in every engagement.",
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "We communicate openly, ensuring clarity and accountability in our processes and decisions.",
    },
    {
      icon: Zap,
      title: "Agility",
      description: "We respond swiftly and effectively to evolving client needs, industry dynamics, and emerging opportunities.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We pursue the highest standards of quality, professionalism, and continuous improvement in all that we do.",
    },
  ];

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
              About CGC
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Fostering Excellence in Corporate Governance
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-justify">
                The Chartered Governance Centre (CGC) is a professional services firm specializing in corporate governance, secretarial practice, compliance, and board advisory. Founded to meet the growing need for practical governance support, CGC helps organizations recognize that good governance drives performance, resilience, and stakeholder confidence, not just compliance.
              </p>
              <p className="text-justify">
                With expertise in law, governance, finance, risk, and compliance, we support clients holistically, focusing on boards, management, processes, and culture. Serving a range of clients, including listed and unlisted companies, state corporations, regulators, and NGOs, we go beyond compliance to design governance systems that align with strategy and risk.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-foreground mb-4">Our Value to Clients</h3>
              <div className="space-y-3">
                {valueToClients.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="relative">
            <h3 className="text-xl font-bold text-foreground mb-6">Our Core Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coreValues.map((value, index) => (
                <div
                  key={index}
                  className="bg-secondary rounded-lg p-6 border-l-4 border-primary hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <value.icon className="text-primary" size={20} />
                    </div>
                    <h4 className="font-bold text-foreground">{value.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed text-justify">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="bg-secondary rounded-xl p-8 border-l-4 border-primary">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Eye className="text-primary" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-justify">
              To be the leading authority and preferred partner in governance, corporate secretarial, and board advisory services in Africa—empowering public and private institutions to achieve sustainable success through exemplary governance practices.
            </p>
          </div>
          <div className="bg-secondary rounded-xl p-8 border-l-4 border-primary">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="text-primary" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-justify">
              To provide specialized training, expert advisory services, and comprehensive compliance support that enhance board effectiveness, strengthen governance structures, mitigate legal and regulatory risk, and safeguard stakeholder value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
