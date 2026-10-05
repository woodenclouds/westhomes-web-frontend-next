import { PageIntroSkeleton } from "@/components/skeletons";

export default function GalleryLoading() {
  return (
    <div className="section-space" aria-busy="true" aria-label="Loading gallery">
      <div className="container-page">
        <PageIntroSkeleton titleWidth="w-48" />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/5] w-full animate-pulse rounded-sm bg-stone-deep"
            />
          ))}
        </div>
      </div>
      <span className="sr-only">Loading gallery…</span>
    </div>
  );
}
