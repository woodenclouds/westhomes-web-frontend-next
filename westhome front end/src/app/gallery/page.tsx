import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { EmptyState } from "@/components/ui/States";
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
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Portfolio
        </p>
        <h1 className="mt-3 font-display text-4xl text-charcoal md:text-5xl">
          Gallery
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Spaces and details from our collection. Images are managed in the CMS
          and update without a redeploy.
        </p>

        <div className="mt-10">
          {items.length === 0 ? (
            <EmptyState
              title="Gallery is empty"
              description="New images will appear here once added in the CMS."
            />
          ) : (
            <GalleryGrid items={items} />
          )}
        </div>
      </div>
    </div>
  );
}
