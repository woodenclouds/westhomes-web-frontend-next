"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
    <article className="group flex h-full flex-col transition duration-500 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1">
      <Link
        href={`/products/${product.slug}`}
        className="frame-image relative aspect-[4/3] bg-stone-deep"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        {product.customisable ? (
          <span className="absolute left-2.5 top-2.5 bg-wood/95 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white sm:left-3 sm:top-3 sm:px-2.5 sm:text-[0.65rem]">
            Customisable
          </span>
        ) : product.price == null ? (
          <span className="absolute left-2.5 top-2.5 bg-charcoal/85 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-stone sm:left-3 sm:top-3 sm:px-2.5 sm:text-[0.65rem]">
            On enquiry
          </span>
        ) : null}
      </Link>
      <div className="mt-3 flex flex-1 flex-col sm:mt-4">
        <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted sm:text-[0.7rem]">
          {product.categoryName}
        </p>
        <h3 className="mt-1 font-display text-[1.25rem] leading-snug text-charcoal sm:text-[1.45rem]">
          <Link href={`/products/${product.slug}`} className="hover:text-wood">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {product.shortDescription}
        </p>
        <p className="mt-3 font-display text-base text-charcoal sm:text-lg">
          {priceLabel}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 sm:mt-4">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex min-h-10 items-center gap-1.5 text-[0.78rem] font-medium uppercase tracking-[0.04em] text-charcoal transition hover:text-wood"
          >
            View details
            <svg
              width="12"
              height="12"
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
            variant="wood-outline"
            size="sm"
          />
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

  useEffect(() => {
    setPage(1);
  }, [productKey]);

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
      <div className="grid gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
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
