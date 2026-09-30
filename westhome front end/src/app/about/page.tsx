import Image from "next/image";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { cms } from "@/lib/cms/client";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about WestHome Furniture — a Dubai furniture house on Hessa Street, Al Barsha.",
};

export default async function AboutPage() {
  const about = await cms.getAboutContent();

  return (
    <>
      <section className="relative min-h-[42vh] overflow-hidden bg-charcoal text-stone">
        <Image
          src={about.imageUrl}
          alt="WestHome interiors"
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-charcoal/30" />
        <div className="container-page relative flex min-h-[42vh] items-end pb-12 pt-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone/70">
              Our story
            </p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl">
              {about.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page max-w-3xl">
          <p className="font-display text-2xl leading-snug text-charcoal md:text-3xl">
            {about.intro}
          </p>
          <p className="mt-6 text-muted leading-relaxed">{about.body}</p>
        </div>
      </section>

      <section className="border-y border-border bg-surface section-space">
        <div className="container-page">
          <h2 className="font-display text-3xl text-charcoal">What we value</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {about.values.map((value) => (
              <div key={value.title}>
                <h3 className="font-display text-xl text-charcoal">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
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
