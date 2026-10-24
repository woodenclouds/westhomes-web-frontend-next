"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Category } from "@/lib/cms/types";
import { Button } from "./ui/Button";
import { Input, Select } from "./ui/FormFields";

export type PricingFilter = "" | "custom" | "fixed";

function buildProductsUrl(
  category: string,
  search: string,
  pricing: PricingFilter,
) {
  const qs = new URLSearchParams();
  if (category) qs.set("category", category);
  if (search.trim()) qs.set("q", search.trim());
  if (pricing) qs.set("pricing", pricing);
  const query = qs.toString();
  return query ? `/products?${query}` : "/products";
}

export function ProductsToolbar({
  categories,
  currentCategory,
  currentSearch,
  currentPricing = "",
}: {
  categories: Category[];
  currentCategory: string;
  currentSearch: string;
  currentPricing?: PricingFilter;
}) {
  const router = useRouter();
  const [category, setCategory] = useState(currentCategory);
  const [search, setSearch] = useState(currentSearch);
  const [pricing, setPricing] = useState<PricingFilter>(currentPricing);

  useEffect(() => {
    setCategory(currentCategory);
    setSearch(currentSearch);
    setPricing(currentPricing);
  }, [currentCategory, currentSearch, currentPricing]);

  function navigate(next: {
    category?: string;
    search?: string;
    pricing?: PricingFilter;
  }) {
    router.push(
      buildProductsUrl(
        next.category ?? category,
        next.search ?? search,
        next.pricing ?? pricing,
      ),
    );
  }

  function apply(e?: FormEvent) {
    e?.preventDefault();
    navigate({});
  }

  return (
    <form
      onSubmit={apply}
      className="flex flex-col gap-3 rounded-[24px] border border-border bg-surface p-4 sm:p-5 md:flex-row md:items-end shadow-sm"
    >
      <div className="min-w-0 flex-1">
        <Input
          id="product-search"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or description"
          className="h-11"
        />
      </div>
      <div className="w-full md:w-56 md:shrink-0">
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
      </div>
      <div className="w-full md:w-52 md:shrink-0">
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
      </div>
      <Button type="submit" className="h-11 w-full shrink-0 md:w-auto">
        Apply
      </Button>
    </form>
  );
}
