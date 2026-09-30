import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "wood-outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-wood text-white hover:bg-wood-hover disabled:bg-wood-soft disabled:text-white/80",
  secondary:
    "bg-charcoal text-white hover:bg-charcoal/90 disabled:bg-charcoal/40",
  ghost:
    "bg-transparent text-charcoal hover:bg-stone-deep disabled:text-muted",
  "wood-outline":
    "border border-wood text-wood hover:bg-wood hover:text-white disabled:opacity-50",
};

const sizes: Record<Size, string> = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  external?: boolean;
  onClick?: () => void;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  external,
  onClick,
}: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
