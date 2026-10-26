"use client";

import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Category } from "@/lib/cms/types";
import {
  buildProductsUrl,
  hasAnyFilters,
  type PricingFilter,
} from "@/lib/products-filters";
import { Button } from "./ui/Button";
import { Input, Select } from "./ui/FormFields";

export type { PricingFilter };

const LG_MQ = "(min-width: 1024px)";

export function ProductsToolbar({
  categories,
  currentCategory,
  currentSearch,
  currentPricing = "",
  resultCount,
}: {
  categories: Category[];
  currentCategory: string;
  currentSearch: string;
  currentPricing?: PricingFilter;
  resultCount?: number;
}) {
  const router = useRouter();
  const [category, setCategory] = useState(currentCategory);
  const [search, setSearch] = useState(currentSearch);
  const [pricing, setPricing] = useState<PricingFilter>(currentPricing);
  const columnRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const hasFilters = hasAnyFilters(category, search, pricing);

  useEffect(() => {
    setCategory(currentCategory);
    setSearch(currentSearch);
    setPricing(currentPricing);
  }, [currentCategory, currentSearch, currentPricing]);

  // Keep filters fixed under the header on desktop (Lenis breaks CSS sticky).
  useLayoutEffect(() => {
    const column = columnRef.current;
    const aside = asideRef.current;
    if (!column || !aside) return;

    const mq = window.matchMedia(LG_MQ);

    function pinToViewport() {
      if (!column || !aside) return;

      if (!mq.matches) {
        aside.style.position = "";
        aside.style.top = "";
        aside.style.left = "";
        aside.style.width = "";
        aside.style.zIndex = "";
        column.style.minHeight = "";
        return;
      }

      const rect = column.getBoundingClientRect();
      aside.style.position = "fixed";
      aside.style.top =
        "calc(var(--header-offset) + var(--header-sticky-gap))";
      aside.style.left = `${Math.round(rect.left)}px`;
      aside.style.width = `${Math.round(rect.width)}px`;
      aside.style.zIndex = "30";
      column.style.minHeight = `${aside.offsetHeight}px`;
    }

    pinToViewport();

    const resizeObserver = new ResizeObserver(pinToViewport);
    resizeObserver.observe(column);
    resizeObserver.observe(aside);
    window.addEventListener("resize", pinToViewport);
    mq.addEventListener("change", pinToViewport);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", pinToViewport);
      mq.removeEventListener("change", pinToViewport);
      aside.style.position = "";
      aside.style.top = "";
      aside.style.left = "";
      aside.style.width = "";
      aside.style.zIndex = "";
      column.style.minHeight = "";
    };
  }, [hasFilters, resultCount]);

  function navigate(next: {
    category?: string;
    search?: string;
    pricing?: PricingFilter;
  }) {
    router.replace(
      buildProductsUrl(
        next.category ?? category,
        next.search ?? search,
        next.pricing ?? pricing,
      ),
      { scroll: false },
    );
  }

  function apply(e?: FormEvent) {
    e?.preventDefault();
    navigate({});
  }

  function clearFilters() {
    setCategory("");
    setSearch("");
    setPricing("");
    router.replace("/products", { scroll: false });
  }

  return (
    <div ref={columnRef} className="min-w-0">
      <aside
        ref={asideRef}
        className="rounded-[24px] border border-border bg-surface p-5 shadow-sm"
      >
        <div className="mb-5 flex items-end justify-between gap-3 border-b border-border/80 pb-4">
          <div>
            <p className="eyebrow">Filters</p>
            <h2 className="mt-1 font-display text-xl tracking-tight text-charcoal">
              Find a piece
            </h2>
          </div>
          {typeof resultCount === "number" ? (
            <p className="shrink-0 text-xs text-muted">
              {resultCount} {resultCount === 1 ? "result" : "results"}
            </p>
          ) : null}
        </div>

        <form onSubmit={apply} className="flex flex-col gap-4">
          <Input
            id="product-search"
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or description"
            className="h-11"
          />
          <Select
            id="product-category"
            label="Category"
            value={category}
            onChange={(e) => {
              const value = e.target.value;
              setCategory(value);
              navigate({ category: value });
            }}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </Select>
          <Select
            id="product-pricing"
            label="Pricing"
            value={pricing}
            onChange={(e) => {
              const value = e.target.value as PricingFilter;
              setPricing(value);
              navigate({ pricing: value });
            }}
          >
            <option value="">All</option>
            <option value="custom">Custom products</option>
            <option value="fixed">Fixed price</option>
          </Select>

          <div className="flex flex-col gap-2 pt-1">
            <Button type="submit" className="h-11 w-full">
              Apply
            </Button>
            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-muted underline-offset-2 transition hover:text-charcoal hover:underline"
              >
                Clear filters
              </button>
            ) : null}
          </div>
        </form>
      </aside>
    </div>
  );
}
