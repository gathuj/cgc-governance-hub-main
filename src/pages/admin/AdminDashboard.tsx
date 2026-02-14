import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CalendarDays, Users, Image, BarChart3, MessageSquare,
  LogOut, Shield, Menu, X, ExternalLink,
} from "lucide-react";
import EventsManager from "@/components/admin/EventsManager";
import RegistrationsManager from "@/components/admin/RegistrationsManager";
import GalleryManager from "@/components/admin/GalleryManager";
import StatsManager from "@/components/admin/StatsManager";
import TestimonialsManager from "@/components/admin/TestimonialsManager";

const NAV_ITEMS = [
  { key: "events", label: "Events", icon: CalendarDays },
  { key: "registrations", label: "Registrations", icon: Users },
  { key: "gallery", label: "Gallery", icon: Image },
  { key: "stats", label: "Stats", icon: BarChart3 },
  { key: "testimonials", label: "Testimonials", icon: MessageSquare },
] as const;

type Section = (typeof NAV_ITEMS)[number]["key"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<Section>("events");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem("admin_session");
    if (!session) navigate("/admin/login");
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_session");
    navigate("/admin/login");
  };

  const handleNav = (key: Section) => {
    setActive(key);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-background border-r border-border flex flex-col transition-transform duration-200",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 h-16 px-5 border-b border-border shrink-0">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <Shield className="text-primary-foreground" size={16} />
          </div>
          <span className="font-bold text-lg text-foreground">CGC Admin</span>
          <button className="lg:hidden ml-auto text-muted-foreground" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNav(item.key)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                active === item.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border space-y-2 shrink-0">
          <a href="/" className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted">
            <ExternalLink size={16} /> View Site
          </a>
          <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleLogout}>
            <LogOut size={14} className="mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar (mobile) */}
        <header className="lg:hidden flex items-center h-14 px-4 bg-background border-b border-border sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="mr-3 text-foreground">
            <Menu size={22} />
          </button>
          <span className="font-bold text-foreground">
            {NAV_ITEMS.find(n => n.key === active)?.label}
          </span>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl">
          {active === "events" && <EventsManager />}
          {active === "registrations" && <RegistrationsManager />}
          {active === "gallery" && <GalleryManager />}
          {active === "stats" && <StatsManager />}
          {active === "testimonials" && <TestimonialsManager />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
