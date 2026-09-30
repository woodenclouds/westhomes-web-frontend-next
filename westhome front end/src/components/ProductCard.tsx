import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/cms/types";
import { ButtonLink } from "./ui/Button";
import { WhatsAppButton } from "./WhatsAppButton";
import { productWhatsAppMessage } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/price";

export function ProductCard({ product }: { product: Product }) {
  const priceLabel = formatPrice(product.price);
  const waMessage = productWhatsAppMessage({
    id: product.id,
    name: product.name,
    categoryName: product.categoryName,
    shortDescription: product.shortDescription,
    slug: product.slug,
    priceLabel,
  });

  return (
    <article className="group flex h-full flex-col transition duration-500 hover:-translate-y-1">
      <Link
        href={`/products/${product.slug}`}
        className="frame-image relative aspect-[4/3] bg-stone-deep"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        {product.customisable ? (
          <span className="absolute left-3 top-3 bg-wood/95 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white">
            Customisable
          </span>
        ) : product.price == null ? (
          <span className="absolute left-3 top-3 bg-charcoal/85 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-stone">
            On enquiry
          </span>
        ) : null}
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-[0.7rem] uppercase tracking-[0.12em] text-muted">
          {product.categoryName}
        </p>
        <h3 className="mt-1 font-display text-[1.45rem] leading-snug text-charcoal">
          <Link href={`/products/${product.slug}`} className="hover:text-wood">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {product.shortDescription}
        </p>
        <p className="mt-3 font-display text-lg text-charcoal">{priceLabel}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <ButtonLink
            href={`/products/${product.slug}`}
            variant="ghost"
            size="sm"
            className="!px-0"
          >
            View details
          </ButtonLink>
          <WhatsAppButton
            message={waMessage}
            label="Enquire"
            variant="wood-outline"
            size="sm"
          />
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
