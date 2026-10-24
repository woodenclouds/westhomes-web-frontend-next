import Image from "next/image";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cms } from "@/lib/cms/client";
import { AboutOfferings } from "@/components/AboutOfferings";
import { AboutProcessTimeline } from "@/components/AboutProcessTimeline";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "West Home Furniture Dubai offers stylish and comfortable furniture for modern homes. Visit our Al Barsha showroom — we customise sofas, beds, club chairs and more.",
};

function splitStatement(text: string): { lead: string; emphasis?: string } {
  const parts = text.split(/\s+[—–]\s+/);
  if (parts.length >= 2 && parts[0]?.trim() && parts[1]?.trim()) {
    return {
      lead: parts[0].trim(),
      emphasis: parts.slice(1).join(" — ").trim(),
    };
  }
  return { lead: text.trim() };
}

export default async function AboutPage() {
  const about = await cms.getAboutContent();
  const statement = splitStatement(about.intro);

  return (
    <>
      <section className="pt-28 pb-10 sm:pt-32 md:pt-36 md:pb-14">
        <div className="container-page">
          <div className="grid min-w-0 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-x-10 lg:gap-y-0">
            {/* Left narrative — Neutomni-style lead column */}
            <div className="min-w-0 lg:col-span-6 lg:pt-2">
              <ScrollReveal>
                <p className="eyebrow">Our story</p>
                <h1 className="mt-4 max-w-full font-display text-[2.15rem] leading-[1.12] tracking-tight text-balance text-charcoal sm:text-5xl md:text-[3.35rem] md:leading-[1.08]">
                  {statement.lead}
                  {statement.emphasis ? (
                    <>
                      {" — "}
                      <span className="italic text-wood">
                        {statement.emphasis}
                      </span>
                    </>
                  ) : null}
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={90}>
                <p className="mt-8 max-w-xl text-[0.98rem] leading-relaxed text-muted md:text-base">
                  {about.body}
                  <span className="mt-3 block italic text-charcoal/75">
                    One showroom → full rooms, made to fit.
                  </span>
                </p>
              </ScrollReveal>

              <ScrollReveal
                delay={140}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <ButtonLink href="/enquire" size="lg">
                  Enquire now
                </ButtonLink>
                <ButtonLink href="/contact" size="lg" variant="wood-outline">
                  Visit showroom
                </ButtonLink>
              </ScrollReveal>

              <ScrollReveal
                delay={180}
                className="mt-10 border-y border-border py-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                  <div className="min-w-0">
                    <p className="eyebrow">Showroom</p>
                    <h2 className="mt-2 font-display text-xl tracking-tight text-charcoal sm:text-2xl">
                      {about.showroomTitle || "Al Barsha, Hessa Street"}
                    </h2>
                    <p className="mt-1.5 text-sm font-medium text-wood">
                      {about.showroomHours || "Open daily, 9:00 AM – 9:00 PM"}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {about.showroomText ||
                        "Come sit with the pieces, browse fabrics and plan your rooms with our team."}
                    </p>
                  </div>
                  <ButtonLink
                    href="/contact"
                    variant="wood-outline"
                    size="md"
                    className="shrink-0 self-start sm:self-auto"
                  >
                    Visit us
                  </ButtonLink>
                </div>
              </ScrollReveal>
            </div>

            {/* Right visual — height matches left column on desktop */}
            <div className="min-w-0 lg:col-span-6 lg:flex lg:min-h-0 lg:flex-col lg:pt-2">
              <ScrollReveal delay={80} className="h-full min-h-0 w-full flex-1">
                <div className="relative aspect-[4/3] h-full min-h-[240px] w-full overflow-hidden rounded-[1.75rem] bg-stone-deep sm:aspect-[16/10] lg:aspect-auto lg:min-h-0">
                  <Image
                    src={
                      about.imageUrl || "/images/showroom-boucle-sectional.jpg"
                    }
                    alt={about.title || "West Home Furniture showroom"}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 48vw"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>

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

          <ScrollReveal className="mt-10 border-t border-border pt-8 text-center md:mt-12">
            <p className="eyebrow">Our collection</p>
            <h2 className="mt-3 font-display text-3xl text-charcoal">
              {about.offeringsTitle || "What you will find"}
            </h2>
            <AboutOfferings offerings={about.offerings} />
            <div className="mt-10 flex justify-center">
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
                <h3 className="font-display text-2xl text-charcoal">
                  {value.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {value.description}
                </p>
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
