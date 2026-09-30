import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/cms/types";
import { ButtonLink } from "./ui/Button";
import { WhatsAppButton } from "./WhatsAppButton";
import { productWhatsAppMessage } from "@/lib/whatsapp";

export function ProductCard({ product }: { product: Product }) {
  const waMessage = productWhatsAppMessage({
    id: product.id,
    name: product.name,
    categoryName: product.categoryName,
    shortDescription: product.shortDescription,
    slug: product.slug,
  });

  return (
    <article className="group flex flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[4/3] overflow-hidden rounded-sm bg-stone-deep"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
        />
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-xs uppercase tracking-[0.14em] text-muted">
          {product.categoryName}
        </p>
        <h3 className="mt-1 font-display text-xl text-charcoal">
          <Link href={`/products/${product.slug}`} className="hover:text-wood">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {product.shortDescription}
        </p>
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
