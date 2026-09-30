import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { cms } from "@/lib/cms/client";
import { generalEnquiryMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Home",
  description:
    "WestHome Furniture — refined living, dining, bedroom and office pieces from Hessa Street, Al Barsha, Dubai.",
};

export default async function HomePage() {
  const [home, featured, categories, gallery] = await Promise.all([
    cms.getHomeContent(),
    cms.getProducts({ featured: true }),
    cms.getCategories(),
    cms.getGallery(),
  ]);

  const galleryPreview = gallery.slice(0, 4);

  return (
    <>
      <section className="relative min-h-[88vh] w-full overflow-hidden bg-charcoal text-stone">
        <Image
          src={home.heroImageUrl}
          alt="WestHome furniture interior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/45 to-charcoal/20" />
        <div className="container-page relative flex min-h-[88vh] flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24 md:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone/70">
            WestHome Furniture
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-stone sm:text-5xl md:text-6xl lg:text-7xl">
            {home.heroHeadline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-stone/85 md:text-lg">
            {home.heroSupport}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/products" size="lg">
              Explore Products
            </ButtonLink>
            <ButtonLink
              href="/enquire"
              size="lg"
              variant="ghost"
              className="!text-stone hover:!bg-white/10"
            >
              Enquire Now
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-charcoal md:text-4xl">
              {home.introTitle}
            </h2>
            <p className="mt-4 text-muted leading-relaxed">{home.introBody}</p>
            <div className="mt-6">
              <ButtonLink href="/about" variant="wood-outline">
                About WestHome
              </ButtonLink>
            </div>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-sm bg-stone-deep">
            <Image
              src={categories[0]?.imageUrl ?? home.heroImageUrl}
              alt="WestHome showroom atmosphere"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface section-space">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl text-charcoal md:text-4xl">
                Featured pieces
              </h2>
              <p className="mt-2 text-muted">
                Highlights from our current collection.
              </p>
            </div>
            <Link
              href="/products"
              className="text-sm text-wood underline-offset-4 hover:underline"
            >
              View all products
            </Link>
          </div>
          <div className="mt-10">
            <ProductGrid products={featured.slice(0, 3)} />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page">
          <h2 className="font-display text-3xl text-charcoal md:text-4xl">
            Shop by room
          </h2>
          <p className="mt-2 max-w-xl text-muted">
            Browse categories managed from our CMS — living, dining, bedroom and
            workspace.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-stone-deep"
              >
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-2xl text-stone">{cat.name}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-stone/75">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-deep/60 section-space">
        <div className="container-page">
          <h2 className="font-display text-3xl text-charcoal md:text-4xl">
            Why WestHome
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {home.valueProps.map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-xl text-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl text-charcoal md:text-4xl">
                Gallery
              </h2>
              <p className="mt-2 text-muted">Spaces and details from recent work.</p>
            </div>
            <Link
              href="/gallery"
              className="text-sm text-wood underline-offset-4 hover:underline"
            >
              Open gallery
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {galleryPreview.map((item) => (
              <div
                key={item.id}
                className="relative aspect-square overflow-hidden rounded-sm bg-stone-deep"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-charcoal text-stone section-space">
        <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl md:text-4xl">
              Ready to furnish with intention?
            </h2>
            <p className="mt-3 text-stone/75">
              Send an enquiry or message us on WhatsApp — we will help with
              sizing, finishes and next steps.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/enquire" size="lg">
              Enquire Now
            </ButtonLink>
            <WhatsAppButton
              message={generalEnquiryMessage()}
              label="WhatsApp"
              size="lg"
              className="!border-stone/40 !text-stone hover:!bg-stone hover:!text-charcoal"
            />
          </div>
        </div>
      </section>
    </>
  );
}
