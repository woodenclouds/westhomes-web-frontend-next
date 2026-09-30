"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryItem } from "@/lib/cms/types";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-sm bg-stone-deep text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood"
          >
            <Image
              src={item.imageUrl}
              alt={item.alt}
              width={900}
              height={1100}
              className="h-auto w-full object-cover transition duration-500 hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <span className="sr-only">Open {item.title}</span>
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setActive(null);
          }}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-sm bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20"
            onClick={() => setActive(null)}
          >
            Close
          </button>
          <div
            className="relative max-h-[90vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.imageUrl}
              alt={active.alt}
              width={1600}
              height={1200}
              className="max-h-[80vh] w-full object-contain"
              sizes="100vw"
              priority
            />
            <p className="mt-3 text-center text-sm text-stone/80">
              {active.title}
              {active.category ? ` · ${active.category}` : ""}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
