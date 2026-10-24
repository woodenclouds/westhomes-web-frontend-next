export type PricingFilter = "" | "custom" | "fixed";

export const PRICING_OPTIONS: { value: PricingFilter; label: string }[] = [
  { value: "", label: "All" },
  { value: "custom", label: "Custom products" },
  { value: "fixed", label: "Fixed price" },
];

export function parsePricing(value?: string | null): PricingFilter {
  if (value === "custom" || value === "fixed") return value;
  return "";
}

export function buildProductsUrl(
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

/** Active sheet-style filters (category + pricing), excluding search. */
export function countSheetFilters(
  category: string,
  pricing: PricingFilter,
): number {
  return (category ? 1 : 0) + (pricing ? 1 : 0);
}

export function hasAnyFilters(
  category: string,
  search: string,
  pricing: PricingFilter,
): boolean {
  return Boolean(category || search.trim() || pricing);
}
