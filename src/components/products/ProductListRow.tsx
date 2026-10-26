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
      className="group flex min-h-11 items-stretch gap-3 rounded-2xl border border-border/80 bg-surface p-3 transition active:scale-[0.99] active:bg-stone-deep/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood"
    >
      <div className="relative aspect-square w-[38%] max-w-[7.5rem] shrink-0 overflow-hidden rounded-2xl bg-[#F5F5F7] sm:w-[40%]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 767px) 40vw, 25vw"
          className="object-cover"
        />
        {product.isNew ? (
          <span className="pointer-events-none absolute left-2 top-2 z-10 rounded-md border border-black/[0.04] bg-white/95 px-2 py-0.5 text-[0.65rem] font-medium text-charcoal">
            New
          </span>
        ) : product.customisable ? (
          <span className="pointer-events-none absolute left-2 top-2 z-10 rounded-md border border-black/[0.04] bg-white/95 px-2 py-0.5 text-[0.65rem] font-medium text-charcoal">
            Custom
          </span>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 py-0.5">
        <p className="truncate text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">
          {product.categoryName}
        </p>
        <h3 className="line-clamp-2 font-sans text-[0.95rem] font-semibold leading-snug tracking-tight text-charcoal">
          {product.name}
        </h3>
        <div className="mt-0.5 flex flex-wrap items-baseline gap-2 text-sm">
          {product.price != null ? (
            <>
              <span className="text-[0.98rem] font-semibold text-wood">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice != null ? (
                <span className="text-xs font-normal text-black/40 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              ) : null}
            </>
          ) : (
            <span className="text-xs leading-relaxed text-black/70">
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
    <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-3">
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductListRow product={product} priority={index < 3} />
        </li>
      ))}
    </ul>
  );
}
