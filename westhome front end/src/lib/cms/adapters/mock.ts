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

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const categories: Category[] = [
  {
    id: "cat-living",
    name: "Living Room",
    slug: "living-room",
    description: "Sofas, coffee tables and statement seating for everyday living.",
    imageUrl: img("photo-1555041469-a586c61ea9bc", 900),
  },
  {
    id: "cat-dining",
    name: "Dining",
    slug: "dining",
    description: "Tables and chairs crafted for shared meals and gatherings.",
    imageUrl: img("photo-1617806118233-18e1de247200", 900),
  },
  {
    id: "cat-bedroom",
    name: "Bedroom",
    slug: "bedroom",
    description: "Beds, wardrobes and nightstands for calm restful spaces.",
    imageUrl: img("photo-1505693416388-ac5ce068fe85", 900),
  },
  {
    id: "cat-office",
    name: "Office",
    slug: "office",
    description: "Desks and storage that balance focus and comfort.",
    imageUrl: img("photo-1518455027359-f3f8164ba9bd", 900),
  },
];

const products: Product[] = [
  {
    id: "prd-001",
    slug: "barsha-sectional-sofa",
    name: "Barsha Sectional Sofa",
    categoryId: "cat-living",
    categoryName: "Living Room",
    shortDescription: "Deep-seat sectional with warm oak legs and soft linen upholstery.",
    description:
      "The Barsha Sectional is designed for generous lounging. Solid oak framing, high-resilience foam, and removable covers make it practical for Dubai living while keeping a quiet, refined silhouette.",
    imageUrl: img("photo-1555041469-a586c61ea9bc"),
    gallery: [
      img("photo-1555041469-a586c61ea9bc"),
      img("photo-1493663284031-b7e3aefcae8e"),
      img("photo-1567538096630-e0c55bd6374c"),
    ],
    specs: [
      { label: "Dimensions", value: "320 × 180 × 85 cm" },
      { label: "Materials", value: "Oak, linen blend, high-density foam" },
      { label: "Finish", value: "Natural oak / warm grey linen" },
    ],
    featured: true,
  },
  {
    id: "prd-002",
    slug: "hesa-dining-table",
    name: "Hesa Dining Table",
    categoryId: "cat-dining",
    categoryName: "Dining",
    shortDescription: "Solid walnut dining table for eight with a sculpted pedestal base.",
    description:
      "Named for Hessa Street, the Hesa Dining Table balances presence and calm. A thick walnut top sits on a carved pedestal, seating eight comfortably for family dinners and entertaining.",
    imageUrl: img("photo-1617806118233-18e1de247200"),
    gallery: [
      img("photo-1617806118233-18e1de247200"),
      img("photo-1615066390971-03e4e1c36ddf"),
      img("photo-1595428774223-ef52624120d2"),
    ],
    specs: [
      { label: "Dimensions", value: "220 × 100 × 76 cm" },
      { label: "Materials", value: "Solid walnut" },
      { label: "Seats", value: "8" },
    ],
    featured: true,
  },
  {
    id: "prd-003",
    slug: "al-barsha-platform-bed",
    name: "Al Barsha Platform Bed",
    categoryId: "cat-bedroom",
    categoryName: "Bedroom",
    shortDescription: "Low oak platform bed with integrated side ledges.",
    description:
      "A low, grounded platform bed with clean lines and integrated ledges for books or a lamp. Built from solid oak with a soft matt finish that suits warm, light-filled bedrooms.",
    imageUrl: img("photo-1505693416388-ac5ce068fe85"),
    gallery: [
      img("photo-1505693416388-ac5ce068fe85"),
      img("photo-1522771739844-6a9f6d5f14af"),
      img("photo-1616594039964-ae9021a400a0"),
    ],
    specs: [
      { label: "Size", value: "King (180 × 200 cm)" },
      { label: "Materials", value: "Solid oak" },
      { label: "Finish", value: "Matt natural oil" },
    ],
    featured: true,
  },
  {
    id: "prd-004",
    slug: "marina-lounge-chair",
    name: "Marina Lounge Chair",
    categoryId: "cat-living",
    categoryName: "Living Room",
    shortDescription: "Curved lounge chair with bouclé upholstery and brass accents.",
    description:
      "A compact lounge chair with a softly curved back and tactile bouclé fabric. Brass-tipped timber legs add a quiet accent without distracting from the form.",
    imageUrl: img("photo-1567538096630-e0c55bd6374c"),
    gallery: [
      img("photo-1567538096630-e0c55bd6374c"),
      img("photo-1586023492125-27b2c045efd7"),
    ],
    specs: [
      { label: "Dimensions", value: "78 × 82 × 80 cm" },
      { label: "Materials", value: "Timber, bouclé, brass" },
    ],
    featured: false,
  },
  {
    id: "prd-005",
    slug: "studio-work-desk",
    name: "Studio Work Desk",
    categoryId: "cat-office",
    categoryName: "Office",
    shortDescription: "Minimal oak desk with cable management and soft drawer fronts.",
    description:
      "Designed for focused work at home. Cable routing keeps screens and chargers tidy, while soft-close drawers hide everyday clutter behind flush oak fronts.",
    imageUrl: img("photo-1518455027359-f3f8164ba9bd"),
    gallery: [
      img("photo-1518455027359-f3f8164ba9bd"),
      img("photo-1593062096033-9a2e465c058b"),
    ],
    specs: [
      { label: "Dimensions", value: "140 × 70 × 75 cm" },
      { label: "Materials", value: "Oak veneer, solid oak legs" },
    ],
    featured: true,
  },
  {
    id: "prd-006",
    slug: "dusk-sideboard",
    name: "Dusk Sideboard",
    categoryId: "cat-dining",
    categoryName: "Dining",
    shortDescription: "Long sideboard with fluted doors and soft-close hardware.",
    description:
      "Fluted doors catch the light across a long, low silhouette. Ideal for dining rooms or entryways that need storage without visual noise.",
    imageUrl: img("photo-1595428774223-ef52624120d2"),
    gallery: [
      img("photo-1595428774223-ef52624120d2"),
      img("photo-1615066390971-03e4e1c36ddf"),
    ],
    specs: [
      { label: "Dimensions", value: "180 × 45 × 80 cm" },
      { label: "Materials", value: "Oak, soft-close hinges" },
    ],
    featured: false,
  },
];

const gallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Living room vignette",
    imageUrl: img("photo-1618221195710-dd6b41faaea6"),
    category: "Living Room",
    alt: "Modern living room with sofa and natural light",
  },
  {
    id: "gal-2",
    title: "Dining setting",
    imageUrl: img("photo-1617806118233-18e1de247200"),
    category: "Dining",
    alt: "Walnut dining table set for eight",
  },
  {
    id: "gal-3",
    title: "Bedroom calm",
    imageUrl: img("photo-1505693416388-ac5ce068fe85"),
    category: "Bedroom",
    alt: "Minimal oak platform bed in a bright bedroom",
  },
  {
    id: "gal-4",
    title: "Home office",
    imageUrl: img("photo-1518455027359-f3f8164ba9bd"),
    category: "Office",
    alt: "Clean oak desk in a home office",
  },
  {
    id: "gal-5",
    title: "Lounge corner",
    imageUrl: img("photo-1586023492125-27b2c045efd7"),
    category: "Living Room",
    alt: "Lounge chair beside a window with soft textiles",
  },
  {
    id: "gal-6",
    title: "Material detail",
    imageUrl: img("photo-1493663284031-b7e3aefcae8e"),
    category: "Details",
    alt: "Close-up of furniture upholstery and wood grain",
  },
];

const homeContent: HomeContent = {
  heroHeadline: "Furniture shaped for how you live",
  heroSupport:
    "WestHome designs and curates refined pieces for Dubai homes — from Hessa Street showroom to your living space.",
  heroImageUrl: img("photo-1618221195710-dd6b41faaea6", 2000),
  introTitle: "Crafted presence, everyday comfort",
  introBody:
    "Based on Hessa Street in Al Barsha, WestHome Furniture brings together solid materials, quiet proportions and pieces made for real homes — not showrooms alone.",
  valueProps: [
    {
      title: "Material honesty",
      description: "Solid timber, tactile fabrics and finishes chosen to age with character.",
    },
    {
      title: "Showroom guidance",
      description: "Visit our Al Barsha space or enquire online — we help you find the right fit.",
    },
    {
      title: "Enquiry-led service",
      description: "No impersonal checkout. Talk to us about sizing, finishes and delivery.",
    },
  ],
};

const aboutContent: AboutContent = {
  title: "About WestHome",
  intro:
    "WestHome Furniture is a Dubai furniture house focused on calm, lasting interiors for living, dining, sleeping and working.",
  body: "From our showroom on Hessa Street in Al Barsha, we present thoughtfully selected collections and custom-friendly pieces. Whether you are furnishing a new apartment or refining a family home, we favour clear design, honest materials and a personal enquiry process over transactional shopping.",
  values: [
    {
      title: "Quiet design",
      description: "Forms that stay relevant — proportion first, decoration second.",
    },
    {
      title: "Local presence",
      description: "A Dubai showroom team ready to advise on scale, finish and layout.",
    },
    {
      title: "Personal follow-through",
      description: "Every enquiry is tracked so we can respond with care and clarity.",
    },
  ],
  imageUrl: img("photo-1616486338812-3dadae4b4ace"),
};

const contact: SiteContact = {
  companyName: "West Home Furniture",
  address: "Hessa Street, Al Barsha, Dubai, UAE",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+971 50 123 4567",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@westhomefurniture.ae",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971501234567",
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=55.18%2C25.09%2C55.22%2C25.12&layer=mapnik",
  socialLinks: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
  ],
};

function delay(ms = 280) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeReference(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  return `WH-${stamp.slice(-8)}`;
}

const enquiryStore: { reference: string; payload: EnquiryPayload }[] = [];

export const mockAdapter: CmsAdapter = {
  async getHomeContent() {
    await delay();
    return homeContent;
  },

  async getAboutContent() {
    await delay();
    return aboutContent;
  },

  async getContact() {
    await delay();
    return contact;
  },

  async getCategories() {
    await delay();
    return categories;
  },

  async getProducts(params) {
    await delay();
    let list = [...products];
    if (params?.featured) {
      list = list.filter((p) => p.featured);
    }
    if (params?.categorySlug) {
      const cat = categories.find((c) => c.slug === params.categorySlug);
      if (cat) list = list.filter((p) => p.categoryId === cat.id);
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
    await delay();
    return products.find((p) => p.slug === slug) ?? null;
  },

  async getRelatedProducts(productId, limit = 3) {
    await delay();
    const current = products.find((p) => p.id === productId);
    if (!current) return [];
    return products
      .filter((p) => p.id !== productId && p.categoryId === current.categoryId)
      .slice(0, limit);
  },

  async getGallery() {
    await delay();
    return gallery;
  },

  async submitEnquiry(payload): Promise<EnquiryResult> {
    await delay(400);
    const reference = makeReference();
    enquiryStore.push({ reference, payload });
    return { reference, status: "NEW" };
  },
};
