import type {
  AboutContent,
  Category,
  CmsAdapter,
  EnquiryPayload,
  EnquiryResult,
  GalleryItem,
  HomeContent,
  Product,
  ProductSpec,
  SiteContact,
} from "../types";

type WoQuickEntry = Record<string, unknown> & {
  id?: number | string;
  slug?: string;
};

type WoQuickListResponse = {
  data: WoQuickEntry[];
  meta?: {
    pagination?: {
      enabled?: boolean;
      page?: number;
      page_size?: number;
      page_count?: number;
      total?: number;
    };
  };
};

type WoQuickSingleResponse = {
  data: WoQuickEntry;
};

function cmsBaseUrl(): string {
  const base =
    process.env.CMS_API_BASE ??
    process.env.NEXT_PUBLIC_CMS_API_URL ??
    "";
  if (!base) {
    throw new Error(
      "CMS_API_BASE (or NEXT_PUBLIC_CMS_API_URL) is not configured",
    );
  }
  return base.replace(/\/$/, "");
}

/**
 * Public catalogue/enquiry endpoints must not send Authorization.
 * An invalid Bearer token causes WoQuick to return 403 even on public GETs.
 */
function authHeaders(includeAuth: boolean): HeadersInit {
  if (!includeAuth) return {};
  const token = process.env.CMS_API_TOKEN ?? process.env.WOQUICK_CMS_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function cmsFetch<T>(
  path: string,
  init?: RequestInit & { cache?: RequestCache; auth?: boolean },
): Promise<T> {
  const { auth = false, ...requestInit } = init ?? {};
  const method = requestInit.method ?? "GET";
  const isMutation = method !== "GET" && method !== "HEAD";

  const res = await fetch(`${cmsBaseUrl()}${path}`, {
    ...requestInit,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(auth),
      ...(requestInit.headers ?? {}),
    },
    ...(isMutation
      ? { cache: "no-store" as const }
      : { next: { revalidate: 60 } }),
  });

  if (!res.ok) {
    throw new Error(`CMS request failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

async function fetchAllEntries(typeSlug: string): Promise<WoQuickEntry[]> {
  const first = await cmsFetch<WoQuickListResponse>(`/${typeSlug}/`);
  const items = [...(first.data ?? [])];
  const pagination = first.meta?.pagination;
  const pageCount = pagination?.page_count ?? 1;

  for (let page = 2; page <= pageCount; page += 1) {
    const next = await cmsFetch<WoQuickListResponse>(
      `/${typeSlug}/?page=${page}`,
    );
    items.push(...(next.data ?? []));
  }

  return items;
}

function asString(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return fallback;
}

function asBoolean(value: unknown): boolean {
  return value === true || value === "true" || value === 1;
}

function asNumberOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

function parseJsonField<T>(value: unknown, fallback: T): T {
  if (value == null || value === "") return fallback;
  if (typeof value === "object") return value as T;
  if (typeof value !== "string") return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function relationSlug(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null && "slug" in value) {
    return asString((value as { slug?: unknown }).slug);
  }
  return "";
}

function relationSlugs(value: unknown): string[] {
  if (value == null || value === "") return [];
  if (Array.isArray(value)) {
    return value.map(relationSlug).filter(Boolean);
  }
  const one = relationSlug(value);
  return one ? [one] : [];
}

function mediaUrl(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null && "url" in value) {
    return asString((value as { url?: unknown }).url);
  }
  return "";
}

function mapCategory(entry: WoQuickEntry): Category {
  return {
    id: asString(entry.id) || asString(entry.slug),
    name: asString(entry.name),
    slug: asString(entry.slug),
    description: asString(entry.description),
    imageUrl: asString(entry.image_url),
  };
}

function mapProduct(entry: WoQuickEntry): Product {
  const categorySlug = relationSlug(entry.category);
  const gallery = parseJsonField<string[]>(entry.gallery, []);
  const specs = parseJsonField<ProductSpec[]>(entry.specs, []);

  return {
    id: asString(entry.id) || asString(entry.slug),
    slug: asString(entry.slug),
    name: asString(entry.name),
    categoryId: categorySlug || asString(entry.category_id),
    categoryName: asString(entry.category_name),
    shortDescription: asString(entry.short_description),
    description: asString(entry.description),
    imageUrl: mediaUrl(entry.image) || asString(entry.image_url),
    gallery: Array.isArray(gallery) ? gallery.map((u) => asString(u)) : [],
    specs: Array.isArray(specs)
      ? specs.map((s) => ({
          label: asString(s.label),
          value: asString(s.value),
        }))
      : [],
    featured: asBoolean(entry.featured),
    customisable: asBoolean(entry.customisable),
    price: asNumberOrNull(entry.price),
    priceNote: asString(entry.price_note) || undefined,
  };
}

function mapGalleryItem(entry: WoQuickEntry): GalleryItem {
  return {
    id: asString(entry.id) || asString(entry.slug),
    title: asString(entry.title),
    imageUrl: mediaUrl(entry.image) || asString(entry.image_url),
    category: asString(entry.category) || undefined,
    alt: asString(entry.alt) || asString(entry.title),
  };
}

function mapHomeValueProps(entry: WoQuickEntry): HomeContent["valueProps"] {
  const fromCards: HomeContent["valueProps"] = [];
  for (const index of [1, 2, 3] as const) {
    const title = asString(entry[`value_${index}_title`]);
    const description = asString(entry[`value_${index}_text`]);
    if (title || description) {
      fromCards.push({ title, description });
    }
  }
  if (fromCards.length > 0) return fromCards;

  const valueProps = parseJsonField<HomeContent["valueProps"]>(
    entry.value_props,
    [],
  );
  return Array.isArray(valueProps) ? valueProps : [];
}

function mapHome(entry: WoQuickEntry): HomeContent {
  return {
    heroHeadline: asString(entry.hero_headline),
    heroSupport: asString(entry.hero_support),
    heroImageUrl:
      mediaUrl(entry.banner_image) || asString(entry.hero_image_url),
    introTitle: asString(entry.intro_title),
    introBody: asString(entry.intro_body),
    introImageUrl: mediaUrl(entry.intro_image) || undefined,
    featuredTitle: asString(entry.featured_title) || undefined,
    featuredText: asString(entry.featured_text) || undefined,
    featuredProductSlugs: relationSlugs(entry.featured_products),
    customisableTitle: asString(entry.customisable_title) || undefined,
    customisableText: asString(entry.customisable_text) || undefined,
    customisableProductSlugs: relationSlugs(entry.customisable_products),
    valueProps: mapHomeValueProps(entry),
  };
}

function mapAbout(entry: WoQuickEntry): AboutContent {
  return {
    title: asString(entry.title),
    intro: asString(entry.intro),
    body: asString(entry.body),
    values: parseJsonField(entry.values, []),
    process: parseJsonField(entry.process, []),
    offerings: parseJsonField(entry.offerings, []),
    imageUrl: asString(entry.image_url),
    craftImageUrl: asString(entry.craft_image_url),
  };
}

function mapContact(entry: WoQuickEntry): SiteContact {
  return {
    companyName: asString(entry.company_name),
    address: asString(entry.address),
    phone:
      process.env.NEXT_PUBLIC_CONTACT_PHONE ?? asString(entry.phone),
    email:
      process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? asString(entry.email),
    whatsappNumber:
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ??
      asString(entry.whatsapp_number),
    mapEmbedUrl: asString(entry.map_embed_url) || undefined,
    socialLinks: parseJsonField(entry.social_links, []),
  };
}

export const apiAdapter: CmsAdapter = {
  async getHomeContent() {
    const res = await cmsFetch<WoQuickSingleResponse>("/home/");
    return mapHome(res.data);
  },

  async getAboutContent() {
    const res = await cmsFetch<WoQuickSingleResponse>("/about/");
    return mapAbout(res.data);
  },

  async getContact() {
    const res = await cmsFetch<WoQuickSingleResponse>("/contact/");
    return mapContact(res.data);
  },

  async getCategories() {
    const entries = await fetchAllEntries("categories");
    return entries.map(mapCategory);
  },

  async getProducts(params) {
    let list = (await fetchAllEntries("products")).map(mapProduct);

    if (params?.featured) {
      list = list.filter((p) => p.featured);
    }
    if (typeof params?.customisable === "boolean") {
      list = list.filter((p) => p.customisable === params.customisable);
    }
    if (params?.categorySlug) {
      list = list.filter((p) => p.categoryId === params.categorySlug);
    }
    if (params?.search?.trim()) {
      const q = params.search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q),
      );
    }

    return list;
  },

  async getProductBySlug(slug) {
    try {
      const res = await cmsFetch<WoQuickSingleResponse>(
        `/products/${encodeURIComponent(slug)}/`,
      );
      return mapProduct(res.data);
    } catch {
      return null;
    }
  },

  async getRelatedProducts(productId, limit = 3) {
    const products = (await fetchAllEntries("products")).map(mapProduct);
    const current =
      products.find((p) => p.id === productId) ??
      products.find((p) => p.slug === productId);
    if (!current) return [];
    return products
      .filter(
        (p) =>
          p.id !== current.id &&
          p.slug !== current.slug &&
          p.categoryId === current.categoryId,
      )
      .slice(0, limit);
  },

  async getGallery() {
    const entries = await fetchAllEntries("gallery");
    return entries.map(mapGalleryItem);
  },

  async submitEnquiry(payload: EnquiryPayload) {
    const body: Record<string, unknown> = {
      name: payload.name,
      phone: payload.phone,
      type: payload.type,
      message: payload.message,
    };
    if (payload.email) body.email = payload.email;
    if (payload.productId) body.product_id = payload.productId;
    if (payload.productName) body.product_name = payload.productName;
    if (payload.preferredDate) body.preferred_date = payload.preferredDate;

    const res = await cmsFetch<WoQuickSingleResponse>("/enquiries/", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const entry = res.data;
    const reference =
      asString(entry.slug) ||
      (entry.id != null ? `WH-${entry.id}` : `WH-${Date.now().toString(36)}`);

    return {
      reference,
      status: "NEW",
    } satisfies EnquiryResult;
  },
};
