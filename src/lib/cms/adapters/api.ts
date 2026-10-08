import type {
  AboutContent,
  Category,
  CmsAdapter,
  EnquiryPayload,
  EnquiryResult,
  EnquirePageContent,
  GalleryItem,
  GalleryPageContent,
  HomeContent,
  Product,
  ProductsPageContent,
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
    morePhotoSlugs: relationSlugs(entry.more_photos),
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
    slug: asString(entry.slug) || asString(entry.id),
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
    bannerPhotoSlugs: relationSlugs(entry.banner_photos),
    previewImageSlugs: relationSlugs(entry.preview_images),
    valueProps: mapHomeValueProps(entry),
  };
}

function titledCards(
  entry: WoQuickEntry,
  prefix: string,
  count: number,
): { title: string; description: string }[] {
  const cards: { title: string; description: string }[] = [];
  for (let index = 1; index <= count; index += 1) {
    const title = asString(entry[`${prefix}_${index}_title`]);
    const description = asString(entry[`${prefix}_${index}_text`]);
    if (title || description) cards.push({ title, description });
  }
  return cards;
}

function mapAbout(entry: WoQuickEntry): AboutContent {
  const valueCards = titledCards(entry, "value", 3);
  const processCards = titledCards(entry, "process", 3);
  const offerings = [1, 2, 3, 4, 5, 6]
    .map((index) => asString(entry[`offering_${index}`]))
    .filter(Boolean);
  return {
    title: asString(entry.title),
    intro: asString(entry.intro),
    body: asString(entry.body),
    values: valueCards.length ? valueCards : parseJsonField(entry.values, []),
    process: processCards.length
      ? processCards
      : parseJsonField(entry.process, []),
    offerings: offerings.length ? offerings : parseJsonField(entry.offerings, []),
    imageUrl: mediaUrl(entry.hero_image) || asString(entry.image_url),
    craftImageUrl: mediaUrl(entry.craft_image) || asString(entry.craft_image_url),
    quote: asString(entry.quote) || undefined,
    heroText: asString(entry.hero_text) || undefined,
    showroomTitle: asString(entry.showroom_title) || undefined,
    showroomHours: asString(entry.showroom_hours) || undefined,
    showroomText: asString(entry.showroom_text) || undefined,
    processTitle: asString(entry.process_title) || undefined,
    processIntro: asString(entry.process_intro) || undefined,
    valuesTitle: asString(entry.values_title) || undefined,
    offeringsTitle: asString(entry.offerings_title) || undefined,
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
    pageTitle: asString(entry.page_title) || undefined,
    pageIntro: asString(entry.page_intro) || undefined,
    hours: asString(entry.hours) || undefined,
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

  async getProductsPage() {
    try {
      const res = await cmsFetch<WoQuickSingleResponse>("/products-page/");
      const entry = res.data;
      return {
        title: asString(entry.title) || "Products",
        intro:
          asString(entry.intro) ||
          "Browse sofas, beds, mattresses, living room and bedroom furniture, dining and coffee tables — then enquire on WhatsApp with the piece you love.",
        customisableTitle:
          asString(entry.customisable_title) || "Customisable products",
        customisableText:
          asString(entry.customisable_text) ||
          "We customise sofas, beds, club chairs and more — choose fabric, size and finish with our team. Many pieces are priced after enquiry.",
        showroomTitle: asString(entry.showroom_title) || "Ready pieces",
        showroomText:
          asString(entry.showroom_text) ||
          "Living room and bedroom furniture priced as shown in our Al Barsha showroom — with custom options when you need them.",
      } satisfies ProductsPageContent;
    } catch {
      return {
        title: "Products",
        intro:
          "Browse sofas, beds, mattresses, living room and bedroom furniture, dining and coffee tables — then enquire on WhatsApp with the piece you love.",
        customisableTitle: "Customisable products",
        customisableText:
          "We customise sofas, beds, club chairs and more — choose fabric, size and finish with our team. Many pieces are priced after enquiry.",
        showroomTitle: "Ready pieces",
        showroomText:
          "Living room and bedroom furniture priced as shown in our Al Barsha showroom — with custom options when you need them.",
      };
    }
  },

  async getGalleryPage() {
    try {
      const res = await cmsFetch<WoQuickSingleResponse>("/gallery-page/");
      const entry = res.data;
      return {
        title: asString(entry.title) || "Gallery",
        intro:
          asString(entry.intro) ||
          "Modern living and bedroom settings from our Al Barsha showroom. New images appear here as they are added.",
      } satisfies GalleryPageContent;
    } catch {
      return {
        title: "Gallery",
        intro:
          "Modern living and bedroom settings from our Al Barsha showroom. New images appear here as they are added.",
      };
    }
  },

  async getEnquirePage() {
    try {
      const res = await cmsFetch<WoQuickSingleResponse>("/enquire-page/");
      const entry = res.data;
      return {
        title: asString(entry.title) || "Tell us what you need",
        intro:
          asString(entry.intro) ||
          "A sofa, bed, club chair, dining set, or a showroom visit. After you send this, WhatsApp opens with your details so we can reply quickly.",
      } satisfies EnquirePageContent;
    } catch {
      return {
        title: "Tell us what you need",
        intro:
          "A sofa, bed, club chair, dining set, or a showroom visit. After you send this, WhatsApp opens with your details so we can reply quickly.",
      };
    }
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
