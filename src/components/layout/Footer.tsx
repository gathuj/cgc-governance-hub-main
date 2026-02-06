const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Services",
      links: [
        { label: "Governance Training", href: "#services" },
        { label: "Corporate Secretarial", href: "#services" },
        { label: "Governance Audit", href: "#services" },
        { label: "Legal & Compliance", href: "#services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Our Approach", href: "#approach" },
        { label: "Events", href: "#events" },
        { label: "Get in Touch", href: "#contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Gallery", href: "#gallery" },
        { label: "Training Calendar", href: "#events" },
        { label: "Our Services", href: "#services" },
        { label: "Contact Us", href: "#contact" },
      ],
    },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-padding max-w-7xl mx-auto">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <div>
                <span className="text-lg font-bold">Chartered Governance Centre</span>
              </div>
            </div>
            <p className="text-primary-foreground/70 leading-relaxed mb-6 max-w-sm">
              Empowering Bonds, Strengthening Institutions. Excellence in corporate governance for organizations that demand results.
            </p>
            <p className="text-primary font-bold tracking-wider text-sm">
              EMPOWERING BONDS, STRENGTHENING INSTITUTIONS
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((group, index) => (
            <div key={index}>
              <h4 className="font-bold text-primary-foreground mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                      className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} Chartered Governance Centre. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
