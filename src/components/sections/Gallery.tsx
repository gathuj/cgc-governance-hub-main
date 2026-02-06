import { useCallback } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useCSVData } from "@/hooks/useCSVData";
import { Skeleton } from "@/components/ui/skeleton";

// Import gallery images
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

// Map filenames to imported images
const imageMap: Record<string, string> = {
  "gallery-1.jpg": gallery1,
  "gallery-2.jpg": gallery2,
  "gallery-3.jpg": gallery3,
  "gallery-4.jpg": gallery4,
  "gallery-5.jpg": gallery5,
  "gallery-6.jpg": gallery6,
};

interface GalleryImage {
  id: string;
  filename: string;
  src: string;
  title: string;
  description: string;
}

const GalleryItem = ({ image }: { image: GalleryImage }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group cursor-pointer overflow-hidden rounded-lg bg-muted">
          <AspectRatio ratio={4 / 3}>
            <div className="relative w-full h-full">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-end">
                <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-primary-foreground font-medium text-sm">
                    {image.title}
                  </p>
                </div>
              </div>
            </div>
          </AspectRatio>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="relative">
          <img
            src={image.src}
            alt={image.title}
            className="w-full object-contain max-h-[80vh]"
          />
          <div className="p-4 bg-background">
            <p className="font-bold text-lg">{image.title}</p>
            <p className="text-muted-foreground text-sm mt-1">{image.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Gallery = () => {
  const parseGallery = useCallback((rows: string[][]): GalleryImage[] => {
    return rows.map((row, index) => {
      const filename = row[0] || "";
      return {
        id: String(index + 1),
        filename,
        src: imageMap[filename] || "",
        title: row[1] || "",
        description: row[2] || "",
      };
    }).filter(img => img.src); // Only show images that exist
  }, []);

  const { data: galleryImages, loading, error } = useCSVData<GalleryImage>(
    "/data/gallery.csv",
    parseGallery
  );

  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="container-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            Our Moments
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Gallery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Highlights from our training sessions, workshops, conferences, and events.
          </p>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="aspect-[4/3] rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-muted-foreground">Unable to load gallery images.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <GalleryItem key={image.id} image={image} />
            ))}
          </div>
        )}

        {/* CSV Format Guide */}
        <div className="mt-12 p-6 bg-secondary rounded-lg border border-border">
          <h3 className="font-bold text-foreground mb-3">Gallery File Format</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Upload your gallery info to <code className="bg-muted px-2 py-1 rounded">public/data/gallery.csv</code> in the following format:
          </p>
          <code className="block text-xs bg-muted p-3 rounded overflow-x-auto">
            Filename,Title,Description<br/>
            gallery-1.jpg,Corporate Governance Training Workshop 2025,Directors and executives participating in our flagship training
          </code>
          <p className="text-xs text-muted-foreground mt-2">
            <strong>Note:</strong> Place your images in <code className="bg-muted px-1 rounded">src/assets/</code> with filenames like gallery-1.jpg, gallery-2.jpg, etc.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
