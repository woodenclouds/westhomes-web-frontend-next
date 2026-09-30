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

/** Local client photography from the Al Barsha showroom */
const img = (file: string) => `/images/${file}`;

const categories: Category[] = [
  {
    id: "cat-sofas",
    name: "Customised Sofas",
    slug: "sofas",
    description:
      "Sectionals, chaise sofas and lounge seating made to your fabric, size and layout.",
    imageUrl: img("sofa-beige-custom.jpg"),
  },
  {
    id: "cat-beds",
    name: "Beds & Chaises",
    slug: "beds",
    description:
      "Upholstered beds, chaise lounges and bedroom seating tailored for restful spaces.",
    imageUrl: img("bedroom-taupe.jpg"),
  },
  {
    id: "cat-seating",
    name: "Chairs & Ottomans",
    slug: "chairs",
    description:
      "Armchairs, ottomans and accent seating to complete your living room.",
    imageUrl: img("armchair-ottoman.jpg"),
  },
  {
    id: "cat-curtains",
    name: "Curtains",
    slug: "curtains",
    description:
      "Floor-to-ceiling curtains and soft furnishings coordinated with your furniture.",
    imageUrl: img("living-beige-sectional.jpg"),
  },
];

const products: Product[] = [
  {
    id: "prd-001",
    slug: "custom-beige-sectional",
    name: "Custom Beige Sectional",
    categoryId: "cat-sofas",
    categoryName: "Customised Sofas",
    shortDescription:
      "L-shaped sectional in warm beige — choose fabric, size and layout to suit your home.",
    description:
      "A contemporary L-shaped sectional designed for Dubai living. Deep cushions, slim metal legs and full fabric customisation so you can match colour, texture and configuration to your space. Visit our Al Barsha showroom to browse swatches and discuss dimensions.",
    imageUrl: img("sofa-beige-custom.jpg"),
    gallery: [
      img("sofa-beige-custom.jpg"),
      img("sofa-custom-swatches.jpg"),
      img("living-beige-sectional.jpg"),
    ],
    specs: [
      { label: "Style", value: "L-shaped sectional with chaise" },
      { label: "Customisation", value: "Fabric, size and configuration" },
      { label: "Base", value: "Slim black metal legs" },
    ],
    featured: true,
  },
  {
    id: "prd-002",
    slug: "boucle-showroom-sectional",
    name: "Bouclé Showroom Sectional",
    categoryId: "cat-sofas",
    categoryName: "Customised Sofas",
    shortDescription:
      "Plush cream bouclé L-shaped sofa with matching bolsters — available made to order.",
    description:
      "A soft, textured bouclé sectional with deep seating and rounded cushions. Ideal as a custom order in your preferred fabric family, sized for apartments or villas. Seen in our Hessa Street showroom.",
    imageUrl: img("showroom-boucle-sectional.jpg"),
    gallery: [
      img("showroom-boucle-sectional.jpg"),
      img("showroom-white-set.jpg"),
      img("showroom-brand-wall.jpg"),
    ],
    specs: [
      { label: "Style", value: "L-shaped sectional" },
      { label: "Upholstery", value: "Bouclé / textured cream (customisable)" },
      { label: "Extras", value: "Matching bolster cushions" },
    ],
    featured: true,
  },
  {
    id: "prd-003",
    slug: "powder-blue-cloud-sofa",
    name: "Powder Blue Cloud Sofa",
    categoryId: "cat-sofas",
    categoryName: "Customised Sofas",
    shortDescription:
      "Low, oversized modular sofa in soft powder blue — custom fabrics available.",
    description:
      "A low-profile cloud-style sofa with stacked cushions and a deep chaise. Soft powder blue is shown here; we can produce the same silhouette in fabrics and colours you select at the showroom.",
    imageUrl: img("sofa-powder-blue.jpg"),
    gallery: [img("sofa-powder-blue.jpg"), img("sofa-grey-chaise.jpg")],
    specs: [
      { label: "Style", value: "Modular / cloud sectional with chaise" },
      { label: "Shown colour", value: "Powder blue" },
      { label: "Customisation", value: "Fabric and dimensions on request" },
    ],
    featured: true,
  },
  {
    id: "prd-004",
    slug: "grey-chaise-sectional",
    name: "Grey Chaise Sectional",
    categoryId: "cat-sofas",
    categoryName: "Customised Sofas",
    shortDescription:
      "Light grey sectional with chaise — pair with curtains and tables from our collection.",
    description:
      "A calm light-grey sectional with deep cushions and a chaise. Customise the fabric and finish, and coordinate with West Home curtains and living accessories for a complete room.",
    imageUrl: img("sofa-grey-chaise.jpg"),
    gallery: [img("sofa-grey-chaise.jpg"), img("sofa-grey-green.jpg")],
    specs: [
      { label: "Style", value: "Sectional with chaise" },
      { label: "Shown colour", value: "Light grey" },
      { label: "Customisation", value: "Fabric, size, cushions" },
    ],
    featured: false,
  },
  {
    id: "prd-005",
    slug: "green-accent-living-set",
    name: "Green Accent Living Set",
    categoryId: "cat-sofas",
    categoryName: "Customised Sofas",
    shortDescription:
      "Grey sectional styled with green tropical cushions — customise colour stories with us.",
    description:
      "A versatile grey sectional shown with forest-green and tropical cushions. Bring your own colour story — we help you choose fabrics, throws and curtains that work together.",
    imageUrl: img("sofa-grey-green.jpg"),
    gallery: [img("sofa-grey-green.jpg"), img("showroom-brand-wall.jpg")],
    specs: [
      { label: "Style", value: "L-shaped sectional" },
      { label: "Accent options", value: "Cushions, throws, curtains" },
      { label: "Customisation", value: "Full fabric programme" },
    ],
    featured: false,
  },
  {
    id: "prd-006",
    slug: "lounge-armchair-ottoman",
    name: "Lounge Armchair & Ottoman",
    categoryId: "cat-seating",
    categoryName: "Chairs & Ottomans",
    shortDescription:
      "Oversized armchair with matching ottoman in oatmeal fabric — made to your finish.",
    description:
      "A deep lounge chair and ottoman set with flared arms and slim black legs. Customise fabric and scale for reading corners, bedrooms or living rooms.",
    imageUrl: img("armchair-ottoman.jpg"),
    gallery: [img("armchair-ottoman.jpg"), img("living-beige-sectional.jpg")],
    specs: [
      { label: "Includes", value: "Armchair + ottoman" },
      { label: "Shown fabric", value: "Oatmeal textured upholstery" },
      { label: "Customisation", value: "Fabric and dimensions" },
    ],
    featured: true,
  },
  {
    id: "prd-007",
    slug: "taupe-upholstered-bed",
    name: "Taupe Upholstered Bed",
    categoryId: "cat-beds",
    categoryName: "Beds & Chaises",
    shortDescription:
      "Tall upholstered platform bed with nightstands — customise fabric and finishes.",
    description:
      "A calm bedroom centrepiece with a tall vertically channelled headboard, coordinated bedding styling and paired nightstands. Fabric, bed size and curtain treatments can be customised through our showroom team.",
    imageUrl: img("bedroom-taupe.jpg"),
    gallery: [img("bedroom-taupe.jpg")],
    specs: [
      { label: "Style", value: "Upholstered platform bed" },
      { label: "Shown finish", value: "Taupe / sand fabric" },
      { label: "Customisation", value: "Fabric, size, matching curtains" },
    ],
    featured: true,
  },
  {
    id: "prd-008",
    slug: "custom-curtains-living",
    name: "Custom Living Curtains",
    categoryId: "cat-curtains",
    categoryName: "Curtains",
    shortDescription:
      "Floor-to-ceiling curtains coordinated with your sofa and room palette.",
    description:
      "West Home provides curtains and soft furnishings to complete the room — sheers, blackout options and fabrics matched to your customised sofa or bed. Measure and fabric selection available at our Al Barsha showroom.",
    imageUrl: img("living-beige-sectional.jpg"),
    gallery: [
      img("living-beige-sectional.jpg"),
      img("sofa-beige-custom.jpg"),
      img("bedroom-taupe.jpg"),
    ],
    specs: [
      { label: "Options", value: "Sheer, blackout, layered" },
      { label: "Service", value: "Measure & customise" },
      { label: "Coordination", value: "Matched to furniture fabrics" },
    ],
    featured: false,
  },
];

const gallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Showroom — Luxury Living",
    imageUrl: img("showroom-brand-wall.jpg"),
    category: "Showroom",
    alt: "West Home Luxury Living showroom with cream sectional",
  },
  {
    id: "gal-2",
    title: "Bouclé sectional vignette",
    imageUrl: img("showroom-boucle-sectional.jpg"),
    category: "Sofas",
    alt: "Cream bouclé L-shaped sofa in the showroom",
  },
  {
    id: "gal-3",
    title: "White living set",
    imageUrl: img("showroom-white-set.jpg"),
    category: "Sofas",
    alt: "White bouclé sectional with matching armchairs",
  },
  {
    id: "gal-4",
    title: "Custom fabric selection",
    imageUrl: img("sofa-custom-swatches.jpg"),
    category: "Customisation",
    alt: "Beige sectional with fabric swatch book for custom orders",
  },
  {
    id: "gal-5",
    title: "Beige living room",
    imageUrl: img("living-beige-sectional.jpg"),
    category: "Living",
    alt: "Beige sectional sofa with marble table and backlit shelving",
  },
  {
    id: "gal-6",
    title: "Powder blue sofa",
    imageUrl: img("sofa-powder-blue.jpg"),
    category: "Sofas",
    alt: "Powder blue cloud-style sectional sofa",
  },
  {
    id: "gal-7",
    title: "Grey chaise living",
    imageUrl: img("sofa-grey-chaise.jpg"),
    category: "Sofas",
    alt: "Light grey chaise sectional in a modern living room",
  },
  {
    id: "gal-8",
    title: "Armchair and ottoman",
    imageUrl: img("armchair-ottoman.jpg"),
    category: "Seating",
    alt: "Oatmeal armchair with matching ottoman",
  },
  {
    id: "gal-9",
    title: "Custom bedroom",
    imageUrl: img("bedroom-taupe.jpg"),
    category: "Beds",
    alt: "Taupe upholstered bed with curtains and nightstands",
  },
  {
    id: "gal-10",
    title: "Green accent living",
    imageUrl: img("sofa-grey-green.jpg"),
    category: "Living",
    alt: "Grey sectional with green accent cushions",
  },
];

const homeContent: HomeContent = {
  heroHeadline: "Customised sofas, beds & curtains for Dubai homes",
  heroSupport:
    "West Home Furniture on Hessa Street, Al Barsha — made-to-order seating, beds, chaises and soft furnishings. Visit our showroom or enquire on WhatsApp.",
  heroImageUrl: img("showroom-brand-wall.jpg"),
  introTitle: "Comfort, style and quality — made for your space",
  introBody:
    "From customised sectionals and chaise sofas to upholstered beds and coordinated curtains, we help you choose fabrics, sizes and finishes that complete your home. Open daily 9:00 AM – 9:00 PM at our Al Barsha showroom.",
  valueProps: [
    {
      title: "Fully customised",
      description:
        "Sofas, beds and chaises tailored in fabric, colour and dimensions to your room.",
    },
    {
      title: "Showroom guidance",
      description:
        "See pieces in person on Hessa Street, Al Barsha — browse swatches and layouts with our team.",
    },
    {
      title: "Curtains & finishing",
      description:
        "Coordinate curtains and soft furnishings with your furniture for a complete look.",
    },
  ],
};

const aboutContent: AboutContent = {
  title: "About West Home",
  intro:
    "West Home Furniture Dubai specialises in customised sofas, beds, chaises and curtains — furniture that completes a beautiful home.",
  body: "Based on Hessa Street in Al Barsha, our showroom presents modern living and bedroom collections you can adapt to your space. Choose fabrics, sizes and configurations with our team, then follow up by WhatsApp, call or an online enquiry. We focus on premium quality, modern designs and pieces that work for everyday Dubai living.",
  values: [
    {
      title: "Premium quality",
      description: "Comfortable, durable pieces built for daily use and lasting style.",
    },
    {
      title: "Modern designs",
      description: "Clean silhouettes, soft neutrals and bold options when you want them.",
    },
    {
      title: "Perfect for every home",
      description: "Apartments and villas — we help scale and finish each order to fit.",
    },
  ],
  imageUrl: img("showroom-boucle-sectional.jpg"),
};

const contact: SiteContact = {
  companyName: "West Home Furniture Dubai",
  address: "Al Barsha, Hessa Street, Dubai, United Arab Emirates",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+971 55 870 8760",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@westhomedubai.ae",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971558708760",
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=55.18%2C25.09%2C55.22%2C25.12&layer=mapnik",
  socialLinks: [
    { label: "Instagram", href: "https://instagram.com/west.home.dubai" },
    {
      label: "Facebook",
      href: "https://facebook.com",
    },
    { label: "Website", href: "https://www.westhomedubai.ae" },
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
