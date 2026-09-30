import { PageIntroSkeleton } from "@/components/skeletons";

const heights = ["h-64", "h-80", "h-56", "h-72", "h-60", "h-80"];

export default function GalleryLoading() {
  return (
    <div className="section-space" aria-busy="true" aria-label="Loading gallery">
      <div className="container-page">
        <PageIntroSkeleton titleWidth="w-48" />
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {heights.map((height, i) => (
            <div
              key={i}
              className={`mb-4 w-full break-inside-avoid animate-pulse bg-stone-deep ${height}`}
            />
          ))}
        </div>
      </div>
      <span className="sr-only">Loading gallery…</span>
    </div>
  );
}
