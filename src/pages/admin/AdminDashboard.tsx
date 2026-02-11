import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, Image, MessageSquare, BarChart3, LogOut, Users, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { registrationApi } from "@/services/api";
import type { Registration } from "@/types/models";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    const session = sessionStorage.getItem("admin_session");
    if (!session) {
      navigate("/admin/login");
      return;
    }
    registrationApi.getAll().then(setRegistrations);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_session");
    navigate("/admin/login");
  };

  const stats = [
    { label: "Total Events", value: "5", icon: CalendarDays },
    { label: "Registrations", value: String(registrations.length), icon: Users },
    { label: "Gallery Items", value: "6", icon: Image },
    { label: "Testimonials", value: "3", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Shield className="text-primary-foreground" size={16} />
            </div>
            <span className="font-bold text-lg">CGC Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              View Site
            </a>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut size={14} className="mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CRUD Tabs */}
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          {/* Events */}
          <TabsContent value="events">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manage Events</CardTitle>
                <Button size="sm">+ Add Event</Button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Events are managed via <code className="bg-muted px-1 rounded">public/data/events.csv</code>. 
                  Connect a backend to enable full CRUD from this panel.
                </p>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm font-medium mb-2">CSV Format:</p>
                  <code className="text-xs block overflow-x-auto">
                    Name,Type,Description,Date,Time,Location,MeetingOption,Status,Price,MeetingLink
                  </code>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Registrations */}
          <TabsContent value="registrations">
            <Card>
              <CardHeader>
                <CardTitle>Event Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                {registrations.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No registrations yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ref</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registrations.map((reg) => (
                        <TableRow key={reg.id}>
                          <TableCell className="font-mono text-xs">{reg.confirmationRef}</TableCell>
                          <TableCell>{reg.fullName}</TableCell>
                          <TableCell>{reg.email}</TableCell>
                          <TableCell>{reg.organization}</TableCell>
                          <TableCell>
                            <Badge variant={reg.paymentStatus === "completed" || reg.paymentStatus === "not_required" ? "default" : "secondary"}>
                              {reg.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs">{reg.createdAt.toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery */}
          <TabsContent value="gallery">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manage Gallery</CardTitle>
                <Button size="sm">+ Upload Image</Button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Gallery images are managed via <code className="bg-muted px-1 rounded">public/data/gallery.csv</code> and image files in <code className="bg-muted px-1 rounded">src/assets/</code>.
                  Connect a backend to enable file uploads from this panel.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials */}
          <TabsContent value="testimonials">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manage Testimonials</CardTitle>
                <Button size="sm">+ Add Testimonial</Button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Testimonials are managed via <code className="bg-muted px-1 rounded">public/data/testimonials.csv</code>. 
                  Connect a backend to enable full CRUD from this panel.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats */}
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Homepage Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Stats are managed via <code className="bg-muted px-1 rounded">public/data/stats.csv</code>. 
                  Connect a backend to enable inline editing from this panel.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
