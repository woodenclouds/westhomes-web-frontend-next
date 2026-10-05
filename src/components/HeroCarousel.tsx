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
          key={`${slide.src}-${i}`}
          className={`hero-slide absolute inset-0 transition-opacity duration-1000 ease-out ${
            i === index ? "is-active opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i < 2}
            className="object-cover object-[center_40%] sm:object-center"
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/94 via-charcoal/72 to-charcoal/30 sm:from-charcoal/92 sm:via-charcoal/68" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/25 to-charcoal/35 sm:from-charcoal/60 sm:via-charcoal/15" />
      <div className="absolute inset-y-0 left-0 w-full max-w-3xl bg-gradient-to-r from-charcoal/50 to-transparent md:max-w-4xl" />

      <div className="container-page relative flex min-h-[100svh] flex-col justify-end pb-[max(3.5rem,env(safe-area-inset-bottom))] pt-28 sm:pb-16 md:justify-center md:pb-20 md:pt-32">
        <div className={`max-w-2xl ${ready ? "hero-copy is-ready" : "hero-copy"}`}>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-stone/85 sm:text-[0.7rem]">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-[2rem] leading-[1.08] text-stone sm:mt-4 sm:text-4xl md:text-5xl lg:text-[3.75rem]">
            {headline}
          </h1>
          <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-stone/90 sm:mt-5 md:text-base">
            {support}
          </p>
          <div className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap">
            <ButtonLink href="/products" size="lg" className="w-full sm:w-auto">
              Explore collection
            </ButtonLink>
            <ButtonLink
              href="/enquire"
              size="lg"
              variant="wood-outline"
              className="w-full !border-stone/55 !text-stone hover:!bg-stone hover:!text-charcoal sm:w-auto"
            >
              Enquire now
            </ButtonLink>
          </div>

          {count > 1 ? (
            <div className="mt-10 flex items-center gap-2 sm:mt-12 sm:gap-3">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="tap-target flex items-center justify-center text-stone/70 transition hover:text-stone"
                aria-label="Previous slide"
              >
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
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
                    key={`${slide.src}-dot-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Show slide ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all duration-500 sm:h-1.5 ${
                      i === index
                        ? "w-8 bg-wood-soft sm:w-9"
                        : "w-2.5 bg-white/40 hover:bg-white/65"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(index + 1)}
                className="tap-target flex items-center justify-center text-stone/70 transition hover:text-stone"
                aria-label="Next slide"
              >
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
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
