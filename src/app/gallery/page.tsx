import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { EmptyState } from "@/components/ui/States";
import { PageIntro } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cms } from "@/lib/cms/client";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See stylish living room and bedroom furniture from West Home Furniture Dubai — sofas, beds, tables and custom pieces from our Al Barsha showroom.",
};

export default async function GalleryPage() {
  const [items, page] = await Promise.all([
    cms.getGallery(),
    cms.getGalleryPage(),
  ]);

  return (
    <div className="section-space">
      <div className="container-page">
        <PageIntro
          eyebrow="Portfolio"
          title={page.title}
          description={page.intro}
        />

        <ScrollReveal className="mt-12">
          {items.length === 0 ? (
            <EmptyState
              title="Gallery is empty"
              description="New images will appear here once added in the CMS."
            />
          ) : (
            <GalleryGrid items={items} />
          )}
        </ScrollReveal>
      </div>
    </div>
  );
}
