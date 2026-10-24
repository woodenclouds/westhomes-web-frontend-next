import type { ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";

type Value = {
  title: string;
  description: string;
};

function IconCircle({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-charcoal/85 text-charcoal">
      {children}
    </span>
  );
}

function ComfortIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 14V11.5A2.5 2.5 0 0 1 6.5 9h11A2.5 2.5 0 0 1 20 11.5V14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M3 14.5h18v2.2a1.3 1.3 0 0 1-1.3 1.3H4.3A1.3 1.3 0 0 1 3 16.7v-2.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M6 9V7.8A1.8 1.8 0 0 1 7.8 6h8.4A1.8 1.8 0 0 1 18 7.8V9M5 18v1.5M19 18v1.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EleganceIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5v5.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M8 9h8l-1.2 3.5H9.2L8 9Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 12.5 9.2 20.5h5.6L13.5 12.5M10 20.5h4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4.5 10.5 12 4.5l7.5 6V19a1.5 1.5 0 0 1-1.5 1.5h-3.5v-5.5h-5V20.5H6A1.5 1.5 0 0 1 4.5 19v-8.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function iconForValue(title: string, index: number): ReactNode {
  const key = title.toLowerCase();
  if (key.includes("comfort")) return <ComfortIcon />;
  if (key.includes("elegance") || key.includes("modern")) return <EleganceIcon />;
  if (key.includes("home") || key.includes("made")) return <HomeIcon />;
  const fallbacks = [<ComfortIcon key="c" />, <EleganceIcon key="e" />, <HomeIcon key="h" />];
  return fallbacks[index % 3];
}

export function AboutValues({
  eyebrow = "What we stand for",
  title,
  values,
}: {
  eyebrow?: string;
  title: string;
  values: Value[];
}) {
  return (
    <section className="border-y border-border bg-background py-10 md:py-14">
      <div className="container-page">
        <ScrollReveal className="text-center">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl text-charcoal md:text-4xl capitalize">
            {title}
          </h2>
        </ScrollReveal>

        <ul className="mx-auto mt-8 grid max-w-6xl gap-4 sm:grid-cols-2 sm:gap-5 md:mt-10 lg:grid-cols-3 lg:gap-5">
          {values.map((value, i) => (
            <li key={value.title} className="h-full">
              <ScrollReveal delay={i * 80} className="h-full">
                <div className="flex h-full flex-col rounded-[1.5rem] border border-border bg-surface p-6 shadow-sm sm:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <IconCircle>{iconForValue(value.title, i)}</IconCircle>
                    <span className="font-display text-3xl leading-none text-wood/70">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl text-charcoal">
                    {value.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
