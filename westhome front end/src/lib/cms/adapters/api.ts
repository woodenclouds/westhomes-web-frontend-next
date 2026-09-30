import type {
  AboutContent,
  Category,
  CmsAdapter,
  EnquiryPayload,
  EnquiryResult,
  GalleryItem,
  HomeContent,
  Product,
  SiteContact,
} from "../types";

/**
 * HTTP adapter for the existing Woodenclouds CMS.
 * Wire real paths once API docs are available — method signatures stay stable.
 */
async function cmsFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const base = process.env.NEXT_PUBLIC_CMS_API_URL;
  if (!base) {
    throw new Error("NEXT_PUBLIC_CMS_API_URL is not configured");
  }

  const res = await fetch(`${base.replace(/\/$/, "")}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`CMS request failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export const apiAdapter: CmsAdapter = {
  getHomeContent() {
    return cmsFetch<HomeContent>("/content/home");
  },

  getAboutContent() {
    return cmsFetch<AboutContent>("/content/about");
  },

  getContact() {
    return cmsFetch<SiteContact>("/content/contact");
  },

  getCategories() {
    return cmsFetch<Category[]>("/categories");
  },

  getProducts(params) {
    const qs = new URLSearchParams();
    if (params?.categorySlug) qs.set("category", params.categorySlug);
    if (params?.search) qs.set("search", params.search);
    if (params?.featured) qs.set("featured", "true");
    if (typeof params?.customisable === "boolean") {
      qs.set("customisable", String(params.customisable));
    }
    const query = qs.toString();
    return cmsFetch<Product[]>(`/products${query ? `?${query}` : ""}`);
  },

  getProductBySlug(slug) {
    return cmsFetch<Product | null>(`/products/${encodeURIComponent(slug)}`);
  },

  getRelatedProducts(productId, limit = 3) {
    return cmsFetch<Product[]>(
      `/products/${encodeURIComponent(productId)}/related?limit=${limit}`,
    );
  },

  getGallery() {
    return cmsFetch<GalleryItem[]>("/gallery");
  },

  submitEnquiry(payload: EnquiryPayload) {
    return cmsFetch<EnquiryResult>("/enquiries", {
      method: "POST",
      body: JSON.stringify(payload),
      next: { revalidate: 0 },
    });
  },
};
