import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { ProductGrid } from "@/components/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { cms } from "@/lib/cms/client";
import { generalEnquiryMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Home",
  description:
    "West Home Furniture Dubai — customised sofas, beds, chaises and curtains. Hessa Street, Al Barsha. Open daily 9:00 AM – 9:00 PM.",
};

export default async function HomePage() {
  const [home, featured, customisable, categories, gallery] = await Promise.all([
    cms.getHomeContent(),
    cms.getProducts({ featured: true }),
    cms.getProducts({ customisable: true }),
    cms.getCategories(),
    cms.getGallery(),
  ]);

  const galleryPreview = gallery.slice(0, 4);
  const customisablePreview = customisable.slice(0, 3);
  const featuredShowroom = featured
    .filter((p) => !p.customisable)
    .slice(0, 3);
  const featuredFallback = featured
    .filter((p) => !customisablePreview.some((c) => c.id === p.id))
    .slice(0, 3);

  const heroSlides = [
    { src: home.heroImageUrl, alt: "West Home Luxury Living showroom" },
    { src: "/images/showroom-boucle-sectional.jpg", alt: "Customised bouclé sectional sofa" },
    { src: "/images/sofa-beige-custom.jpg", alt: "Custom beige sectional with fabric options" },
    { src: "/images/bedroom-taupe.jpg", alt: "Customised upholstered bed and curtains" },
    { src: "/images/sofa-powder-blue.jpg", alt: "Powder blue cloud sofa" },
    { src: "/images/showroom-white-set.jpg", alt: "White living set in the showroom" },
  ];

  return (
    <>
      <HeroCarousel
        slides={heroSlides}
        headline={home.heroHeadline}
        support={home.heroSupport}
      />

      <section className="section-space">
        <div className="container-page grid items-center gap-12 md:grid-cols-2">
          <ScrollReveal>
            <SectionHeading
              eyebrow="The house"
              title={home.introTitle}
              description={home.introBody}
            />
            <div className="mt-8">
              <ButtonLink href="/about" variant="wood-outline">
                Our story
              </ButtonLink>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div className="frame-image relative aspect-[5/4] bg-stone-deep">
              <Image
                src={categories[0]?.imageUrl ?? home.heroImageUrl}
                alt="West Home customised sofa showroom"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface section-space">
        <div className="container-page">
          <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Made to order"
                title="Customisable pieces"
                description="Fabric, size and finish chosen with you — sofas, beds, curtains and more, priced after enquiry or as a starting showroom tag."
              />
              <Link href="/products#customisable" className="text-link">
                View customisable
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80} className="mt-12">
            <ProductGrid products={customisablePreview} />
          </ScrollReveal>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page">
          <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Showroom"
                title="Featured pieces"
                description="Ready looks from the floor — priced as shown, with custom options available when you need them."
              />
              <Link href="/products#showroom" className="text-link">
                View all
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80} className="mt-12">
            <ProductGrid
              products={
                featuredShowroom.length > 0
                  ? featuredShowroom
                  : featuredFallback
              }
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Atelier"
              title="Made for your rooms"
              description="Sofas, beds and chaises, chairs, and curtains — chosen and finished around how you live."
            />
          </ScrollReveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.id} delay={i * 80}>
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="frame-image group relative block aspect-[3/4] bg-stone-deep"
                >
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/15 to-transparent transition duration-500 group-hover:from-charcoal/85" />
                  <div className="absolute inset-x-0 bottom-0 p-5 transition duration-500 group-hover:-translate-y-1">
                    <p className="font-display text-2xl text-stone">{cat.name}</p>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone/75">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-deep/70 section-space">
        <div className="container-page">
          <ScrollReveal>
            <SectionHeading eyebrow="Why us" title="Quiet luxury, personal service" />
          </ScrollReveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {home.valueProps.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 90}>
                <p className="font-display text-4xl text-wood/80">0{i + 1}</p>
                <h3 className="mt-3 font-display text-2xl text-charcoal">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                  {item.description}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page">
          <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Portfolio"
                title="From the showroom"
                description="Rooms, fabrics and details from recent West Home settings."
              />
              <Link href="/gallery" className="text-link">
                Open gallery
              </Link>
            </div>
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {galleryPreview.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 70}>
                <div className="frame-image relative aspect-square bg-stone-deep">
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-charcoal text-stone section-space">
        <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <ScrollReveal>
            <SectionHeading
              light
              eyebrow="Visit us"
              title="Come sit with the pieces"
              description="Hessa Street, Al Barsha — open daily 9:00 AM to 9:00 PM. Enquire online or message us on WhatsApp."
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/enquire" size="lg">
                Start an enquiry
              </ButtonLink>
              <WhatsAppButton
                message={generalEnquiryMessage()}
                label="WhatsApp"
                size="lg"
                className="!border-stone/40 !text-stone hover:!bg-stone hover:!text-charcoal"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
