import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl text-charcoal md:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page or product you are looking for is unavailable. It may have been
        moved or removed from the catalogue.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Back home</ButtonLink>
        <ButtonLink href="/products" variant="wood-outline">
          Browse products
        </ButtonLink>
      </div>
    </div>
  );
}
