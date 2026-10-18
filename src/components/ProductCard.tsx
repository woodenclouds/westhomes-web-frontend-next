"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/cms/types";
import { Pagination } from "./Pagination";
import { WhatsAppButton } from "./WhatsAppButton";
import { productWhatsAppMessage } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/price";

const PAGE_SIZE = 6;

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
    <article className="group flex h-full flex-col">
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#F5F5F7] sm:rounded-3xl">
        <Link
          href={`/products/${product.slug}`}
          className="absolute inset-0 block"
          aria-label={product.name}
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Top-right "New" / "Custom" Badge */}
        {product.isNew ? (
          <span className="pointer-events-none absolute right-3.5 top-3.5 z-10 rounded-md border border-black/[0.04] bg-white/95 px-2.5 py-1 text-[0.72rem] font-medium text-charcoal shadow-[0_1px_4px_rgba(0,0,0,0.06)] sm:right-4 sm:top-4 sm:text-xs">
            New
          </span>
        ) : product.customisable ? (
          <span className="pointer-events-none absolute right-3.5 top-3.5 z-10 rounded-md border border-black/[0.04] bg-white/95 px-2.5 py-1 text-[0.72rem] font-medium text-charcoal shadow-[0_1px_4px_rgba(0,0,0,0.06)] sm:right-4 sm:top-4 sm:text-xs">
            Custom
          </span>
        ) : null}

        {/* Floating Quick Actions on Hover */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 flex items-center justify-between opacity-0 translate-y-1.5 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-[0.72rem] font-medium text-charcoal shadow-sm backdrop-blur-md transition hover:bg-white"
          >
            View
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2.5 6h7M6.5 3.5 9 6l-2.5 2.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <WhatsAppButton
            message={waMessage}
            label="Enquire"
            variant="primary"
            size="sm"
            className="!rounded-full !px-3 !py-1.5 !text-[0.72rem] shadow-sm"
          />
        </div>
      </div>

      {/* Product Details below image */}
      <div className="mt-3.5 flex flex-col sm:mt-4">
        <h3 className="font-sans text-[0.98rem] font-medium leading-snug tracking-tight text-charcoal sm:text-[1.05rem] capitalize">
          <Link
            href={`/products/${product.slug}`}
            className="line-clamp-1 transition-colors hover:text-wood"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-1 flex items-baseline gap-2 text-sm text-black/70">
          {product.price != null ? (
            <>
              <span className="font-normal text-black/70">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice != null ? (
                <span className="text-xs font-normal text-black/40 line-through sm:text-sm">
                  {formatPrice(product.originalPrice)}
                </span>
              ) : null}
            </>
          ) : (
            <span className="text-xs font-normal text-black/70 sm:text-sm leading-relaxed">
              {product.priceNote || "Price on enquiry"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({
  products,
  pageSize = PAGE_SIZE,
}: {
  products: Product[];
  pageSize?: number;
}) {
  const [page, setPage] = useState(1);
  const productKey = products.map((p) => p.id).join(",");
  const [prevProductKey, setPrevProductKey] = useState(productKey);

  if (prevProductKey !== productKey) {
    setPrevProductKey(productKey);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  function goToPage(next: number) {
    const clamped = Math.min(Math.max(1, next), totalPages);
    setPage(clamped);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
        {pageItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        totalItems={products.length}
        itemLabel="products"
        onPageChange={goToPage}
        label="Product pagination"
      />
    </div>
  );
}
