import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductCard";
import { EmptyState } from "@/components/ui/States";
import { ProductsToolbar } from "@/components/ProductsToolbar";
import { cms } from "@/lib/cms/client";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse WestHome Furniture products and categories — living, dining, bedroom and office.",
};

type SearchParams = Promise<{
  category?: string;
  q?: string;
}>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const categorySlug = params.category;
  const search = params.q;

  const [categories, products] = await Promise.all([
    cms.getCategories(),
    cms.getProducts({ categorySlug, search }),
  ]);

  const activeCategory = categories.find((c) => c.slug === categorySlug);

  return (
    <div className="section-space">
      <div className="container-page">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Catalogue
        </p>
        <h1 className="mt-3 font-display text-4xl text-charcoal md:text-5xl">
          Products
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          {activeCategory
            ? activeCategory.description
            : "Explore our current collection. Filter by room or search by name."}
        </p>

        <div className="mt-8">
          <ProductsToolbar
            categories={categories}
            currentCategory={categorySlug ?? ""}
            currentSearch={search ?? ""}
          />
        </div>

        <div className="mt-10">
          {products.length === 0 ? (
            <EmptyState
              title="No products found"
              description="Try another category or clear your search to see the full catalogue."
              actionHref="/products"
              actionLabel="Clear filters"
            />
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  );
}
