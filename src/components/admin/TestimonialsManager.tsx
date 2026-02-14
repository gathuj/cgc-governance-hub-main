import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2, Quote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminTestimonialsApi } from "@/services/adminApi";
import type { AdminTestimonial } from "@/types/admin";

const emptyTestimonial: Omit<AdminTestimonial, "id"> = { name: "", role: "", organization: "", quote: "" };

const TestimonialsManager = () => {
  const [items, setItems] = useState<AdminTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AdminTestimonial | null>(null);
  const [form, setForm] = useState<Omit<AdminTestimonial, "id">>(emptyTestimonial);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const { toast } = useToast();

  const fetchItems = async () => {
    setLoading(true);
    try { setItems(await adminTestimonialsApi.getAll()); }
    catch { toast({ title: "Error loading testimonials", variant: "destructive" }); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyTestimonial); setDialogOpen(true); };
  const openEdit = (t: AdminTestimonial) => { setEditing(t); setForm({ name: t.name, role: t.role, organization: t.organization, quote: t.quote }); setDialogOpen(true); };

  const handleSave = async () => {
    if (!form.name.trim() || !form.quote.trim()) {
      toast({ title: "Name and Quote are required", variant: "destructive" }); return;
    }
    setSaving(true);
    try {
      if (editing?.id) {
        await adminTestimonialsApi.update(editing.id, form);
        toast({ title: "Testimonial updated" });
      } else {
        await adminTestimonialsApi.create(form);
        toast({ title: "Testimonial created" });
      }
      setDialogOpen(false);
      fetchItems();
    } catch { toast({ title: "Failed to save", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    setDeleting(id);
    try { await adminTestimonialsApi.delete(id); toast({ title: "Testimonial deleted" }); fetchItems(); }
    catch { toast({ title: "Failed to delete", variant: "destructive" }); }
    finally { setDeleting(null); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Testimonials</h2>
          <p className="text-sm text-muted-foreground">Manage client testimonials and reviews.</p>
        </div>
        <Button onClick={openAdd}><Plus size={16} className="mr-1" /> Add Testimonial</Button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[1,2].map(i => <Skeleton key={i} className="h-48 w-full rounded-lg" />)}
        </div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="text-center py-16 text-muted-foreground">
            <Quote size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium mb-1">No testimonials yet</p>
            <p className="text-sm">Add your first client testimonial.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {items.map(item => (
            <Card key={item.id} className="relative group">
              <CardContent className="p-6">
                <Quote size={24} className="text-primary/20 mb-3" />
                <p className="text-foreground leading-relaxed italic mb-4">"{item.quote}"</p>
                <div className="border-t border-border pt-3">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.role}{item.organization && ` · ${item.organization}`}</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => openEdit(item)}>
                    <Pencil size={12} />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => item.id && handleDelete(item.id)} disabled={deleting === item.id}>
                    {deleting === item.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} className="text-destructive" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Name *</Label>
              <Input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Client name" />
            </div>
            <div className="grid gap-2">
              <Label>Role</Label>
              <Input value={form.role} onChange={e => setForm(f => ({...f, role: e.target.value}))} placeholder="e.g. CEO" />
            </div>
            <div className="grid gap-2">
              <Label>Organization</Label>
              <Input value={form.organization} onChange={e => setForm(f => ({...f, organization: e.target.value}))} placeholder="Company name" />
            </div>
            <div className="grid gap-2">
              <Label>Quote *</Label>
              <Textarea value={form.quote} onChange={e => setForm(f => ({...f, quote: e.target.value}))} placeholder="What the client said..." rows={4} />
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

export default TestimonialsManager;
