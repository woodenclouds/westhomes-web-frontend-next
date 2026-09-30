import Image from "next/image";
import Link from "next/link";

type Props = {
  href?: string;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
  /** Light header vs dark footer treatment */
  variant?: "header" | "footer";
};

export function Logo({
  href = "/",
  className = "",
  priority,
  onClick,
  variant = "header",
}: Props) {
  const isHeader = variant === "header";
  // Transparent PNGs — no black plate. Header recolors white to charcoal for contrast.
  const src = isHeader ? "/images/logo-header.png" : "/images/logo.png";
  const sizes = isHeader
    ? "h-[4.75rem] w-auto sm:h-[5.5rem] md:h-24"
    : "h-[5rem] w-auto sm:h-[5.5rem]";

  const image = (
    <Image
      src={src}
      alt="West Home Furniture — Style your home, live better"
      width={800}
      height={620}
      priority={priority}
      className={`${sizes} object-contain drop-shadow-sm ${className}`}
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
