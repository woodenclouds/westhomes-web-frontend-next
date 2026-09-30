import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { EmptyState } from "@/components/ui/States";
import { PageIntro } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cms } from "@/lib/cms/client";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Visual portfolio of WestHome Furniture interiors, materials and installations.",
};

export default async function GalleryPage() {
  const items = await cms.getGallery();

  return (
    <div className="section-space">
      <div className="container-page">
        <PageIntro
          eyebrow="Portfolio"
          title="Gallery"
          description="Showroom settings, fabrics and finished rooms. New images appear here as they are added."
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
