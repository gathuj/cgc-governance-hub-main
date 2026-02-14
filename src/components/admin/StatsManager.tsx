import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2, Loader2, Shield, Users, Scale } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminStatsApi } from "@/services/adminApi";
import type { AdminStat } from "@/types/admin";

const ICON_OPTIONS: { value: AdminStat["icon"]; label: string; icon: React.ElementType }[] = [
  { value: "Shield", label: "Shield", icon: Shield },
  { value: "Users", label: "Users", icon: Users },
  { value: "Scale", label: "Scale", icon: Scale },
];

const getIcon = (name: string) => {
  const found = ICON_OPTIONS.find(o => o.value === name);
  return found ? found.icon : Shield;
};

const emptyStat: Omit<AdminStat, "id"> = { label: "", value: "", icon: "Shield" };

const StatsManager = () => {
  const [stats, setStats] = useState<AdminStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AdminStat | null>(null);
  const [form, setForm] = useState<Omit<AdminStat, "id">>(emptyStat);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const { toast } = useToast();

  const fetchStats = async () => {
    setLoading(true);
    try { setStats(await adminStatsApi.getAll()); }
    catch { toast({ title: "Error loading stats", variant: "destructive" }); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchStats(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyStat); setDialogOpen(true); };
  const openEdit = (s: AdminStat) => { setEditing(s); setForm({ label: s.label, value: s.value, icon: s.icon }); setDialogOpen(true); };

  const handleSave = async () => {
    if (!form.label.trim() || !form.value.trim()) {
      toast({ title: "Label and Value are required", variant: "destructive" }); return;
    }
    setSaving(true);
    try {
      if (editing?.id) {
        await adminStatsApi.update(editing.id, form);
        toast({ title: "Stat updated" });
      } else {
        await adminStatsApi.create(form);
        toast({ title: "Stat created" });
      }
      setDialogOpen(false);
      fetchStats();
    } catch { toast({ title: "Failed to save", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    setDeleting(id);
    try { await adminStatsApi.delete(id); toast({ title: "Stat deleted" }); fetchStats(); }
    catch { toast({ title: "Failed to delete", variant: "destructive" }); }
    finally { setDeleting(null); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Stats</h2>
          <p className="text-sm text-muted-foreground">Manage homepage statistics.</p>
        </div>
        <Button onClick={openAdd}><Plus size={16} className="mr-1" /> Add Stat</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-12 w-full" />)}</div>
          ) : stats.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg font-medium mb-1">No stats yet</p>
              <p className="text-sm">Add your first homepage statistic.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Icon</TableHead>
                  <TableHead>Label</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.map(stat => {
                  const Icon = getIcon(stat.icon);
                  return (
                    <TableRow key={stat.id}>
                      <TableCell>
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon size={20} className="text-primary" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{stat.label}</TableCell>
                      <TableCell className="text-lg font-bold">{stat.value}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(stat)}><Pencil size={14} /></Button>
                        <Button variant="ghost" size="icon" onClick={() => stat.id && handleDelete(stat.id)} disabled={deleting === stat.id}>
                          {deleting === stat.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} className="text-destructive" />}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Stat" : "Add Stat"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Label *</Label>
              <Input value={form.label} onChange={e => setForm(f => ({...f, label: e.target.value}))} placeholder="e.g. Clients Served" />
            </div>
            <div className="grid gap-2">
              <Label>Value *</Label>
              <Input value={form.value} onChange={e => setForm(f => ({...f, value: e.target.value}))} placeholder="e.g. 100+" />
            </div>
            <div className="grid gap-2">
              <Label>Icon</Label>
              <Select value={form.icon} onValueChange={v => setForm(f => ({...f, icon: v as AdminStat["icon"]}))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ICON_OPTIONS.map(opt => {
                    const Icon = opt.icon;
                    return (
                      <SelectItem key={opt.value} value={opt.value}>
                        <div className="flex items-center gap-2">
                          <Icon size={16} /> {opt.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
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

export default StatsManager;
