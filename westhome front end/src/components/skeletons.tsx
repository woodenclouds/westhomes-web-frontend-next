function Bone({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-stone-deep ${className}`}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <article>
      <Bone className="aspect-[4/3]" />
      <Bone className="mt-4 h-3 w-24" />
      <Bone className="mt-3 h-7 w-4/5" />
      <Bone className="mt-3 h-4 w-full" />
      <Bone className="mt-2 h-4 w-5/6" />
      <Bone className="mt-3 h-6 w-28" />
      <div className="mt-4 flex gap-2">
        <Bone className="h-10 w-28" />
        <Bone className="h-10 w-24" />
      </div>
    </article>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageIntroSkeleton({
  titleWidth = "w-64",
}: {
  titleWidth?: string;
}) {
  return (
    <div>
      <Bone className="h-3 w-28" />
      <Bone className={`mt-4 h-14 ${titleWidth} max-w-full md:h-16`} />
      <Bone className="mt-5 h-4 w-full max-w-xl" />
      <Bone className="mt-2 h-4 w-4/5 max-w-lg" />
    </div>
  );
}

export function EnquiryFormSkeleton() {
  return (
    <div className="space-y-5 rounded-sm border border-border bg-surface p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <FieldSkeleton />
        <FieldSkeleton />
      </div>
      <FieldSkeleton />
      <div className="grid gap-5 md:grid-cols-2">
        <FieldSkeleton />
        <FieldSkeleton />
      </div>
      <div>
        <Bone className="h-4 w-20" />
        <Bone className="mt-2 h-28 w-full" />
      </div>
      <Bone className="h-11 w-40" />
    </div>
  );
}

function FieldSkeleton() {
  return (
    <div>
      <Bone className="h-4 w-16" />
      <Bone className="mt-2 h-11 w-full" />
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading home">
      <Bone className="min-h-[100svh] w-full !bg-charcoal/15" />

      <section className="section-space">
        <div className="container-page grid items-center gap-12 md:grid-cols-2">
          <div>
            <Bone className="h-3 w-24" />
            <Bone className="mt-4 h-12 w-4/5" />
            <Bone className="mt-4 h-4 w-full" />
            <Bone className="mt-2 h-4 w-full" />
            <Bone className="mt-2 h-4 w-3/4" />
            <Bone className="mt-8 h-11 w-32" />
          </div>
          <Bone className="aspect-[5/4]" />
        </div>
      </section>

      <section className="border-y border-border bg-surface section-space">
        <div className="container-page">
          <Bone className="h-3 w-24" />
          <Bone className="mt-4 h-12 w-72" />
          <Bone className="mt-4 h-4 w-full max-w-xl" />
          <div className="mt-12">
            <ProductGridSkeleton count={3} />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page">
          <Bone className="h-3 w-20" />
          <Bone className="mt-4 h-12 w-80" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Bone key={i} className="aspect-[3/4]" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-deep/70 section-space">
        <div className="container-page">
          <Bone className="h-3 w-20" />
          <Bone className="mt-4 h-12 w-96 max-w-full" />
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <Bone className="h-10 w-12" />
                <Bone className="mt-4 h-7 w-40" />
                <Bone className="mt-3 h-4 w-full" />
                <Bone className="mt-2 h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page">
          <Bone className="h-3 w-24" />
          <Bone className="mt-4 h-12 w-72" />
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Bone key={i} className="aspect-square" />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-charcoal/90 section-space">
        <div className="container-page flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl flex-1">
            <Bone className="h-3 w-20 !bg-white/15" />
            <Bone className="mt-4 h-12 w-80 max-w-full !bg-white/15" />
            <Bone className="mt-4 h-4 w-full !bg-white/10" />
          </div>
          <div className="flex gap-3">
            <Bone className="h-12 w-40 !bg-white/15" />
            <Bone className="h-12 w-32 !bg-white/10" />
          </div>
        </div>
      </section>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
