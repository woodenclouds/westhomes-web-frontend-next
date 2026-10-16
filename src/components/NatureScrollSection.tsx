"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ButtonLink } from "./ui/Button";

interface NatureScrollSectionProps {
  eyebrow?: string;
  title: string;
  body: string;
  ctaText?: string;
  ctaHref?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export function NatureScrollSection({
  eyebrow = "The house",
  title,
  body,
  ctaText = "Our story",
  ctaHref = "/about",
  imageUrl = "/nature-chair-sunrise-4k.png",
  imageAlt = "Where nature inspires every crafted piece — West Home Furniture",
}: NatureScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If the user prefers reduced motion, keep static
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let ticking = false;

    const updateScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollable = rect.height - windowH;

      if (totalScrollable <= 0) return;

      // Progress from 0 (section top hits viewport top) to 1 (track scrolled to end)
      const currentScroll = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollable));

      // Content fade out and translation:
      // Fades out and glides up smoothly across the first 45% of scroll distance
      const textProgress = Math.min(1, progress / 0.45);
      const opacity = Math.max(0, 1 - textProgress);
      const translateY = textProgress * -90; // translate up by 90px

      if (contentRef.current) {
        contentRef.current.style.opacity = `${opacity.toFixed(3)}`;
        contentRef.current.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
        contentRef.current.style.pointerEvents = opacity < 0.05 ? "none" : "auto";
      }

      // Parallax & subtle expansion on the background image
      if (imageRef.current) {
        const scale = 1 + progress * 0.04;
        const imgTranslateY = progress * -25;
        imageRef.current.style.transform = `translate3d(0, ${imgTranslateY.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[175vh] sm:h-[190vh] md:h-[200vh] bg-background"
      aria-label={title}
    >
      {/* Sticky Fullscreen Frame */}
      <div className="sticky top-0 z-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between">
        {/* Full-bleed background image filling entire viewport */}
        <div
          ref={imageRef}
          className="absolute inset-0 h-full w-full will-change-transform"
          style={{ transformOrigin: "center bottom" }}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            unoptimized
            className="object-cover object-bottom"
            sizes="100vw"
          />

          {/* Gentle top fade to ensure seamless blend with preceding TickerBanner / background */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background via-background/40 to-transparent"
            aria-hidden="true"
          />
        </div>

        {/* Scrollable / Floating Content Layer */}
        <div
          ref={contentRef}
          className="relative z-10 mx-auto w-full max-w-4xl px-4 pt-24 sm:pt-32 md:pt-40 text-center will-change-transform will-change-opacity"
        >
          {eyebrow ? (
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-wood sm:text-[0.75rem]">
              {eyebrow}
            </p>
          ) : null}

          <h2 className="mt-3 font-display text-[2.25rem] leading-[1.08] text-charcoal sm:mt-4 sm:text-4xl md:text-5xl lg:text-[3.75rem] tracking-tight capitalize">
            {title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-muted sm:mt-5 sm:text-base md:text-[1.05rem]">
            {body}
          </p>

          {ctaText && ctaHref ? (
            <div className="mt-7 flex justify-center sm:mt-8">
              <ButtonLink href={ctaHref} variant="primary">
                {ctaText}
              </ButtonLink>
            </div>
          ) : null}
        </div>

        {/* Bottom spacer to keep the layout balanced */}
        <div className="relative z-10 pb-8 pointer-events-none" />
      </div>
    </section>
  );
}
