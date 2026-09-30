import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductGrid } from "@/components/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { cms } from "@/lib/cms/client";
import { absoluteUrl } from "@/lib/site";
import { productWhatsAppMessage } from "@/lib/whatsapp";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await cms.getProductBySlug(slug);
  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: absoluteUrl(`/products/${product.slug}`) },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const product = await cms.getProductBySlug(slug);
  if (!product) notFound();

  const related = await cms.getRelatedProducts(product.id, 3);
  const wa = productWhatsAppMessage(product.name, product.id);

  return (
    <div className="section-space">
      <div className="container-page">
        <nav className="text-sm text-muted" aria-label="Breadcrumb">
          <Link href="/products" className="hover:text-wood">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <ProductGallery name={product.name} images={product.gallery} />

          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-muted">
              {product.categoryName}
            </p>
            <h1 className="mt-2 font-display text-4xl text-charcoal md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-muted leading-relaxed">
              {product.description}
            </p>

            {product.specs.length > 0 ? (
              <dl className="mt-8 space-y-3 border-t border-border pt-6">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid grid-cols-[8rem_1fr] gap-3 text-sm"
                  >
                    <dt className="text-muted">{spec.label}</dt>
                    <dd className="text-charcoal">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`/enquire?product=${product.slug}&type=product`}>
                Enquire Now
              </ButtonLink>
              <WhatsAppButton
                message={wa}
                label="WhatsApp about this product"
              />
            </div>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-20">
            <h2 className="font-display text-3xl text-charcoal">
              Related pieces
            </h2>
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
