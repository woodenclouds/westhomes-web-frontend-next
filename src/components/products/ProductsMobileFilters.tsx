"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { Category } from "@/lib/cms/types";
import {
  buildProductsUrl,
  countSheetFilters,
  hasAnyFilters,
  PRICING_OPTIONS,
  type PricingFilter,
} from "@/lib/products-filters";

type Props = {
  categories: Category[];
  currentCategory: string;
  currentSearch: string;
  currentPricing: PricingFilter;
  resultCount: number;
};

export function ProductsMobileFilters({
  categories,
  currentCategory,
  currentSearch,
  currentPricing,
  resultCount,
}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetCategory, setSheetCategory] = useState(currentCategory);
  const [sheetPricing, setSheetPricing] = useState<PricingFilter>(currentPricing);

  const filterBtnRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chipRowRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    setSearch(currentSearch);
    setSheetCategory(currentCategory);
    setSheetPricing(currentPricing);
  }, [currentCategory, currentSearch, currentPricing]);

  const replaceFilters = useCallback(
    (next: {
      category?: string;
      search?: string;
      pricing?: PricingFilter;
    }) => {
      router.replace(
        buildProductsUrl(
          next.category ?? currentCategory,
          next.search ?? search,
          next.pricing ?? currentPricing,
        ),
        { scroll: false },
      );
    },
    [router, currentCategory, currentPricing, search],
  );

  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    if (search === currentSearch) return;
    searchDebounceRef.current = setTimeout(() => {
      replaceFilters({ search });
    }, 250);
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, [search, currentSearch, replaceFilters]);

  useEffect(() => {
    if (!sheetOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.filterSheetOpen = "true";

    const sheet = sheetRef.current;
    const focusable = sheet?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setSheetOpen(false);
        requestAnimationFrame(() => filterBtnRef.current?.focus());
        return;
      }
      if (e.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      delete document.documentElement.dataset.filterSheetOpen;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [sheetOpen]);

  function closeSheet() {
    setSheetOpen(false);
    requestAnimationFrame(() => filterBtnRef.current?.focus());
  }

  function openSheet() {
    setSheetCategory(currentCategory);
    setSheetPricing(currentPricing);
    setSheetOpen(true);
  }

  function clearAll() {
    setSearch("");
    setSheetCategory("");
    setSheetPricing("");
    router.replace("/products", { scroll: false });
  }

  function selectCategoryChip(slug: string) {
    replaceFilters({ category: slug });
    requestAnimationFrame(() => {
      const selected = chipRowRef.current?.querySelector<HTMLElement>(
        '[aria-pressed="true"]',
      );
      selected?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    });
  }

  function onSheetChipKeyDown(e: ReactKeyboardEvent, apply: () => void) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      apply();
    }
  }

  const sheetFilterCount = countSheetFilters(currentCategory, currentPricing);
  const anyActive = hasAnyFilters(
    currentCategory,
    currentSearch,
    currentPricing,
  );
  const pricingLabel =
    PRICING_OPTIONS.find((o) => o.value === currentPricing)?.label ?? "";

  return (
    <div className="lg:hidden">
      <div className="products-mobile-sticky sticky z-40 -mx-4 bg-background/95 px-4 pb-2 pt-1 backdrop-blur-md supports-[backdrop-filter]:bg-background/85">
        <div className="flex h-12 items-center gap-1 rounded-full border border-border bg-surface px-2 shadow-sm">
          <span
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-muted"
            aria-hidden="true"
          >
            <SearchIcon />
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search furniture"
            enterKeyHint="search"
            autoComplete="off"
            aria-label="Search furniture"
            className="min-w-0 flex-1 bg-transparent text-base text-charcoal placeholder:text-muted/80 focus:outline-none"
          />
          {search ? (
            <button
              type="button"
              aria-label="Clear search"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-stone-deep/60 hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood"
              onClick={() => {
                setSearch("");
                replaceFilters({ search: "" });
              }}
            >
              <ClearIcon />
            </button>
          ) : null}
          <span
            className="mx-0.5 h-5 w-px shrink-0 bg-border"
            aria-hidden="true"
          />
          <button
            ref={filterBtnRef}
            type="button"
            aria-label="Open filters"
            aria-haspopup="dialog"
            aria-expanded={sheetOpen}
            className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-charcoal transition hover:bg-stone-deep/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood"
            onClick={openSheet}
          >
            <SlidersIcon />
            {sheetFilterCount > 0 ? (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-wood px-1 text-[0.62rem] font-semibold text-white">
                {sheetFilterCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      <div className="relative mt-2">
        <div
          ref={chipRowRef}
          className="products-chip-scroll -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scroll-smooth"
          role="listbox"
          aria-label="Categories"
        >
          <Chip
            selected={!currentCategory}
            onClick={() => selectCategoryChip("")}
            aria-pressed={!currentCategory}
          >
            All
          </Chip>
          {categories.map((c) => (
            <Chip
              key={c.id}
              selected={currentCategory === c.slug}
              onClick={() => selectCategoryChip(c.slug)}
              aria-pressed={currentCategory === c.slug}
            >
              {c.name}
            </Chip>
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-muted" aria-live="polite">
          {resultCount} {resultCount === 1 ? "result" : "results"}
        </p>
        {anyActive ? (
          <button
            type="button"
            onClick={clearAll}
            className="min-h-11 px-1 text-sm text-muted underline-offset-2 transition hover:text-charcoal hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood"
          >
            Clear all
          </button>
        ) : null}
      </div>

      {sheetFilterCount > 0 ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {currentCategory ? (
            <RemovableChip
              label={
                categories.find((c) => c.slug === currentCategory)?.name ||
                currentCategory
              }
              onRemove={() => replaceFilters({ category: "" })}
            />
          ) : null}
          {currentPricing ? (
            <RemovableChip
              label={pricingLabel}
              onRemove={() => replaceFilters({ pricing: "" })}
            />
          ) : null}
        </div>
      ) : null}

      {sheetOpen ? (
        <div className="fixed inset-0 z-[70] lg:hidden" data-lenis-prevent>
          <button
            type="button"
            className="absolute inset-0 bg-charcoal/45"
            aria-label="Close filters"
            onClick={closeSheet}
          />
          <div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="products-filter-sheet absolute inset-x-0 bottom-0 flex max-h-[85dvh] flex-col rounded-t-3xl border border-border bg-surface pb-[max(1rem,env(safe-area-inset-bottom))] shadow-lg"
          >
            <div className="flex justify-center pt-3" aria-hidden="true">
              <span className="h-1 w-10 rounded-full bg-border" />
            </div>

            <div className="flex items-center justify-between px-5 pb-3 pt-2">
              <h2
                id={titleId}
                className="font-display text-xl tracking-tight text-charcoal"
              >
                Filters
              </h2>
              <button
                type="button"
                aria-label="Close filters"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition hover:bg-stone-deep/60 hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood"
                onClick={closeSheet}
              >
                <ClearIcon />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Category
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip
                  selected={!sheetCategory}
                  onClick={() => {
                    setSheetCategory("");
                    replaceFilters({ category: "" });
                  }}
                  onKeyDown={(e) =>
                    onSheetChipKeyDown(e, () => {
                      setSheetCategory("");
                      replaceFilters({ category: "" });
                    })
                  }
                  aria-pressed={!sheetCategory}
                >
                  All
                </Chip>
                {categories.map((c) => (
                  <Chip
                    key={c.id}
                    selected={sheetCategory === c.slug}
                    onClick={() => {
                      setSheetCategory(c.slug);
                      replaceFilters({ category: c.slug });
                    }}
                    onKeyDown={(e) =>
                      onSheetChipKeyDown(e, () => {
                        setSheetCategory(c.slug);
                        replaceFilters({ category: c.slug });
                      })
                    }
                    aria-pressed={sheetCategory === c.slug}
                  >
                    {c.name}
                  </Chip>
                ))}
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Pricing
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRICING_OPTIONS.map((opt) => (
                  <Chip
                    key={opt.value || "all"}
                    selected={sheetPricing === opt.value}
                    onClick={() => {
                      setSheetPricing(opt.value);
                      replaceFilters({ pricing: opt.value });
                    }}
                    onKeyDown={(e) =>
                      onSheetChipKeyDown(e, () => {
                        setSheetPricing(opt.value);
                        replaceFilters({ pricing: opt.value });
                      })
                    }
                    aria-pressed={sheetPricing === opt.value}
                  >
                    {opt.label}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-3">
              <button
                type="button"
                onClick={() => {
                  clearAll();
                }}
                className="min-h-11 px-1 text-sm text-muted underline-offset-2 transition hover:text-charcoal hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={closeSheet}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-wood px-5 text-[0.78rem] font-medium uppercase tracking-[0.04em] text-white transition hover:bg-wood-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood"
              >
                Show {resultCount} results
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Chip({
  selected,
  children,
  onClick,
  onKeyDown,
  "aria-pressed": ariaPressed,
}: {
  selected: boolean;
  children: ReactNode;
  onClick: () => void;
  onKeyDown?: (e: ReactKeyboardEvent) => void;
  "aria-pressed"?: boolean;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      aria-pressed={ariaPressed ?? selected}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`inline-flex h-10 shrink-0 snap-start items-center whitespace-nowrap rounded-full px-4 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood ${
        selected
          ? "bg-wood text-white"
          : "border border-border bg-surface text-charcoal hover:border-wood/40"
      }`}
    >
      {children}
    </button>
  );
}

function RemovableChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-sm text-charcoal transition hover:border-wood/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood"
      aria-label={`Remove ${label} filter`}
    >
      <span className="max-w-[10rem] truncate">{label}</span>
      <ClearIcon />
    </button>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M20 20l-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M3 3l6 6M9 3 3 9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 8h10M18 8h2M4 16h2M10 16h10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="16" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="8" cy="16" r="2.25" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
