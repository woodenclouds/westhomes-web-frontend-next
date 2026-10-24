import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductCard";
import { EmptyState } from "@/components/ui/States";
import {
  ProductsToolbar,
  type PricingFilter,
} from "@/components/ProductsToolbar";
import { PageIntro } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
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

function parsePricing(value?: string): PricingFilter {
  if (value === "custom" || value === "fixed") return value;
  return "";
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const categorySlug = params.category;
  const search = params.q;
  const pricing = parsePricing(params.pricing);

  const [categories, products, page] = await Promise.all([
    cms.getCategories(),
    cms.getProducts({
      categorySlug,
      search,
      customisable:
        pricing === "custom" ? true : pricing === "fixed" ? false : undefined,
    }),
    cms.getProductsPage(),
  ]);

  const activeCategory = categories.find((c) => c.slug === categorySlug);

  return (
    <div className="section-space">
      <div className="container-page">
        <PageIntro
          eyebrow="Catalogue"
          title={page.title || "Products"}
          description={
            activeCategory ? activeCategory.description : page.intro
          }
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(240px,280px)_minmax(0,1fr)] lg:items-start lg:gap-10">
          <ProductsToolbar
            categories={categories}
            currentCategory={categorySlug ?? ""}
            currentSearch={search ?? ""}
            currentPricing={pricing}
            resultCount={products.length}
          />

          <div className="min-w-0">
            {products.length === 0 ? (
              <ScrollReveal>
                <EmptyState
                  title="No products found"
                  description="Try another category, pricing filter, or clear your search to see the full catalogue."
                  actionHref="/products"
                  actionLabel="Clear filters"
                />
              </ScrollReveal>
            ) : (
              <ScrollReveal>
                <ProductGrid
                  products={products}
                  className="grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 xl:grid-cols-3 xl:gap-8"
                />
              </ScrollReveal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
