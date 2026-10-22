import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ButtonLink } from "@/components/ui/Button";

interface SpotlightItem {
  id: string;
  tag: string;
  badge: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  imageAlt: string;
  waMessage: string;
}

const SPOTLIGHT_ITEMS: SpotlightItem[] = [
  {
    id: "spotlight-grey-sectional",
    tag: "Bespoke Collection",
    badge: "Al Barsha Showroom",
    title: "The Cloud Corner Sectional",
    description:
      "Deep, cloud-like seating with generous cushions in tailored light-grey weave. Shown with an organic marble coffee table and custom fluted wall accents.",
    features: ["Custom modular sizing", "120+ fabric swatches", "Matching ottoman & curtains"],
    imageUrl: "/images/highlight-grey-sectional.jpg",
    imageAlt:
      "West Home bespoke light grey sectional sofa with chaise, marble coffee table, and warm cove lighting in a modern Dubai interior",
    waMessage:
      "Hello West Home,\n\nI am interested in The Cloud Corner Sectional shown in your showroom highlights.\n\nPlease share sizing options, fabric swatches, and pricing.\n\nThank you.",
  },
  {
    id: "spotlight-white-sectional",
    tag: "Signature Design",
    badge: "Curated Living",
    title: "The Horizon Bouclé Sectional",
    description:
      "L-shaped lounge profile in soft, textured ivory bouclé with contrasting velvet cushions and an oval marble centerpiece designed for relaxed entertaining.",
    features: ["Plush bouclé upholstery", "Reversible chaise option", "Bespoke dimensions"],
    imageUrl: "/images/highlight-white-sectional.png",
    imageAlt:
      "West Home tailored white bouclé sectional sofa with black accent pillows and oval marble coffee table in an elegant living room",
    waMessage:
      "Hello West Home,\n\nI am interested in The Horizon Bouclé Sectional shown in your showroom highlights.\n\nPlease share sizing options, fabric swatches, and pricing.\n\nThank you.",
  },
];

export function ShowroomSpotlight() {
  return (
    <section
      aria-label="Showroom Highlights"
      className="border-b border-border/80 bg-surface/60 py-14 sm:py-16 md:py-20"
    >
      <div className="container-page">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-[1.95rem] leading-[1.1] text-charcoal sm:text-3xl md:text-[2.75rem] capitalize tracking-tight">
                Crafted For Dubai Homes
              </h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted sm:mt-4 sm:text-base md:text-lg">
                Discover our signature living room settings — designed with bespoke scale,
                tactile upholstery, and handcrafted elegance ready to experience in Al Barsha.
              </p>
            </div>
            <Link
              href="/contact"
              className="text-link self-start sm:self-auto sm:pt-2"
            >
              Visit showroom
            </Link>
          </div>
        </ScrollReveal>

        {/* 2-Image Highlight Showcase Grid */}
        <div className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8">
          {SPOTLIGHT_ITEMS.map((item, index) => (
            <ScrollReveal
              key={item.id}
              delay={index * 120}
              className="group flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-surface shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-500 hover:border-wood/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
            >
              {/* Highlighted Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-deep/40">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  priority={index === 0}
                />

                {/* Subtle soft gradient scrim for depth */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-black/10"
                  aria-hidden="true"
                />

                {/* Floating Top Pill Badge */}
                <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[0.7rem] sm:text-xs font-medium uppercase tracking-[0.14em] text-charcoal shadow-sm backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-wood" />
                    {item.badge}
                  </span>
                </div>

                {/* Top-Right Tag */}
                <div className="hidden sm:block absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10">
                  <span className="inline-flex items-center rounded-full bg-charcoal/80 px-2.5 py-1 text-[0.68rem] sm:text-[0.72rem] font-medium tracking-[0.06em] text-stone shadow-sm backdrop-blur-md">
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Editorial Content & Enquiry Actions */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7 md:p-8">
                <div>
                  <h3 className="font-display text-2xl text-charcoal sm:text-[1.65rem] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-[0.95rem] leading-relaxed text-muted">
                    {item.description}
                  </p>

                  {/* Feature Chips */}
                  <div className="mt-4 hidden sm:flex flex-wrap gap-2">
                    {item.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center rounded-full bg-stone-deep/60 px-3 py-1 text-[0.72rem] sm:text-xs font-medium text-charcoal/85 border border-border/60"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA Row */}
                <div className="mt-6 pt-5 border-t border-border/70 flex flex-wrap items-center justify-between gap-3">
                  <WhatsAppButton
                    message={item.waMessage}
                    label="Enquire on WhatsApp"
                    variant="primary"
                    size="sm"
                    className="!rounded-full !px-5 !py-2.5 !text-[0.76rem]"
                  />
                  <ButtonLink
                    href="/contact"
                    variant="wood-outline"
                    size="sm"
                    className="!rounded-full !px-5 !py-2.5 !text-[0.76rem]"
                  >
                    View in showroom
                  </ButtonLink>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
