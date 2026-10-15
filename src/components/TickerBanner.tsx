import React from "react";

interface TickerBannerProps {
  items?: string[];
  className?: string;
}

/**
 * Exact items from the reference design.
 * Can also be overridden with custom context items via the `items` prop.
 */
const DEFAULT_ITEMS: string[] = [
  "FREE SHIPPING WORLDWIDE",
  "50% OFF THIS WEEK",
  "NEW ARRIVALS JUST DROPPED",
  "ENJOY EXCLUSIVE DEALS AND DISCOUNTS.",
  "LIMITED STOCK AVAILABLE",
];

export function TickerBanner({
  items = DEFAULT_ITEMS,
  className = "",
}: TickerBannerProps) {
  const baseItems = items.length > 0 ? items : DEFAULT_ITEMS;

  // Duplicate items twice per track so tracks are wider than 4K screens for seamless loop
  const trackItems = [...baseItems, ...baseItems];

  return (
    <aside
      aria-label="Announcements and offers"
      className={`ticker-container relative flex h-[56px] w-full items-center overflow-hidden bg-[#151515] select-none ${className}`}
    >
      {/* Accessible list for screen readers */}
      <div className="sr-only">
        <h2>Announcements and offers</h2>
        <ul>
          {baseItems.map((item, index) => (
            <li key={`sr-${index}`}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Infinite Scrolling Marquee Track */}
      <div
        className="animate-marquee flex w-max items-center will-change-transform"
        aria-hidden="true"
      >
        {/* Track 1 */}
        <div className="flex shrink-0 items-center">
          {trackItems.map((item, index) => (
            <div key={`t1-${index}`} className="flex shrink-0 items-center">
              <span
                className="mx-6 h-1.5 w-1.5 shrink-0 rounded-full bg-white/90 sm:mx-8 md:mx-9"
                aria-hidden="true"
              />
              <span className="whitespace-nowrap font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-white sm:text-xs md:text-[12.5px]">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Track 2 (Identical duplicate for seamless 0-gap infinite loop) */}
        <div className="flex shrink-0 items-center">
          {trackItems.map((item, index) => (
            <div key={`t2-${index}`} className="flex shrink-0 items-center">
              <span
                className="mx-6 h-1.5 w-1.5 shrink-0 rounded-full bg-white/90 sm:mx-8 md:mx-9"
                aria-hidden="true"
              />
              <span className="whitespace-nowrap font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-white sm:text-xs md:text-[12.5px]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
