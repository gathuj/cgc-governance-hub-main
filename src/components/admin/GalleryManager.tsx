import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2, Loader2, Upload, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminGalleryApi } from "@/services/adminApi";
import type { AdminGalleryItem } from "@/types/admin";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const GalleryManager = () => {
  const [items, setItems] = useState<AdminGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await adminGalleryApi.getAll();
      setItems(data);
    } catch {
      toast({ title: "Error loading gallery", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      toast({ title: "File and title are required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      await adminGalleryApi.upload(file, title, description);
      toast({ title: "Image uploaded" });
      setDialogOpen(false);
      setFile(null); setTitle(""); setDescription("");
      fetchItems();
    } catch {
      toast({ title: "Upload failed", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeleting(id);
    try {
      await adminGalleryApi.delete(id);
      toast({ title: "Image deleted" });
      fetchItems();
    } catch {
      toast({ title: "Failed to delete", variant: "destructive" });
    } finally {
      setDeleting(null);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      if (!title) setTitle(droppedFile.name.replace(/\.[^/.]+$/, ""));
    }
  }, [title]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gallery</h2>
          <p className="text-sm text-muted-foreground">Manage your gallery images.</p>
        </div>
        <Button onClick={() => { setFile(null); setTitle(""); setDescription(""); setDialogOpen(true); }}>
          <Plus size={16} className="mr-1" /> Upload Image
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="aspect-square rounded-lg" />)}
        </div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="text-center py-16 text-muted-foreground">
            <ImageIcon size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium mb-1">No gallery images</p>
            <p className="text-sm">Upload your first image to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <Card key={item.id} className="group overflow-hidden">
              <div className="aspect-square relative bg-muted">
                <img
                  src={`${BASE_URL}/uploads/${item.filename}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                  <Button
                    variant="destructive" size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => item.id && handleDelete(item.id)}
                    disabled={deleting === item.id}
                  >
                    {deleting === item.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="font-medium text-sm truncate">{item.title}</p>
                {item.description && <p className="text-xs text-muted-foreground truncate mt-0.5">{item.description}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
              onDragOver={e => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("gallery-file-input")?.click()}
            >
              {file ? (
                <div className="space-y-2">
                  <img src={URL.createObjectURL(file)} alt="Preview" className="max-h-32 mx-auto rounded" />
                  <p className="text-sm text-muted-foreground">{file.name}</p>
                </div>
              ) : (
                <>
                  <Upload size={32} className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Drag & drop an image or click to browse</p>
                </>
              )}
              <input
                id="gallery-file-input"
                type="file" accept="image/*" className="hidden"
                onChange={e => {
                  const f = e.target.files?.[0];
                  if (f) { setFile(f); if (!title) setTitle(f.name.replace(/\.[^/.]+$/, "")); }
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label>Title *</Label>
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Image title" />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Optional description" rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpload} disabled={saving}>
              {saving ? <><Loader2 size={14} className="mr-1 animate-spin" /> Uploading...</> : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryManager;
