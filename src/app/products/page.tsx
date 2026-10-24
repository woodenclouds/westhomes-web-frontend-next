import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductCard";
import { EmptyState } from "@/components/ui/States";
import {
  ProductsToolbar,
  type PricingFilter,
} from "@/components/ProductsToolbar";
import { PageIntro, SectionHeading } from "@/components/SectionHeading";
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
  const isFiltered = Boolean(categorySlug || search || pricing);

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
  const customisable = products.filter((p) => p.customisable);
  const showroom = products.filter((p) => !p.customisable);

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

        <div className="mt-8">
          <ProductsToolbar
            categories={categories}
            currentCategory={categorySlug ?? ""}
            currentSearch={search ?? ""}
            currentPricing={pricing}
          />
        </div>

        {products.length === 0 ? (
          <ScrollReveal className="mt-12">
            <EmptyState
              title="No products found"
              description="Try another category, pricing filter, or clear your search to see the full catalogue."
              actionHref="/products"
              actionLabel="Clear filters"
            />
          </ScrollReveal>
        ) : isFiltered ? (
          <ScrollReveal className="mt-12">
            <ProductGrid products={products} />
          </ScrollReveal>
        ) : (
          <>
            <section id="customisable" className="mt-14 scroll-mt-28">
              <ScrollReveal>
                <SectionHeading
                  eyebrow="Made to order"
                  title={page.customisableTitle}
                  description={page.customisableText}
                />
              </ScrollReveal>
              <ScrollReveal delay={80} className="mt-10">
                {customisable.length > 0 ? (
                  <ProductGrid products={customisable} />
                ) : (
                  <p className="text-muted">
                    No customisable pieces in this view.
                  </p>
                )}
              </ScrollReveal>
            </section>

            <section
              id="showroom"
              className="mt-16 border-t border-border pt-14 scroll-mt-28"
            >
              <ScrollReveal>
                <SectionHeading
                  eyebrow="Showroom floor"
                  title={page.showroomTitle}
                  description={page.showroomText}
                />
              </ScrollReveal>
              <ScrollReveal delay={80} className="mt-10">
                {showroom.length > 0 ? (
                  <ProductGrid products={showroom} />
                ) : (
                  <p className="text-muted">No showroom pieces in this view.</p>
                )}
              </ScrollReveal>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
