import {
  EnquiryFormSkeleton,
  PageIntroSkeleton,
} from "@/components/skeletons";

export default function ContactLoading() {
  return (
    <div className="section-space" aria-busy="true" aria-label="Loading contact">
      <div className="container-page">
        <PageIntroSkeleton titleWidth="w-96" />
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <div className="h-8 w-64 animate-pulse bg-stone-deep" />
              <div className="mt-4 h-4 w-72 animate-pulse bg-stone-deep" />
              <div className="mt-3 h-4 w-40 animate-pulse bg-stone-deep" />
              <div className="mt-2 h-4 w-56 animate-pulse bg-stone-deep" />
              <div className="mt-6 flex gap-3">
                <div className="h-11 w-20 animate-pulse bg-stone-deep" />
                <div className="h-11 w-20 animate-pulse bg-stone-deep" />
                <div className="h-11 w-28 animate-pulse bg-stone-deep" />
              </div>
            </div>
            <div className="h-64 animate-pulse bg-stone-deep md:h-80" />
          </div>
          <EnquiryFormSkeleton />
        </div>
      </div>
      <span className="sr-only">Loading contact…</span>
    </div>
  );
}
