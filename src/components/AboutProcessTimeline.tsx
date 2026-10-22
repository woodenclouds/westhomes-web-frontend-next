"use client";

import Image from "next/image";
import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

interface StepData {
  title: string;
  description: string;
}

interface StepConfig {
  defaultImage: string;
  imageAlt: string;
  thumbnails: {
    src: string;
    alt: string;
  }[];
}

interface AboutProcessTimelineProps {
  eyebrow?: string;
  title: string;
  intro: string;
  steps: StepData[];
  craftImageUrl: string;
}

export function AboutProcessTimeline({
  eyebrow = "How we work",
  title,
  intro,
  steps,
  craftImageUrl,
}: AboutProcessTimelineProps) {
  // Step configs providing main hero image + 3 matching thumbnails per step
  const stepConfigs: StepConfig[] = [
    {
      defaultImage: craftImageUrl || "/images/showroom-white-set.jpg",
      imageAlt: "West Home showroom interior with sofa and marble coffee table",
      thumbnails: [
        {
          src: craftImageUrl || "/images/showroom-white-set.jpg",
          alt: "Showroom floor layout",
        },
        {
          src: "/images/showroom-brand-wall.jpg",
          alt: "West Home entrance and brand wall",
        },
        {
          src: "/images/showroom-boucle-sectional.jpg",
          alt: "Curated bouclé sofa setting in showroom",
        },
      ],
    },
    {
      defaultImage: "/images/sofa-custom-swatches.jpg",
      imageAlt: "Custom fabric swatches and tailored upholstery finishes",
      thumbnails: [
        {
          src: "/images/sofa-custom-swatches.jpg",
          alt: "Fabric swatches selection",
        },
        {
          src: "/images/sofa-beige-custom.jpg",
          alt: "Customised beige sofa piece",
        },
        {
          src: "/images/bedroom-taupe.jpg",
          alt: "Custom taupe channelled bed",
        },
      ],
    },
    {
      defaultImage: "/images/living-beige-sectional.jpg",
      imageAlt: "Finished luxury living room setup delivered and styled",
      thumbnails: [
        {
          src: "/images/living-beige-sectional.jpg",
          alt: "Delivered living room sectional",
        },
        {
          src: "/images/dining-marble.jpg",
          alt: "Marble dining room setup",
        },
        {
          src: "/images/coffee-round-wood.jpg",
          alt: "Finished oak coffee table in styled room",
        },
      ],
    },
  ];

  // Track active image per step (allows user to click thumbnails to swap main preview)
  const [activeImages, setActiveImages] = useState<Record<number, string>>({
    0: stepConfigs[0].defaultImage,
    1: stepConfigs[1].defaultImage,
    2: stepConfigs[2].defaultImage,
  });

  const handleSelectThumbnail = (stepIndex: number, src: string) => {
    setActiveImages((prev) => ({ ...prev, [stepIndex]: src }));
  };

  return (
    <div className="mt-12 border-t border-border pt-12 md:mt-16 md:pt-16">
      {/* Section Header */}
      <ScrollReveal className="mx-auto max-w-3xl text-center">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="mt-3 font-display text-3xl text-charcoal md:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-muted leading-relaxed">{intro}</p>
      </ScrollReveal>

      {/* Timeline Cards Container */}
      <div className="mt-12 md:mt-16 flex flex-col">
        {steps.map((step, i) => {
          const config = stepConfigs[i] || stepConfigs[0];
          const currentMainImg = activeImages[i] || config.defaultImage;
          const isLast = i === steps.length - 1;
          const stepNumber = String(i + 1).padStart(2, "0");

          return (
            <ScrollReveal
              key={step.title}
              delay={i * 90}
              className="group relative"
            >
              {/* Desktop & Tablet: 3-column timeline layout (Image | Line & Dot | Content) */}
              <div className="hidden md:grid md:grid-cols-[0.85fr_2.5rem_1.15fr] lg:grid-cols-[0.8fr_3.5rem_1.2fr] md:gap-8 lg:gap-12 items-stretch">
                {/* Left: Large Rounded Image (slightly reduced size + vertical spacing) */}
                <div
                  className={`self-start ${
                    !isLast ? "pb-10 md:pb-14 lg:pb-16" : "pb-6 md:pb-10"
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full max-w-[450px] lg:max-w-[470px] overflow-hidden rounded-2xl bg-stone-deep shadow-sm transition-all duration-500 group-hover:shadow-md border border-border/40">
                    <Image
                      key={currentMainImg}
                      src={currentMainImg}
                      alt={config.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 40vw, 470px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Center: Vertical Timeline Track with Node */}
                <div className="flex h-full flex-col items-center self-stretch">
                  {/* Circular Node */}
                  <div className="relative flex h-5 w-5 items-center justify-center">
                    <span className="h-3.5 w-3.5 rounded-full border-[1.5px] border-charcoal/80 bg-white transition-all duration-300 group-hover:scale-125 group-hover:border-wood shadow-xs" />
                    <span className="absolute h-1.5 w-1.5 rounded-full bg-wood opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Vertical connecting line */}
                  {!isLast ? (
                    <div className="w-[1px] flex-1 bg-border/80 my-2 transition-colors duration-300 group-hover:bg-wood/40" />
                  ) : (
                    <div className="w-[1px] flex-1 bg-gradient-to-b from-border/80 to-transparent my-2" />
                  )}
                </div>

                {/* Right: Content & Thumbnail Gallery */}
                <div
                  className={`flex flex-col self-start ${
                    !isLast ? "pb-10 md:pb-14 lg:pb-16" : "pb-6 md:pb-10"
                  }`}
                >
                  {/* Step Badge */}
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full border border-charcoal/60 bg-transparent" />
                    <span className="font-display text-xs font-semibold tracking-[0.14em] text-charcoal/80 uppercase">
                      {stepNumber}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-2.5 font-display text-2xl text-charcoal md:text-[1.65rem] leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-muted leading-relaxed text-[0.95rem]">
                    {step.description}
                  </p>

                  {/* 3 Thumbnails row (hover or click to swap main image) */}
                  <div className="mt-6 flex flex-col gap-2">
                    <div className="grid grid-cols-3 gap-3 max-w-[320px]">
                      {config.thumbnails.map((thumb) => {
                        const isSelected = currentMainImg === thumb.src;
                        return (
                          <button
                            key={thumb.src}
                            type="button"
                            onClick={() => handleSelectThumbnail(i, thumb.src)}
                            onMouseEnter={() => handleSelectThumbnail(i, thumb.src)}
                            className={`group/thumb relative aspect-square w-full overflow-hidden rounded-xl bg-stone-deep border transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "border-wood ring-2 ring-wood/30 scale-[1.02]"
                                : "border-border/70 hover:border-charcoal/40 hover:scale-[1.03]"
                            }`}
                            aria-label={`View ${thumb.alt}`}
                          >
                            <Image
                              src={thumb.src}
                              alt={thumb.alt}
                              fill
                              className="object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                              sizes="100px"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile View: Vertical stacked with subtle connecting bar */}
              <div
                className={`flex flex-col md:hidden ${
                  !isLast ? "pb-16" : "pb-6"
                }`}
              >
                {/* Step badge */}
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full border border-charcoal/60 bg-transparent" />
                  <span className="font-display text-xs font-semibold tracking-[0.14em] text-charcoal/80 uppercase">
                    {stepNumber}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-2 font-display text-2xl text-charcoal">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {step.description}
                </p>

                {/* Main Image */}
                <div className="mt-4 relative aspect-[4/3] w-full max-w-[420px] overflow-hidden rounded-2xl bg-stone-deep shadow-sm border border-border/40">
                  <Image
                    key={currentMainImg}
                    src={currentMainImg}
                    alt={config.imageAlt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>

                {/* Thumbnails row */}
                <div className="mt-3 grid grid-cols-3 gap-2.5 max-w-[280px]">
                  {config.thumbnails.map((thumb) => {
                    const isSelected = currentMainImg === thumb.src;
                    return (
                      <button
                        key={thumb.src}
                        type="button"
                        onClick={() => handleSelectThumbnail(i, thumb.src)}
                        className={`relative aspect-square overflow-hidden rounded-lg border transition ${
                          isSelected
                            ? "border-wood ring-2 ring-wood/30"
                            : "border-border/70 hover:border-charcoal/40"
                        }`}
                        aria-label={`View ${thumb.alt}`}
                      >
                        <Image
                          src={thumb.src}
                          alt={thumb.alt}
                          fill
                          className="object-cover"
                          sizes="90px"
                        />
                      </button>
                    );
                  })}
                </div>

                {!isLast ? (
                  <div className="mt-8 border-b border-border/70" />
                ) : null}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
