import { useCallback } from "react";
import { useCSVData } from "@/hooks/useCSVData";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Shield, Users, Scale } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Stat {
  label: string;
  value: string;
  icon: string;
}

interface Testimonial {
  name: string;
  role: string;
  organization: string;
  quote: string;
}

const iconMap: Record<string, typeof Shield> = {
  Shield,
  Users,
  Scale,
};

const Testimonials = () => {
  const parseStats = useCallback((rows: string[][]): Stat[] => {
    return rows.map((row) => ({
      label: row[0] || "",
      value: row[1] || "",
      icon: row[2] || "Shield",
    }));
  }, []);

  const parseTestimonials = useCallback((rows: string[][]): Testimonial[] => {
    return rows.map((row) => ({
      name: row[0] || "",
      role: row[1] || "",
      organization: row[2] || "",
      quote: row[3] || "",
    }));
  }, []);

  const { data: stats, loading: statsLoading } = useCSVData<Stat>(
    "/data/stats.csv",
    parseStats
  );

  const { data: testimonials, loading: testimonialsLoading } = useCSVData<Testimonial>(
    "/data/testimonials.csv",
    parseTestimonials
  );

  return (
    <section id="testimonials" className="section-padding bg-background">
      <div className="container-padding max-w-7xl mx-auto">
        {/* Stats Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
              Our Impact
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Trusted by Leading Organizations
            </h2>
          </div>

          {statsLoading ? (
            <div className="grid grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = iconMap[stat.icon] || Shield;
                return (
                  <div
                    key={index}
                    className="text-center p-8 bg-secondary rounded-lg border border-border"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                        <IconComponent className="text-primary" size={28} />
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-foreground mb-2">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Stats CSV Format */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg text-center">
            <p className="text-xs text-muted-foreground">
              Edit stats in <code className="bg-muted px-1 rounded">public/data/stats.csv</code> — Format: Label,Value,Icon (Shield, Users, or Scale)
            </p>
          </div>
        </div>

        {/* Testimonials Section */}
        <div>
          <div className="text-center mb-10">
            <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
              Client Testimonials
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              What Our Clients Say
            </h3>
          </div>

          {testimonialsLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <CardContent className="p-6">
                    <Quote className="text-primary/20 absolute top-4 right-4" size={40} />
                    <p className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                      "{testimonial.quote}"
                    </p>
                    <div className="border-t border-border pt-4">
                      <p className="font-bold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.organization}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Testimonials CSV Format */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg text-center">
            <p className="text-xs text-muted-foreground">
              Edit testimonials in <code className="bg-muted px-1 rounded">public/data/testimonials.csv</code> — Format: Name,Role,Organization,Quote
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
