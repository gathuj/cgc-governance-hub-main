import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navLinks = [
    { href: isHome ? "#about" : "/#about", label: "About" },
    { href: isHome ? "#services" : "/#services", label: "Services" },
    { href: isHome ? "#approach" : "/#approach", label: "Our Approach" },
    { href: "/team", label: "Team" },
    { href: isHome ? "#events" : "/#events", label: "Events" },
    { href: isHome ? "#gallery" : "/#gallery", label: "Gallery" },
    { href: isHome ? "#contact" : "/#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold tracking-tight text-foreground">CGC</span>
              <span className="hidden md:inline text-muted-foreground text-sm ml-2">Chartered Governance Centre</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a href="/#contact">
              <Button variant="hero" size="default">
                Get in Touch
              </Button>
            </a>
          </nav>

          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="/#contact" onClick={() => setIsMenuOpen(false)}>
                <Button variant="hero" size="lg" className="mt-4">
                  Get in Touch
                </Button>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
