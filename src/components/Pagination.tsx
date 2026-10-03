"use client";

type Props = {
  page: number;
  totalPages: number;
  totalItems: number;
  itemLabel?: string;
  onPageChange: (page: number) => void;
  label?: string;
};

export function Pagination({
  page,
  totalPages,
  totalItems,
  itemLabel = "items",
  onPageChange,
  label = "Pagination",
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:pt-8"
      aria-label={label}
    >
      <p className="text-sm text-muted">
        Page {page} of {totalPages}
        <span className="mx-2 text-border">·</span>
        {totalItems} {itemLabel}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="min-h-11 flex-1 rounded-sm border border-border px-3.5 py-2.5 text-[0.78rem] font-medium uppercase tracking-[0.04em] text-charcoal transition hover:border-charcoal disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onPageChange(n)}
            aria-current={n === page ? "page" : undefined}
            className={`min-h-11 min-w-11 rounded-sm px-3.5 py-2.5 text-[0.78rem] font-medium tracking-[0.04em] transition ${
              n === page
                ? "bg-charcoal text-stone"
                : "border border-border text-charcoal hover:border-charcoal"
            }`}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="min-h-11 flex-1 rounded-sm border border-border px-3.5 py-2.5 text-[0.78rem] font-medium uppercase tracking-[0.04em] text-charcoal transition hover:border-charcoal disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
