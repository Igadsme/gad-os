"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { gallery, galleryCategories, type GalleryCategory } from "@/data/gallery";
import { Card } from "@/components/ui/card";
import { FilterPills } from "@/components/ui/filter-pills";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

export function GalleryExplorer({
  initialCategory,
}: {
  initialCategory: GalleryCategory;
}) {
  const [category, setCategory] = useState<GalleryCategory>(initialCategory);
  const visible =
    category === "All" ? gallery : gallery.filter((item) => item.category === category);
  const [openId, setOpenId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  const openIndex = visible.findIndex((item) => item.id === openId);
  const openItem = openIndex >= 0 ? visible[openIndex] : null;

  function closeLightbox() {
    setOpenId(null);
  }

  function showNext() {
    if (visible.length === 0) return;
    const index = openIndex < 0 ? 0 : (openIndex + 1) % visible.length;
    setOpenId(visible[index].id);
  }

  function showPrev() {
    if (visible.length === 0) return;
    const index = openIndex < 0 ? 0 : (openIndex - 1 + visible.length) % visible.length;
    setOpenId(visible[index].id);
  }

  useEffect(() => {
    if (!openItem) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenId(null);
        return;
      }
      if (visible.length === 0) return;
      if (event.key === "ArrowRight") {
        const index = openIndex < 0 ? 0 : (openIndex + 1) % visible.length;
        setOpenId(visible[index].id);
      }
      if (event.key === "ArrowLeft") {
        const index = openIndex < 0 ? 0 : (openIndex - 1 + visible.length) % visible.length;
        setOpenId(visible[index].id);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openItem, openIndex, visible]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <FilterPills
          items={galleryCategories}
          value={category}
          onChange={(value) => {
            setCategory(value as GalleryCategory);
            setOpenId(null);
          }}
        />
        <p className="text-xs text-muted">
          {visible.length} photograph{visible.length === 1 ? "" : "s"}
        </p>
      </div>
      {visible.length === 0 ? (
        <EmptyState title="No photographs in this filter." />
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
          {visible.map((item, index) => (
            <Card
              key={item.id}
              hoverable
              className="mb-4 break-inside-avoid overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenId(item.id)}
                className="group relative block w-full text-left"
              >
                <div className="relative aspect-[4/3]">
                  {!loaded[item.id] ? (
                    <Skeleton className="absolute inset-0 rounded-none" />
                  ) : null}
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    loading={index < 3 ? "eager" : "lazy"}
                    className="object-cover"
                    sizes="(min-width: 1280px) 30vw, 50vw"
                    onLoad={() =>
                      setLoaded((current) => ({ ...current, [item.id]: true }))
                    }
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    {item.location ? (
                      <p className="text-xs text-white/80">{item.location}</p>
                    ) : null}
                  </div>
                </div>
              </button>
              <div className="px-4 py-3">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted">
                  {[item.location, item.category].filter(Boolean).join(" · ")}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {openItem ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={openItem.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
            className="absolute left-3 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white"
            aria-label="Previous photograph"
          >
            ‹
          </button>
          <figure
            className="relative max-h-[80vh] w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={openItem.src}
                alt={openItem.alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
            <figcaption className="mt-3 text-center text-sm text-white">
              {openItem.title}
              {openItem.location ? ` · ${openItem.location}` : ""}
              {` · ${openIndex + 1} of ${visible.length}`}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-3 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white"
            aria-label="Next photograph"
          >
            ›
          </button>
        </div>
      ) : null}
    </div>
  );
}
