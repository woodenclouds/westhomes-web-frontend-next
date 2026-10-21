import Image from "next/image";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cms } from "@/lib/cms/client";
import { AboutProcessTimeline } from "@/components/AboutProcessTimeline";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "West Home Furniture Dubai offers stylish and comfortable furniture for modern homes. Visit our Al Barsha showroom — we customise sofas, beds, club chairs and more.",
};

export default async function AboutPage() {
  const about = await cms.getAboutContent();

  return (
    <>
      {/* Editorial 3-Image Hero Section (matching Ecomuz reference) */}
      <section className="pt-28 pb-12 sm:pt-32 md:pt-36 md:pb-16">
        <div className="container-page">
          {/* Centered Hero Header */}
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="eyebrow">Our story</p>
            <h1 className="mt-3 font-display text-4xl text-charcoal sm:text-5xl md:text-6xl lg:text-[4.25rem] tracking-tight">
              {about.title}
            </h1>
          </ScrollReveal>

          {/* 3 Images Gallery */}
          <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            {/* Left Image: Armchair piece */}
            <ScrollReveal delay={0} className="relative h-[340px] sm:h-[400px] md:h-[460px] lg:h-[520px] overflow-hidden rounded-2xl md:rounded-3xl bg-stone-deep shadow-sm group">
              <Image
                src="/images/armchair-ottoman.jpg"
                alt="West Home luxury armchair"
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-charcoal/5 pointer-events-none" />
            </ScrollReveal>

            {/* Center Image: Main showroom / living space */}
            <ScrollReveal delay={90} className="relative h-[340px] sm:h-[400px] md:h-[460px] lg:h-[520px] overflow-hidden rounded-2xl md:rounded-3xl bg-stone-deep shadow-sm group">
              <Image
                src={about.imageUrl || "/images/showroom-boucle-sectional.jpg"}
                alt="West Home living room and sofa design"
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-charcoal/5 pointer-events-none" />
            </ScrollReveal>

            {/* Right Image: Dining / bedroom piece */}
            <ScrollReveal delay={180} className="relative h-[340px] sm:h-[400px] md:h-[460px] lg:h-[520px] overflow-hidden rounded-2xl md:rounded-3xl bg-stone-deep shadow-sm group">
              <Image
                src="/images/dining-marble.jpg"
                alt="West Home dining room setting"
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-charcoal/5 pointer-events-none" />
            </ScrollReveal>
          </div>

          {/* Statement & Narrative Section (matching Ecomuz reference) */}
          <div className="mt-16 md:mt-24 max-w-4xl mx-auto text-center">
            {/* Pill Tag (Our Mission ○ Our Vision style) */}
            <ScrollReveal className="inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-white/80 px-4 py-1.5 shadow-2xs backdrop-blur-xs">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-wood">
                Our Story
              </span>
              <span className="h-1.5 w-1.5 rounded-full border border-charcoal/60" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/80">
                Showroom & Custom
              </span>
            </ScrollReveal>

            {/* Mission Statement Text (Large, inspiring) */}
            <ScrollReveal delay={80}>
              <p className="mt-6 font-display text-2xl leading-snug text-charcoal sm:text-3xl md:text-4xl md:leading-[1.28]">
                {about.intro}
              </p>
            </ScrollReveal>

            {/* Quote */}
            {about.quote ? (
              <ScrollReveal delay={120}>
                <blockquote className="mt-6 border-y border-border/70 py-4 max-w-2xl mx-auto">
                  <p className="font-display text-lg italic text-wood md:text-xl">
                    “{about.quote}”
                  </p>
                </blockquote>
              </ScrollReveal>
            ) : null}

            {/* Body paragraph */}
            <ScrollReveal delay={150}>
              <p className="mt-6 text-muted leading-relaxed text-[0.95rem] md:text-base max-w-3xl mx-auto">
                {about.body}
              </p>
            </ScrollReveal>

            {/* Actions: Enquire now / Visit showroom (matching Get In Touch) */}
            <ScrollReveal delay={200} className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <ButtonLink href="/enquire" size="lg">
                Enquire now
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="wood-outline">
                Visit showroom
              </ButtonLink>
            </ScrollReveal>
          </div>

          {/* Showroom Info Banner */}
          <ScrollReveal delay={100} className="mt-14 rounded-2xl border border-border/80 bg-surface p-6 sm:p-8 md:mt-20">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="eyebrow">Showroom</p>
                <h3 className="mt-1.5 font-display text-2xl text-charcoal md:text-[1.65rem]">
                  {about.showroomTitle || "Al Barsha, Hessa Street"}
                </h3>
                <p className="mt-1 text-sm font-medium text-wood">
                  {about.showroomHours || "Open daily, 9:00 AM – 9:00 PM"}
                </p>
                <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted">
                  {about.showroomText ||
                    "Come sit with the pieces, browse fabrics and plan your rooms with our team."}
                </p>
              </div>
              <div className="shrink-0">
                <ButtonLink href="/contact" variant="wood-outline" size="md">
                  Visit us
                </ButtonLink>
              </div>
            </div>
          </ScrollReveal>

          <AboutProcessTimeline
            eyebrow="How we work"
            title={about.processTitle || "From showroom to your rooms"}
            intro={
              about.processIntro ||
              "Choose ready pieces from the showroom, or customise sofas, beds, club chairs and more — we guide you through fabric, size and layout so the furniture fits your home."
            }
            steps={about.process}
            craftImageUrl={about.craftImageUrl}
          />

          <ScrollReveal className="mt-10 border-t border-border pt-8 md:mt-12">
            <p className="eyebrow">Our collection</p>
            <h2 className="mt-3 font-display text-3xl text-charcoal">
              {about.offeringsTitle || "What you will find"}
            </h2>
            <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
              {about.offerings.map((item) => (
                <li
                  key={item}
                  className="border-b border-border/80 py-3 text-charcoal"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink href="/products">Explore collection</ButtonLink>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-8 md:py-10">
        <div className="container-page">
          <ScrollReveal>
            <p className="eyebrow">What we stand for</p>
            <h2 className="mt-3 font-display text-3xl text-charcoal md:text-4xl capitalize">
              {about.valuesTitle || "Comfort And Elegance"}
            </h2>
          </ScrollReveal>
          <div className="mt-7 grid gap-8 md:grid-cols-3 md:gap-10">
            {about.values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 80}>
                <h3 className="font-display text-2xl text-charcoal">{value.title}</h3>
                <p className="mt-3 text-muted leading-relaxed">{value.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container-page flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl text-charcoal">
              Visit or enquire
            </h2>
            <p className="mt-2 text-muted">
              We would love to help you find the right pieces for your home.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/enquire">Enquire Now</ButtonLink>
            <ButtonLink href="/contact" variant="wood-outline">
              Contact
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
