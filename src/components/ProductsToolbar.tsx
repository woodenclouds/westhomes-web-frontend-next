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
      className="flex flex-col gap-3 rounded-sm border border-border bg-surface p-3.5 sm:p-4 md:flex-row md:items-end"
    >
      <div className="flex-1">
        <Input
          id="product-search"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or description"
        />
      </div>
      <div className="md:w-56">
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
      <Button type="submit" className="w-full md:mb-0.5 md:w-auto">
        Apply
      </Button>
    </form>
  );
}
