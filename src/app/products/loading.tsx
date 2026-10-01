import {
  PageIntroSkeleton,
  ProductGridSkeleton,
} from "@/components/skeletons";

export default function ProductsLoading() {
  return (
    <div className="section-space" aria-busy="true" aria-label="Loading products">
      <div className="container-page">
        <PageIntroSkeleton titleWidth="w-56" />
        <div className="mt-8 flex flex-col gap-3 rounded-sm border border-border bg-surface p-4 md:flex-row md:items-end">
          <div className="flex-1">
            <div className="h-4 w-16 animate-pulse bg-stone-deep" />
            <div className="mt-2 h-11 w-full animate-pulse bg-stone-deep" />
          </div>
          <div className="md:w-56">
            <div className="h-4 w-20 animate-pulse bg-stone-deep" />
            <div className="mt-2 h-11 w-full animate-pulse bg-stone-deep" />
          </div>
          <div className="h-11 w-24 animate-pulse bg-stone-deep" />
        </div>
        <div className="mt-12">
          <ProductGridSkeleton count={6} />
        </div>
      </div>
      <span className="sr-only">Loading products…</span>
    </div>
  );
}
