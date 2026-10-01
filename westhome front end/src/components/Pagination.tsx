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
      className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8"
      aria-label={label}
    >
      <p className="text-sm text-muted">
        Page {page} of {totalPages}
        <span className="mx-2 text-border">·</span>
        {totalItems} {itemLabel}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded-sm border border-border px-3.5 py-2.5 text-[0.78rem] font-medium uppercase tracking-[0.04em] text-charcoal transition hover:border-charcoal disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onPageChange(n)}
            aria-current={n === page ? "page" : undefined}
            className={`min-w-10 rounded-sm px-3.5 py-2.5 text-[0.78rem] font-medium tracking-[0.04em] transition ${
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
          className="rounded-sm border border-border px-3.5 py-2.5 text-[0.78rem] font-medium uppercase tracking-[0.04em] text-charcoal transition hover:border-charcoal disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
