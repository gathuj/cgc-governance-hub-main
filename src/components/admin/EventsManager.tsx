import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { adminEventsApi } from "@/services/adminApi";
import type { AdminEvent } from "@/types/admin";

const emptyEvent: Omit<AdminEvent, "id"> = {
  title: "", description: "", date: "", locationType: "physical",
  locationDetails: "", isPaid: false, price: null, platform: "",
  meetingLink: "", meetingId: "",
};

const EventsManager = () => {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AdminEvent | null>(null);
  const [form, setForm] = useState<Omit<AdminEvent, "id">>(emptyEvent);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const { toast } = useToast();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await adminEventsApi.getAll();
      setEvents(data);
    } catch {
      toast({ title: "Error loading events", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyEvent); setDialogOpen(true); };
  const openEdit = (e: AdminEvent) => {
    setEditing(e);
    setForm({ title: e.title, description: e.description, date: e.date, locationType: e.locationType, locationDetails: e.locationDetails, isPaid: e.isPaid, price: e.price, platform: e.platform, meetingLink: e.meetingLink, meetingId: e.meetingId });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.date) {
      toast({ title: "Title and Date are required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      if (editing?.id) {
        await adminEventsApi.update(editing.id, form);
        toast({ title: "Event updated" });
      } else {
        await adminEventsApi.create(form);
        toast({ title: "Event created" });
      }
      setDialogOpen(false);
      fetchEvents();
    } catch {
      toast({ title: "Failed to save event", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeleting(id);
    try {
      await adminEventsApi.delete(id);
      toast({ title: "Event deleted" });
      fetchEvents();
    } catch {
      toast({ title: "Failed to delete", variant: "destructive" });
    } finally {
      setDeleting(null);
    }
  };

  const dateValue = form.date ? new Date(form.date) : undefined;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Events</h2>
          <p className="text-sm text-muted-foreground">Manage your events, trainings and workshops.</p>
        </div>
        <Button onClick={openAdd}><Plus size={16} className="mr-1" /> Add Event</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-3">
              {[1,2,3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg font-medium mb-1">No events yet</p>
              <p className="text-sm">Click "Add Event" to create your first event.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Pricing</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map(event => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell className="text-sm">{event.date ? format(new Date(event.date), "PPP") : "—"}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{event.locationType}</Badge>
                      <span className="ml-2 text-xs text-muted-foreground">{event.locationDetails}</span>
                    </TableCell>
                    <TableCell>
                      {event.isPaid ? (
                        <Badge className="bg-primary text-primary-foreground">KES {event.price?.toLocaleString()}</Badge>
                      ) : (
                        <Badge variant="secondary">Free</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(event)}>
                        <Pencil size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => event.id && handleDelete(event.id)} disabled={deleting === event.id}>
                        {deleting === event.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} className="text-destructive" />}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Event" : "Add Event"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Title *</Label>
              <Input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="Event title" />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} placeholder="Event description" rows={3} />
            </div>
            <div className="grid gap-2">
              <Label>Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dateValue && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateValue ? format(dateValue, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={dateValue} onSelect={d => setForm(f => ({...f, date: d ? d.toISOString().split("T")[0] : ""}))} className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label>Location Type</Label>
              <Select value={form.locationType} onValueChange={v => setForm(f => ({...f, locationType: v as AdminEvent["locationType"]}))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="physical">Physical</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Location Details</Label>
              <Input value={form.locationDetails} onChange={e => setForm(f => ({...f, locationDetails: e.target.value}))} placeholder="Venue or online details" />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <Label className="cursor-pointer">Paid Event?</Label>
              <Switch checked={form.isPaid} onCheckedChange={v => setForm(f => ({...f, isPaid: v, price: v ? f.price : null}))} />
            </div>
            {form.isPaid && (
              <div className="grid gap-2">
                <Label>Price (KES)</Label>
                <Input type="number" value={form.price ?? ""} onChange={e => setForm(f => ({...f, price: e.target.value ? Number(e.target.value) : null}))} placeholder="0" />
              </div>
            )}
            <div className="grid gap-2">
              <Label>Platform</Label>
              <Input value={form.platform} onChange={e => setForm(f => ({...f, platform: e.target.value}))} placeholder="Zoom, Teams, etc." />
            </div>
            <div className="grid gap-2">
              <Label>Meeting Link</Label>
              <Input value={form.meetingLink} onChange={e => setForm(f => ({...f, meetingLink: e.target.value}))} placeholder="https://..." />
            </div>
            <div className="grid gap-2">
              <Label>Meeting ID</Label>
              <Input value={form.meetingId} onChange={e => setForm(f => ({...f, meetingId: e.target.value}))} placeholder="Meeting ID" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <><Loader2 size={14} className="mr-1 animate-spin" /> Saving...</> : editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventsManager;
