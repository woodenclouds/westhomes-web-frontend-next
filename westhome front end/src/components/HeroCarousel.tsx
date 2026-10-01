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
  const [ready, setReady] = useState(false);
  const count = slides.length;

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || count <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 5500);
    return () => window.clearInterval(id);
  }, [count, ready]);

  function go(next: number) {
    setIndex((next + count) % count);
  }

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal text-stone">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`hero-slide absolute inset-0 transition-opacity duration-1000 ease-out ${
            i === index ? "is-active opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/92 via-charcoal/68 to-charcoal/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/15 to-charcoal/30" />
      <div className="absolute inset-y-0 left-0 w-full max-w-3xl bg-gradient-to-r from-charcoal/45 to-transparent md:max-w-4xl" />

      <div className="container-page relative flex min-h-[100svh] flex-col justify-end pb-14 pt-28 md:justify-center md:pb-20 md:pt-32">
        <div className={ready ? "hero-copy is-ready" : "hero-copy"}>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-stone/85">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[2.15rem] leading-[1.08] text-stone sm:text-4xl md:text-5xl lg:text-[3.75rem]">
            {headline}
          </h1>
          <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-stone/90 md:text-base">
            {support}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/products" size="lg">
              Explore collection
            </ButtonLink>
            <ButtonLink
              href="/enquire"
              size="lg"
              variant="wood-outline"
              className="!border-stone/55 !text-stone hover:!bg-stone hover:!text-charcoal"
            >
              Enquire now
            </ButtonLink>
          </div>

          {count > 1 ? (
            <div className="mt-12 flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="flex h-6 w-6 items-center justify-center text-stone/70 transition hover:text-stone"
                aria-label="Previous slide"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M7.5 2.5 4 6l3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === index
                        ? "w-9 bg-wood-soft"
                        : "w-2.5 bg-white/40 hover:bg-white/65"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(index + 1)}
                className="flex h-6 w-6 items-center justify-center text-stone/70 transition hover:text-stone"
                aria-label="Next slide"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M4.5 2.5 8 6l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
