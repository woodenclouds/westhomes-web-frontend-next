export default function LegalLoading() {
  return (
    <div className="section-space" aria-busy="true">
      <div className="container-page max-w-3xl">
        <div className="h-12 w-64 animate-pulse bg-stone-deep" />
        <div className="mt-4 h-4 w-36 animate-pulse bg-stone-deep" />
        <div className="mt-8 space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`h-4 animate-pulse bg-stone-deep ${i % 4 === 3 ? "w-2/3" : "w-full"}`}
            />
          ))}
        </div>
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
