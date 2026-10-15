import Image from "next/image";
import Link from "next/link";

type Props = {
  href?: string;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
  variant?: "header" | "footer";
  tone?: "dark" | "light";
  compact?: boolean;
};

export function Logo({
  href = "/",
  className = "",
  priority,
  onClick,
  variant = "header",
  tone = "dark",
  compact = false,
}: Props) {
  const isHeader = variant === "header";
  const src = !isHeader
    ? "/images/logo.png"
    : tone === "light"
      ? "/images/logo-nav-light.png"
      : "/images/logo-header.png";

  const sizes = compact
    ? "h-8.5 w-auto sm:h-9.5"
    : isHeader
      ? "h-12 w-auto sm:h-[3.25rem] lg:h-14"
      : "h-14 w-auto sm:h-16";

  const image = (
    <Image
      src={src}
      alt="West Home Furniture — Style your home, live better"
      width={800}
      height={620}
      priority={priority}
      className={`${sizes} object-contain object-left ${className}`}
    />
  );

  if (!href) return image;

  return (
    <Link
      href={href}
      onClick={onClick}
      className="inline-flex shrink-0 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood"
      aria-label="West Home Furniture home"
    >
      {image}
    </Link>
  );
}
