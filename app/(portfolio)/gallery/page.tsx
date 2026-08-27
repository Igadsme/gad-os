import Image from "next/image";
import { gallery, galleryCategories, type GalleryCategory } from "@/data/gallery";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const metadata = { title: "Gallery" };

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const category = (galleryCategories.includes(tag as GalleryCategory)
    ? tag
    : "All") as GalleryCategory;
  const visible =
    category === "All" ? gallery : gallery.filter((item) => item.category === category);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <h1 className="serif-title text-4xl">Life Outside Code</h1>
        <p className="mt-2 text-muted">
          Original photos — campus, cars, and the road.
        </p>
      </header>
      <div className="flex flex-wrap gap-2">
        {galleryCategories.map((item) => (
          <Link
            key={item}
            href={item === "All" ? "/gallery" : `/gallery?tag=${item}`}
            className={cn(
              "rounded-full border border-border px-3 py-1.5 text-sm text-muted",
              category === item && "border-primary/30 bg-primary text-white",
            )}
          >
            {item}
          </Link>
        ))}
      </div>
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
        {visible.map((item) => (
          <Card key={item.id} className="mb-4 break-inside-avoid overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 30vw, 50vw"
              />
            </div>
            <div className="p-4">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted">
                {item.location} · {item.category}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
