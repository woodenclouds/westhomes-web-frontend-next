import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { ProductGrid } from "@/components/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { HeroCarousel } from "@/components/HeroCarousel";
import { TickerBanner } from "@/components/TickerBanner";
import { NatureScrollSection } from "@/components/NatureScrollSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { cms } from "@/lib/cms/client";
import { generalEnquiryMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Home",
  description:
    "West Home Furniture Dubai offers stylish and comfortable furniture for modern homes — sofas, beds, mattresses, dining and coffee tables and more. Al Barsha showroom. We customise sofas, beds, club chairs and more.",
};

function pickProductsBySlugs(
  products: Awaited<ReturnType<typeof cms.getProducts>>,
  slugs: string[],
) {
  if (!slugs.length) return [];
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
}

export default async function HomePage() {
  const [home, allProducts, categories, gallery] = await Promise.all([
    cms.getHomeContent(),
    cms.getProducts(),
    cms.getCategories(),
    cms.getGallery(),
  ]);

  const orderedPreview = home.previewImageSlugs
    .map((slug) => gallery.find((item) => item.slug === slug))
    .filter((item): item is (typeof gallery)[number] => Boolean(item));
  const galleryPreview =
    orderedPreview.length > 0 ? orderedPreview : gallery.slice(0, 4);
  const selectedCustomisable = pickProductsBySlugs(
    allProducts,
    home.customisableProductSlugs,
  );
  const selectedFeatured = pickProductsBySlugs(
    allProducts,
    home.featuredProductSlugs,
  );
  const customisableFallback = allProducts
    .filter((p) => p.customisable)
    .slice(0, 3);
  const featuredFallback = allProducts
    .filter((p) => p.featured && !p.customisable)
    .slice(0, 3);
  const customisablePreview =
    selectedCustomisable.length > 0
      ? selectedCustomisable.slice(0, 6)
      : customisableFallback;
  const featuredShowroom =
    selectedFeatured.length > 0
      ? selectedFeatured.slice(0, 6)
      : featuredFallback.length > 0
        ? featuredFallback
        : allProducts.filter((p) => p.featured).slice(0, 3);

  const candidateBannerFiles = [
    { name: "B1", alt: "Minimalist Japandi living room with wooden fluted accent wall and woven lounge chair" },
    { name: "B2", alt: "Luxury modern living room with warm cove ceiling lighting and beige sectional sofa" },
    { name: "B3", alt: "Warm Scandinavian dining room with solid wood table and organic pendant fixtures" },
    { name: "B4", alt: "Contemporary living room with cream sectional sofa, marble coffee table, and warm lighting" },
    { name: "B5", alt: "Elegant dining room with walnut table, contemporary artwork, and chandelier" },
    { name: "B6", alt: "Bespoke handcrafted furniture collection for modern Dubai homes" },
  ];

  const publicDir = path.join(process.cwd(), "public");
  const publicBannerSlides = candidateBannerFiles
    .map((candidate) => {
      const extensions = [".png", ".jpg", ".jpeg", ".webp", ".PNG", ".JPG", ".JPEG", ".WEBP"];
      for (const ext of extensions) {
        const filename = `${candidate.name}${ext}`;
        if (fs.existsSync(path.join(publicDir, filename))) {
          return { src: `/${filename}`, alt: candidate.alt };
        }
      }
      return null;
    })
    .filter((slide): slide is { src: string; alt: string } => Boolean(slide));

  const fallbackHeroSlides = [
    {
      src: "/images/living-white-sectional-hero.jpg",
      alt: "White sectional sofa with marble coffee table in a modern living room",
    },
    {
      src: "/images/living-grey-sectional-hero.jpg",
      alt: "Light grey sectional sofa with marble table and warm accent lighting",
    },
  ];

  const heroSlides =
    publicBannerSlides.length > 0 ? publicBannerSlides : fallbackHeroSlides;

  return (
    <div className="relative">
      {/* Sticky Hero section: pinned at top while rest of page scrolls over it */}
      <div className="sticky top-0 z-0 h-[100svh] w-full overflow-hidden">
        <HeroCarousel
          slides={heroSlides}
          headline={home.heroHeadline}
          support={home.heroSupport}
        />
      </div>

      {/* Content wrapper: scrolls over the hero section */}
      <div className="relative z-10 bg-background shadow-[0_-16px_40px_rgba(0,0,0,0.3)]">
        <TickerBanner />

        <NatureScrollSection
          eyebrow="The house"
          title={home.introTitle}
          body={home.introBody}
          ctaText="Our story"
          ctaHref="/about"
          imageUrl="/nature-chair-sunrise-4k.png"
          imageAlt="Minimalist armchair on a sunlit hilltop — West Home Furniture Dubai"
        />

      <section className="border-y border-border bg-surface section-space">
        <div className="container-page">
          <ScrollReveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
              <SectionHeading
                eyebrow="Made to order"
                title={home.customisableTitle || "Customisable pieces"}
                description={
                  home.customisableText ||
                  "We customise sofas, beds, club chairs and more — fabric, size and finish chosen with you, priced after enquiry or as a starting showroom tag."
                }
              />
              <Link href="/products#customisable" className="text-link self-start sm:self-auto">
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
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
              <SectionHeading
                eyebrow="Showroom"
                title={home.featuredTitle || "Featured pieces"}
                description={
                  home.featuredText ||
                  "Ready looks from the floor — priced as shown, with custom options available when you need them."
                }
              />
              <Link href="/products#showroom" className="text-link self-start sm:self-auto">
                View all
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80} className="mt-12">
            <ProductGrid products={featuredShowroom} />
          </ScrollReveal>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Atelier"
              title="Made for your rooms"
              description="Sofas, beds, mattresses, living room and bedroom furniture, dining tables, coffee tables and more."
            />
          </ScrollReveal>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-3 xl:grid-cols-5">
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
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent transition duration-500 [@media(hover:hover)_and_(pointer:fine)]:group-hover:from-charcoal/90" />
                  <div className="absolute inset-x-0 bottom-0 p-3 transition duration-500 sm:p-5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-1">
                    <p className="font-display text-lg leading-tight text-stone sm:text-2xl">
                      {cat.name}
                    </p>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-stone/75 sm:mt-2 sm:text-sm">
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
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
              <SectionHeading
                eyebrow="Portfolio"
                title="From the showroom"
                description="Rooms, fabrics and details from recent West Home settings."
              />
              <Link href="/gallery" className="text-link self-start sm:self-auto">
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
        <div className="container-page flex flex-col items-stretch justify-between gap-8 md:flex-row md:items-center">
          <ScrollReveal>
            <SectionHeading
              light
              eyebrow="Visit us"
              title="Come sit with the pieces"
              description="Visit our Al Barsha showroom — open daily 9:00 AM to 9:00 PM. Enquire online or message us on WhatsApp."
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <ButtonLink href="/enquire" size="lg" className="w-full sm:w-auto">
                Start an enquiry
              </ButtonLink>
              <WhatsAppButton
                message={generalEnquiryMessage()}
                label="WhatsApp"
                size="lg"
                className="w-full !border-stone/40 !text-stone hover:!bg-stone hover:!text-charcoal sm:w-auto"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
      </div>
    </div>
  );
}
