export const siteConfig = {
  name: "West Home Furniture Dubai",
  shortName: "West Home",
  description:
    "West Home Furniture Dubai — customised sofas, beds, chaises and curtains. Style your home, live better. Hessa Street, Al Barsha. Open daily 9:00 AM – 9:00 PM.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_AE",
};

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}
