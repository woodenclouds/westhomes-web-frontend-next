import Link from "next/link";
import { Button, ButtonLink } from "./Button";

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
}: {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="rounded-sm border border-dashed border-border bg-surface px-6 py-14 text-center">
      <h2 className="font-display text-2xl text-charcoal">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-muted">{description}</p>
      {actionHref && actionLabel ? (
        <div className="mt-6">
          <ButtonLink href={actionHref} variant="wood-outline">
            {actionLabel}
          </ButtonLink>
        </div>
      ) : null}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description = "We could not load this content. Please try again.",
  onRetry,
  retryHref,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryHref?: string;
}) {
  return (
    <div
      className="rounded-sm border border-error/30 bg-surface px-6 py-12 text-center"
      role="alert"
    >
      <h2 className="font-display text-2xl text-charcoal">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-muted">{description}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {onRetry ? (
          <Button type="button" onClick={onRetry} variant="primary">
            Try again
          </Button>
        ) : null}
        {retryHref ? (
          <ButtonLink href={retryHref} variant="wood-outline">
            Try again
          </ButtonLink>
        ) : null}
        <Link href="/" className="text-sm text-wood underline-offset-4 hover:underline">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export function StatusMessage({
  tone,
  title,
  children,
}: {
  tone: "success" | "error" | "info";
  title: string;
  children?: React.ReactNode;
}) {
  const tones = {
    success: "border-success/30 bg-success/5 text-success",
    error: "border-error/30 bg-error/5 text-error",
    info: "border-wood/30 bg-wood/5 text-wood",
  };
  return (
    <div className={`rounded-sm border px-4 py-3 ${tones[tone]}`} role="status">
      <p className="font-medium">{title}</p>
      {children ? <div className="mt-1 text-sm text-charcoal/80">{children}</div> : null}
    </div>
  );
}
