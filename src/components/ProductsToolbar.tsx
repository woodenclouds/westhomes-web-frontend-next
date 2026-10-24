"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { Category } from "@/lib/cms/types";
import { Button } from "./ui/Button";
import { Input, Select } from "./ui/FormFields";

export function ProductsToolbar({
  categories,
  currentCategory,
  currentSearch,
}: {
  categories: Category[];
  currentCategory: string;
  currentSearch: string;
}) {
  const router = useRouter();
  const [category, setCategory] = useState(currentCategory);
  const [search, setSearch] = useState(currentSearch);

  function apply(e?: FormEvent) {
    e?.preventDefault();
    const qs = new URLSearchParams();
    if (category) qs.set("category", category);
    if (search.trim()) qs.set("q", search.trim());
    const query = qs.toString();
    router.push(query ? `/products?${query}` : "/products");
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
      <div className="w-full md:w-72 md:shrink-0">
        <Select
          id="product-category"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>
      <Button type="submit" className="h-11 w-full shrink-0 md:w-auto">
        Apply
      </Button>
    </form>
  );
}
