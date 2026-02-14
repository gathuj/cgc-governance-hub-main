import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Trash2, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminRegistrationsApi, adminEventsApi } from "@/services/adminApi";
import type { AdminRegistration, AdminEvent } from "@/types/admin";

const PAGE_SIZE = 10;

const RegistrationsManager = () => {
  const [registrations, setRegistrations] = useState<AdminRegistration[]>([]);
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState<number | null>(null);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [regs, evts] = await Promise.all([adminRegistrationsApi.getAll(), adminEventsApi.getAll()]);
      setRegistrations(regs);
      setEvents(evts);
    } catch {
      toast({ title: "Error loading registrations", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = useMemo(() => {
    let result = registrations;
    if (search) result = result.filter(r => r.email.toLowerCase().includes(search.toLowerCase()));
    if (eventFilter !== "all") result = result.filter(r => String(r.event_id) === eventFilter);
    return result;
  }, [registrations, search, eventFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = async (id: number) => {
    setDeleting(id);
    try {
      await adminRegistrationsApi.delete(id);
      toast({ title: "Registration deleted" });
      fetchData();
    } catch {
      toast({ title: "Failed to delete", variant: "destructive" });
    } finally {
      setDeleting(null);
    }
  };

  const getEventTitle = (eventId: number) => events.find(e => e.id === eventId)?.title || `Event #${eventId}`;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Registrations</h2>
        <p className="text-sm text-muted-foreground">View all event registrations (read-only).</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input placeholder="Search by email..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="pl-9" />
        </div>
        <Select value={eventFilter} onValueChange={v => { setEventFilter(v); setPage(1); }}>
          <SelectTrigger className="w-full sm:w-[220px]">
            <SelectValue placeholder="Filter by event" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            {events.map(e => (
              <SelectItem key={e.id} value={String(e.id)}>{e.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-3">
              {[1,2,3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg font-medium mb-1">No registrations found</p>
              <p className="text-sm">
                {search || eventFilter !== "all" ? "Try adjusting your filters." : "Registrations will appear here."}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map(reg => (
                  <TableRow key={reg.id}>
                    <TableCell className="font-mono text-xs">{reg.id}</TableCell>
                    <TableCell className="text-sm">{getEventTitle(reg.event_id)}</TableCell>
                    <TableCell>{reg.email}</TableCell>
                    <TableCell>{reg.phone}</TableCell>
                    <TableCell>
                      <Badge variant={reg.is_paid ? "default" : "secondary"}>
                        {reg.is_paid ? "Paid" : "Free"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{reg.payment_reference || "—"}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(reg.id)} disabled={deleting === reg.id}>
                        {deleting === reg.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} className="text-destructive" />}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex gap-1">
            <Button variant="outline" size="icon" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
              <ChevronLeft size={16} />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationsManager;
