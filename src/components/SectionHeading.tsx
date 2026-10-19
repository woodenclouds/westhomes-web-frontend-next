export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  centered = false,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`max-w-2xl ${
        centered ? "mx-auto text-center" : ""
      } ${className}`}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2
        className={`font-display text-[1.75rem] leading-[1.1] sm:text-3xl md:text-[2.75rem] capitalize ${
          light ? "text-stone" : "text-charcoal"
        } ${eyebrow ? "mt-2.5 sm:mt-3" : ""}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-3 text-[0.95rem] leading-relaxed sm:mt-4 sm:text-base md:text-lg ${
            light ? "text-stone/75" : "text-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-2.5 font-display text-[2.25rem] leading-[1.08] text-charcoal sm:mt-3 sm:text-4xl md:text-6xl capitalize">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted sm:mt-4 sm:text-base md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
