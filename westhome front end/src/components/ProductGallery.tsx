"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  name,
  images,
}: {
  name: string;
  images: string[];
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!current) return null;

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-stone-deep">
        <Image
          src={current}
          alt={`${name} — image ${active + 1}`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 55vw"
        />
      </div>
      {images.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-sm border-2 ${
                i === active ? "border-wood" : "border-transparent"
              }`}
              aria-label={`Show image ${i + 1}`}
              aria-pressed={i === active}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
