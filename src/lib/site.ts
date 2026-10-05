export const siteConfig = {
  name: "West Home Furniture Dubai",
  shortName: "West Home",
  description:
    "West Home Furniture Dubai offers stylish and comfortable furniture for modern homes — quality sofas, beds, mattresses, bedroom and living room furniture, dining tables, coffee tables and more. Visit our Al Barsha showroom. We customise sofas, beds, club chairs and more.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_AE",
};

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}
