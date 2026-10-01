import Image from "next/image";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cms } from "@/lib/cms/client";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about West Home Furniture Dubai — customised sofas, beds, chaises and curtains on Hessa Street, Al Barsha.",
};

export default async function AboutPage() {
  const about = await cms.getAboutContent();

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-charcoal text-stone">
        <Image
          src={about.imageUrl}
          alt="WestHome interiors"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/92 via-charcoal/68 to-charcoal/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-charcoal/35" />

        <div className="container-page relative flex min-h-[100svh] flex-col justify-end pb-14 pt-28 md:justify-center md:pb-20 md:pt-32">
          <div className="max-w-2xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-stone/85">
              Our story
            </p>
            <h1 className="mt-4 font-display text-[2.15rem] leading-[1.08] sm:text-4xl md:text-5xl lg:text-[3.75rem]">
              {about.title}
            </h1>
            <blockquote className="mt-7 border-l border-wood-soft/70 pl-5">
              <p className="font-display text-xl leading-snug text-stone/95 md:text-2xl">
                “Furniture that completes a beautiful home.”
              </p>
            </blockquote>
            <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-stone/80 md:text-base">
              Customised sofas, beds, chaises and curtains from our showroom on
              Hessa Street, Al Barsha.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/enquire" size="lg">
                Enquire now
              </ButtonLink>
              <ButtonLink
                href="/contact"
                size="lg"
                variant="wood-outline"
                className="!border-stone/55 !text-stone hover:!bg-stone hover:!text-charcoal"
              >
                Visit showroom
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8 pb-8 md:pt-10 md:pb-10">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-[1.4fr_0.85fr] md:items-start md:gap-12 lg:gap-16">
            <div>
              <p className="font-display text-3xl leading-snug text-charcoal md:text-[2.15rem]">
                {about.intro}
              </p>
              <p className="mt-4 text-muted leading-relaxed">{about.body}</p>
            </div>

            <aside className="border-t border-border pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-1 lg:pl-10">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-wood">
                Showroom
              </p>
              <p className="mt-3 font-display text-2xl text-charcoal">
                Al Barsha, Hessa Street
              </p>
              <p className="mt-2 text-muted">Open daily, 9:00 AM – 9:00 PM</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Come sit with the pieces, browse fabrics and plan your rooms
                with our team.
              </p>
              <div className="mt-5">
                <ButtonLink href="/contact" variant="wood-outline" size="sm">
                  Visit us
                </ButtonLink>
              </div>
            </aside>
          </div>

          <div className="mt-10 grid items-center gap-8 border-t border-border pt-10 md:mt-12 md:grid-cols-2 md:gap-12 md:pt-12">
            <ScrollReveal>
              <div className="frame-image relative aspect-[4/5] bg-stone-deep md:aspect-[5/6]">
                <Image
                  src={about.craftImageUrl}
                  alt="Fabric swatches and custom sofa finishes at West Home"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <p className="eyebrow">How we work</p>
              <h2 className="mt-3 font-display text-3xl text-charcoal md:text-4xl">
                From showroom to your rooms
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                Every piece can be tailored — we guide you through fabric, size
                and layout so the furniture feels made for your home, not the
                other way around.
              </p>
              <ol className="mt-8 space-y-6">
                {about.process.map((step, i) => (
                  <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-3">
                    <span className="font-display text-2xl text-wood/80">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="font-display text-xl text-charcoal">
                        {step.title}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>

          <ScrollReveal className="mt-10 border-t border-border pt-8 md:mt-12">
            <p className="eyebrow">In the atelier</p>
            <h2 className="mt-3 font-display text-3xl text-charcoal">
              What you can customise
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
            <h2 className="mt-3 font-display text-3xl text-charcoal md:text-4xl">
              Comfort, made personal
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
