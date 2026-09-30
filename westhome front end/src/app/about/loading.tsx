export default function AboutLoading() {
  return (
    <div aria-busy="true" aria-label="Loading about">
      <div className="flex min-h-[34vh] items-end bg-charcoal/20 pb-10 pt-28 md:min-h-[40vh]">
        <div className="container-page">
          <div className="h-3 w-24 animate-pulse bg-white/30" />
          <div className="mt-4 h-14 w-72 max-w-full animate-pulse bg-white/25" />
        </div>
      </div>
      <section className="pt-8 pb-10 md:pt-10 md:pb-12">
        <div className="container-page">
          <div className="max-w-3xl">
            <div className="h-10 w-full animate-pulse bg-stone-deep" />
            <div className="mt-3 h-10 w-4/5 animate-pulse bg-stone-deep" />
            <div className="mt-5 h-4 w-full animate-pulse bg-stone-deep" />
            <div className="mt-2 h-4 w-full animate-pulse bg-stone-deep" />
            <div className="mt-2 h-4 w-3/4 animate-pulse bg-stone-deep" />
          </div>
          <div className="mt-6 max-w-3xl border-t border-border pt-5">
            <div className="h-3 w-24 animate-pulse bg-stone-deep" />
            <div className="mt-3 h-8 w-56 animate-pulse bg-stone-deep" />
            <div className="mt-2 h-4 w-40 animate-pulse bg-stone-deep" />
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div className="aspect-[4/5] animate-pulse bg-stone-deep" />
            <div>
              <div className="h-3 w-28 animate-pulse bg-stone-deep" />
              <div className="mt-4 h-10 w-64 animate-pulse bg-stone-deep" />
              <div className="mt-4 h-4 w-full animate-pulse bg-stone-deep" />
              <div className="mt-8 space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-16 animate-pulse bg-stone-deep" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-border bg-surface py-10 md:py-14">
        <div className="container-page">
          <div className="h-3 w-36 animate-pulse bg-stone-deep" />
          <div className="mt-4 h-10 w-72 animate-pulse bg-stone-deep" />
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <div className="h-7 w-40 animate-pulse bg-stone-deep" />
                <div className="mt-3 h-4 w-full animate-pulse bg-stone-deep" />
                <div className="mt-2 h-4 w-5/6 animate-pulse bg-stone-deep" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <span className="sr-only">Loading about…</span>
    </div>
  );
}
