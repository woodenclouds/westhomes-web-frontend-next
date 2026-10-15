import React from "react";

interface TickerBannerProps {
  items?: string[];
  className?: string;
}

const DEFAULT_ITEMS: string[] = [
  "Bespoke Sofas & Custom Furniture",
  "Al Barsha Showroom • Open Daily 9AM – 9PM",
  "White-Glove Delivery Across UAE",
  "Made To Order — Premium Fabrics & Sizing",
  "Handcrafted Luxury For Modern Homes",
  "Complimentary Design & Fabric Consultation",
  "Living, Bedroom & Dining Collections",
];

export function TickerBanner({ items = DEFAULT_ITEMS, className = "" }: TickerBannerProps) {
  // Use provided items or default brand highlights
  const baseItems = items.length > 0 ? items : DEFAULT_ITEMS;
  
  // Duplicate baseItems twice per track so even on ultra-wide screens (4K) the track is filled
  const trackItems = [...baseItems, ...baseItems];

  return (
    <aside
      aria-label="West Home Showroom Highlights"
      className={`ticker-container relative w-full overflow-hidden border-y border-white/10 bg-charcoal py-3.5 select-none md:py-4 ${className}`}
    >
      {/* Screen-reader accessible list for WCAG compliance */}
      <div className="sr-only">
        <h2>West Home Furniture Highlights</h2>
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
                className="mx-5 h-1.5 w-1.5 shrink-0 rounded-full bg-wood sm:mx-7 md:mx-8"
                aria-hidden="true"
              />
              <span className="whitespace-nowrap font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-stone/90 transition-colors duration-200 hover:text-white sm:text-xs md:text-[13px]">
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
                className="mx-5 h-1.5 w-1.5 shrink-0 rounded-full bg-wood sm:mx-7 md:mx-8"
                aria-hidden="true"
              />
              <span className="whitespace-nowrap font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-stone/90 transition-colors duration-200 hover:text-white sm:text-xs md:text-[13px]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
