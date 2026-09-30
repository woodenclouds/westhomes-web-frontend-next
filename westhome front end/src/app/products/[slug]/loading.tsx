import { ProductCardSkeleton } from "@/components/skeletons";

export default function ProductDetailLoading() {
  return (
    <div className="section-space" aria-busy="true" aria-label="Loading product">
      <div className="container-page">
        <div className="h-4 w-48 animate-pulse bg-stone-deep" />
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="aspect-[4/3] animate-pulse bg-stone-deep" />
            <div className="mt-3 flex gap-2">
              <div className="h-20 w-24 animate-pulse bg-stone-deep" />
              <div className="h-20 w-24 animate-pulse bg-stone-deep" />
              <div className="h-20 w-24 animate-pulse bg-stone-deep" />
            </div>
          </div>
          <div>
            <div className="h-3 w-28 animate-pulse bg-stone-deep" />
            <div className="mt-4 h-16 w-4/5 animate-pulse bg-stone-deep" />
            <div className="mt-6 space-y-2">
              <div className="h-4 w-full animate-pulse bg-stone-deep" />
              <div className="h-4 w-full animate-pulse bg-stone-deep" />
              <div className="h-4 w-3/4 animate-pulse bg-stone-deep" />
            </div>
            <div className="mt-6 h-8 w-40 animate-pulse bg-stone-deep" />
            <div className="mt-2 h-4 w-64 animate-pulse bg-stone-deep" />
            <div className="mt-8 space-y-3 border-t border-border pt-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="grid grid-cols-[8rem_1fr] gap-3">
                  <div className="h-4 animate-pulse bg-stone-deep" />
                  <div className="h-4 animate-pulse bg-stone-deep" />
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <div className="h-12 w-48 animate-pulse bg-stone-deep" />
              <div className="h-12 w-36 animate-pulse bg-stone-deep" />
            </div>
          </div>
        </div>
        <div className="mt-20">
          <div className="h-10 w-48 animate-pulse bg-stone-deep" />
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        </div>
      </div>
      <span className="sr-only">Loading product…</span>
    </div>
  );
}
