import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductCard";
import { ProductsMobileFilters } from "@/components/products/ProductsMobileFilters";
import { ProductsMobileList } from "@/components/products/ProductListRow";
import { ProductsToolbar } from "@/components/ProductsToolbar";
import { ButtonLink } from "@/components/ui/Button";
import { parsePricing } from "@/lib/products-filters";
import { cms } from "@/lib/cms/client";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse sofas, beds, mattresses, living and bedroom furniture, dining tables, coffee tables and more from West Home Furniture Dubai. Custom sofas, beds and club chairs available.",
};

type SearchParams = Promise<{
  category?: string;
  q?: string;
  pricing?: string;
}>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const categorySlug = params.category;
  const search = params.q;
  const pricing = parsePricing(params.pricing);

  const [categories, products] = await Promise.all([
    cms.getCategories(),
    cms.getProducts({
      categorySlug,
      search,
      customisable:
        pricing === "custom" ? true : pricing === "fixed" ? false : undefined,
    }),
  ]);

  const emptyMobile = (
    <div className="rounded-2xl border border-dashed border-border bg-surface px-5 py-10 text-center">
      <p className="font-sans text-base text-charcoal">
        No pieces match your filters
      </p>
      <div className="mt-5">
        <ButtonLink href="/products" variant="wood-outline" size="sm">
          Clear all
        </ButtonLink>
      </div>
    </div>
  );

  return (
    <div className="pb-[max(5.5rem,calc(1.25rem+env(safe-area-inset-bottom)+3rem))] lg:pb-12">
      <div className="container-page py-3 lg:py-8">
        {/* Mobile + tablet (< lg) */}
        <div className="lg:hidden">
          <ProductsMobileFilters
            categories={categories}
            currentCategory={categorySlug ?? ""}
            currentSearch={search ?? ""}
            currentPricing={pricing}
            resultCount={products.length}
          />

          <div className="mt-4 min-w-0">
            {products.length === 0 ? (
              emptyMobile
            ) : (
              <ProductsMobileList products={products} />
            )}
          </div>
        </div>

        {/* Desktop (lg+) */}
        <div className="hidden gap-8 lg:grid lg:grid-cols-[minmax(280px,340px)_minmax(0,1fr)] lg:items-start lg:gap-10">
          <ProductsToolbar
            categories={categories}
            currentCategory={categorySlug ?? ""}
            currentSearch={search ?? ""}
            currentPricing={pricing}
            resultCount={products.length}
          />

          <div className="min-w-0">
            {products.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-border bg-surface px-6 py-14 text-center">
                <h2 className="font-display text-2xl text-charcoal">
                  No products found
                </h2>
                <p className="mx-auto mt-3 max-w-md text-muted">
                  Try another category, pricing filter, or clear your search to
                  see the full catalogue.
                </p>
                <div className="mt-6">
                  <ButtonLink href="/products" variant="wood-outline">
                    Clear filters
                  </ButtonLink>
                </div>
              </div>
            ) : (
              <ProductGrid
                products={products}
                className="grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 xl:grid-cols-3 xl:gap-8"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
