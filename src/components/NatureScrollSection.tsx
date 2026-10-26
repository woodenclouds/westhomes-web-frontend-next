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
  eyebrow,
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const desktopMq = window.matchMedia("(min-width: 768px)");
    let ticking = false;

    const resetMobileStyles = () => {
      if (contentRef.current) {
        contentRef.current.style.opacity = "";
        contentRef.current.style.transform = "";
        contentRef.current.style.pointerEvents = "";
      }
      if (imageRef.current) {
        imageRef.current.style.transform = "";
      }
    };

    const updateScroll = () => {
      // Mobile: section scrolls away as a normal block — no sticky pin effect
      if (!desktopMq.matches) {
        resetMobileStyles();
        ticking = false;
        return;
      }

      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollable = rect.height - windowH;

      if (totalScrollable <= 0) return;

      const currentScroll = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollable));

      const textProgress = Math.min(1, progress / 0.45);
      const opacity = Math.max(0, 1 - textProgress);
      const translateY = textProgress * -90;

      if (contentRef.current) {
        contentRef.current.style.opacity = `${opacity.toFixed(3)}`;
        contentRef.current.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
        contentRef.current.style.pointerEvents =
          opacity < 0.05 ? "none" : "auto";
      }

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
    desktopMq.addEventListener("change", onScroll);
    updateScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      desktopMq.removeEventListener("change", onScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-background md:h-[200vh]"
      aria-label={title}
    >
      {/* Mobile: normal block that scrolls away. md+: sticky pin track */}
      <div className="relative z-0 flex min-h-[100svh] w-full flex-col justify-between overflow-hidden md:sticky md:top-0 md:h-[100svh]">
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

          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background via-background/40 to-transparent"
            aria-hidden="true"
          />
        </div>

        <div
          ref={contentRef}
          className="relative z-10 mx-auto w-full max-w-4xl px-4 pt-24 text-center will-change-transform will-change-opacity sm:pt-32 md:pt-40"
        >
          {eyebrow ? (
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-wood sm:text-[0.75rem]">
              {eyebrow}
            </p>
          ) : null}

          <h2
            className={`font-display text-[2.25rem] leading-[1.08] tracking-tight text-charcoal capitalize sm:text-4xl md:text-5xl lg:text-[3.75rem] ${eyebrow ? "mt-3 sm:mt-4" : ""}`}
          >
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

        <div className="relative z-10 pointer-events-none pb-8" />
      </div>
    </section>
  );
}
