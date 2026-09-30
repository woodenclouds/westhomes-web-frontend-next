export const siteConfig = {
  name: "WestHome Furniture",
  shortName: "WestHome",
  description:
    "Premium furniture for Dubai homes — living, dining, bedroom and office pieces from WestHome on Hessa Street, Al Barsha.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_AE",
};

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}
