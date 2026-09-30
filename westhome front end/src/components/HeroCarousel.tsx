"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ButtonLink } from "./ui/Button";

export type HeroSlide = {
  src: string;
  alt: string;
};

type Props = {
  slides: HeroSlide[];
  headline: string;
  support: string;
  eyebrow?: string;
};

export function HeroCarousel({
  slides,
  headline,
  support,
  eyebrow = "West Home Furniture",
}: Props) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  useEffect(() => {
    if (count <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 5500);
    return () => window.clearInterval(id);
  }, [count]);

  function go(next: number) {
    setIndex((next + count) % count);
  }

  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden bg-charcoal text-stone">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            className={`object-cover transition-transform duration-[6500ms] ease-out ${
              i === index ? "scale-105" : "scale-100"
            }`}
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-charcoal/25" />

      <div className="container-page relative flex min-h-[88vh] flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24 md:pt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone/70">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-stone sm:text-5xl md:text-6xl lg:text-7xl">
          {headline}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-stone/85 md:text-lg">
          {support}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/products" size="lg">
            Explore Products
          </ButtonLink>
          <ButtonLink
            href="/enquire"
            size="lg"
            variant="ghost"
            className="!text-stone hover:!bg-white/10"
          >
            Enquire Now
          </ButtonLink>
        </div>

        {count > 1 ? (
          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="rounded-sm border border-white/25 px-3 py-2 text-xs uppercase tracking-wider text-stone/90 hover:bg-white/10"
              aria-label="Previous slide"
            >
              Prev
            </button>
            <div className="flex gap-2" role="tablist" aria-label="Hero slides">
              {slides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index
                      ? "w-8 bg-wood-soft"
                      : "w-3 bg-white/35 hover:bg-white/55"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="rounded-sm border border-white/25 px-3 py-2 text-xs uppercase tracking-wider text-stone/90 hover:bg-white/10"
              aria-label="Next slide"
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
