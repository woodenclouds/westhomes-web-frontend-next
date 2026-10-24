import type { ReactNode } from "react";

function IconCircle({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-charcoal/85 text-charcoal">
      {children}
    </span>
  );
}

function SofaIcon() {
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

function BedIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 17V9.5A1.5 1.5 0 0 1 4.5 8H9a3 3 0 0 1 3 3v1h7.5A1.5 1.5 0 0 1 21 13.5V17"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 14h18M5 17v2M19 17v2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BedroomIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="5"
        y="3.5"
        width="14"
        height="17"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M5 9.5h14M12 9.5v11M8.5 13v1.5M15.5 13v1.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChairIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 4.5h8v7.5H8V4.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 12h11v2.2a1.3 1.3 0 0 1-1.3 1.3H7.8A1.3 1.3 0 0 1 6.5 14.2V12Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 15.5 7 20M15.5 15.5 17 20M9.5 12V9.5M14.5 12V9.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TableIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 10h16v1.8H4V10Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M7 12v7M17 12v7M5.5 19h3M15.5 19h3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="12" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function CustomIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 16.5 5 19.5h4L7 16.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 15.2 14 5.5l2.4 1.4-5.8 9.7-2.4-1.4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M13.2 6.8l2.4 1.4M6 20.5h5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function iconForOffering(label: string): ReactNode {
  const key = label.toLowerCase();
  if (key.includes("custom") || key.includes("club")) {
    return <CustomIcon />;
  }
  if (key.includes("bedroom")) {
    return <BedroomIcon />;
  }
  if (key.includes("sofa") || key.includes("sectional")) {
    return <SofaIcon />;
  }
  if (key.includes("bed") || key.includes("mattress")) {
    return <BedIcon />;
  }
  if (key.includes("living")) {
    return <ChairIcon />;
  }
  if (key.includes("dining") || key.includes("coffee") || key.includes("table")) {
    return <TableIcon />;
  }
  return <ChairIcon />;
}

export function AboutOfferings({ offerings }: { offerings: string[] }) {
  return (
    <ul className="mx-auto mt-8 grid max-w-4xl gap-x-8 gap-y-8 sm:grid-cols-2 md:grid-cols-3 md:gap-y-10">
      {offerings.map((item) => (
        <li key={item} className="flex flex-col items-center text-center">
          <IconCircle>{iconForOffering(item)}</IconCircle>
          <p className="mt-3.5 max-w-[14rem] font-sans text-[0.95rem] font-medium leading-snug text-charcoal">
            {item}
          </p>
        </li>
      ))}
    </ul>
  );
}
