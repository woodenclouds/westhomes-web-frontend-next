"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useState } from "react";
import type { GalleryItem } from "@/lib/cms/types";
import { Pagination } from "./Pagination";

const PAGE_SIZE = 9;

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [page, setPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = items.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const active = activeIndex !== null ? items[activeIndex] : null;

  const goToPage = (next: number) => {
    setPage(Math.min(Math.max(1, next), totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showPrev = () => {
    if (activeIndex === null || items.length === 0) return;
    setActiveIndex((activeIndex - 1 + items.length) % items.length);
  };

  const showNext = () => {
    if (activeIndex === null || items.length === 0) return;
    setActiveIndex((activeIndex + 1) % items.length);
  };

  const onLightboxKey = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === "Escape") setActiveIndex(null);
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onLightboxKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onLightboxKey);
    };
  }, [activeIndex, onLightboxKey]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {pageItems.map((item, i) => {
          const globalIndex = (currentPage - 1) * PAGE_SIZE + i;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(globalIndex)}
              className="frame-image relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-stone-deep text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood"
            >
              <Image
                src={item.imageUrl}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
              <span className="sr-only">Open {item.title}</span>
            </button>
          );
        })}
      </div>

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        totalItems={items.length}
        itemLabel="photos"
        onPageChange={goToPage}
        label="Gallery pagination"
      />

      {active && activeIndex !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-3 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-10 min-h-11 rounded-sm bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20 sm:right-4 sm:top-4"
            onClick={() => setActiveIndex(null)}
          >
            Close
          </button>

          {items.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-sm bg-white/10 text-white transition hover:bg-white/20 sm:left-6 sm:h-11 sm:w-11"
              >
                <Chevron direction="left" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-sm bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:h-11 sm:w-11"
              >
                <Chevron direction="right" />
              </button>
            </>
          ) : null}

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
            <div className="mt-3 flex flex-col items-center gap-1 text-center sm:flex-row sm:justify-center sm:gap-3">
              <p className="text-sm text-stone/80">
                {active.title}
                {active.category ? ` · ${active.category}` : ""}
              </p>
              {items.length > 1 ? (
                <p className="text-xs uppercase tracking-[0.12em] text-stone/50">
                  {activeIndex + 1} / {items.length}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={
          direction === "left"
            ? "M12.5 4.5 7 10l5.5 5.5"
            : "M7.5 4.5 13 10l-5.5 5.5"
        }
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
