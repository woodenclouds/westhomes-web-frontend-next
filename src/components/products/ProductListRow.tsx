import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/cms/types";
import { formatPrice } from "@/lib/price";

export function ProductListRow({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full min-h-11 flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface transition active:scale-[0.99] active:bg-stone-deep/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#F5F5F7]">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 1023px) 50vw, 25vw"
            className="object-cover"
          />
        ) : null}
        {product.isNew ? (
          <span className="pointer-events-none absolute left-2 top-2 z-10 rounded-md border border-black/[0.04] bg-white/95 px-1.5 py-0.5 text-[0.6rem] font-medium text-charcoal">
            New
          </span>
        ) : product.customisable ? (
          <span className="pointer-events-none absolute left-2 top-2 z-10 rounded-md border border-black/[0.04] bg-white/95 px-1.5 py-0.5 text-[0.6rem] font-medium text-charcoal">
            Custom
          </span>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5 p-2.5 sm:p-3">
        <p className="truncate text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-muted">
          {product.categoryName}
        </p>
        <h3 className="line-clamp-2 font-sans text-[0.82rem] font-semibold leading-snug tracking-tight text-charcoal sm:text-[0.9rem]">
          {product.name}
        </h3>
        <div className="mt-auto flex flex-wrap items-baseline gap-1.5 pt-1 text-sm">
          {product.price != null ? (
            <>
              <span className="text-[0.85rem] font-semibold text-wood sm:text-[0.92rem]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice != null ? (
                <span className="text-[0.68rem] font-normal text-black/40 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              ) : null}
            </>
          ) : (
            <span className="text-[0.7rem] leading-relaxed text-black/70">
              {product.priceNote || "Price on enquiry"}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function ProductsMobileList({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2.5 sm:gap-3">
      {products.map((product, index) => (
        <li key={product.id} className="min-w-0">
          <ProductListRow product={product} priority={index < 4} />
        </li>
      ))}
    </ul>
  );
}
