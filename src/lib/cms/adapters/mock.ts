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
    name: "Sofas",
    slug: "sofas",
    description:
      "Stylish, comfortable sofas and sectionals for modern living rooms — ready looks and full customisation.",
    imageUrl: img("sofa-beige-custom.jpg"),
  },
  {
    id: "cat-beds",
    name: "Beds & Mattresses",
    slug: "beds",
    description:
      "Beds, mattresses and bedroom furniture that bring comfort and elegance to restful spaces.",
    imageUrl: img("bedroom-taupe.jpg"),
  },
  {
    id: "cat-seating",
    name: "Club Chairs & Seating",
    slug: "chairs",
    description:
      "Club chairs, armchairs, ottomans and accent seating for living rooms and lounges.",
    imageUrl: img("armchair-ottoman.jpg"),
  },
  {
    id: "cat-tables",
    name: "Dining & Coffee Tables",
    slug: "tables",
    description:
      "Dining tables, coffee tables and living-room tables for modern Dubai homes.",
    imageUrl: img("dining-marble.jpg"),
  },
  {
    id: "cat-curtains",
    name: "Living & Soft Furnishings",
    slug: "curtains",
    description:
      "Living-room finishing touches and soft furnishings to complete your home.",
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
    customisable: true,
    price: null,
    priceNote: "Custom fabric and size. Price is confirmed after enquiry.",
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
    customisable: true,
    price: 12900,
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
    customisable: true,
    price: 11500,
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
    customisable: true,
    price: 9800,
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
    customisable: true,
    price: null,
    priceNote: "Styled to your colour story. Price is confirmed after enquiry.",
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
    customisable: true,
    price: 4200,
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
    customisable: true,
    price: 7500,
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
    customisable: true,
    price: null,
    priceNote: "Measured to your windows. Price is confirmed after enquiry.",
  },
  {
    id: "prd-009",
    slug: "marble-coffee-table",
    name: "Marble Coffee Table",
    categoryId: "cat-tables",
    categoryName: "Tables",
    shortDescription:
      "Rectangular marble top with a dark base — a showroom piece with a set price.",
    description:
      "A marble coffee table styled with our living collections. The price is for the piece as shown in the showroom. A custom size or stone can be quoted separately.",
    imageUrl: img("sofa-beige-custom.jpg"),
    gallery: [img("sofa-beige-custom.jpg"), img("living-beige-sectional.jpg")],
    specs: [
      { label: "Top", value: "Marble" },
      { label: "Style", value: "Rectangular coffee table" },
    ],
    featured: true,
    customisable: false,
    price: 3450,
  },
  {
    id: "prd-010",
    slug: "round-marble-coffee-table",
    name: "Round Marble Coffee Table",
    categoryId: "cat-tables",
    categoryName: "Tables",
    shortDescription:
      "Round marble top on a fluted base, as styled beside our lounge chair.",
    description:
      "A round marble coffee table with a dark fluted base. Showroom price is for this finish. Other diameters and stones are available on enquiry.",
    imageUrl: img("armchair-ottoman.jpg"),
    gallery: [img("armchair-ottoman.jpg"), img("showroom-brand-wall.jpg")],
    specs: [
      { label: "Top", value: "Marble" },
      { label: "Base", value: "Fluted" },
    ],
    featured: true,
    customisable: false,
    price: 2890,
  },
  {
    id: "prd-011",
    slug: "black-slab-coffee-table",
    name: "Black Slab Coffee Table",
    categoryId: "cat-tables",
    categoryName: "Tables",
    shortDescription:
      "Solid dark wood slab coffee table from the white living set.",
    description:
      "A low, solid slab coffee table in a charred wood finish. Priced as shown. Custom diameters can be discussed in the showroom.",
    imageUrl: img("showroom-white-set.jpg"),
    gallery: [img("showroom-white-set.jpg")],
    specs: [
      { label: "Material", value: "Solid wood slab" },
      { label: "Finish", value: "Charred / black" },
    ],
    featured: false,
    customisable: false,
    price: 4100,
  },
  {
    id: "prd-012",
    slug: "glass-oak-coffee-table",
    name: "Glass & Oak Coffee Table",
    categoryId: "cat-tables",
    categoryName: "Tables",
    shortDescription:
      "Round glass top over a warm oak drum base.",
    description:
      "A two-tier coffee table with a glass top and solid oak base, shown with our bouclé sectional. Price is for the table as displayed.",
    imageUrl: img("showroom-boucle-sectional.jpg"),
    gallery: [img("showroom-boucle-sectional.jpg"), img("coffee-round-wood.jpg")],
    specs: [
      { label: "Top", value: "Glass" },
      { label: "Base", value: "Oak" },
    ],
    featured: false,
    customisable: false,
    price: 2650,
  },
  {
    id: "prd-013",
    slug: "oak-dining-table",
    name: "Oak Dining Table",
    categoryId: "cat-tables",
    categoryName: "Tables",
    shortDescription:
      "Solid oak dining table for everyday meals — showroom price as shown.",
    description:
      "A warm oak dining table for family dining. The listed price is for the size and finish in the demo image. Longer tops and matching chairs can be quoted.",
    imageUrl: img("dining-oak.jpg"),
    gallery: [img("dining-oak.jpg"), img("dining-set.jpg")],
    specs: [
      { label: "Material", value: "Oak" },
      { label: "Use", value: "Dining" },
    ],
    featured: true,
    customisable: false,
    price: 6800,
  },
  {
    id: "prd-014",
    slug: "marble-dining-table",
    name: "Marble Dining Table",
    categoryId: "cat-tables",
    categoryName: "Tables",
    shortDescription:
      "Marble dining table with a dark pedestal — priced as shown.",
    description:
      "A marble-top dining table for a formal setting. Showroom price covers the piece in the demo photograph. Stone choice and seating count change the quote.",
    imageUrl: img("dining-marble.jpg"),
    gallery: [img("dining-marble.jpg"), img("dining-set.jpg")],
    specs: [
      { label: "Top", value: "Marble" },
      { label: "Use", value: "Dining" },
    ],
    featured: true,
    customisable: false,
    price: 8400,
  },
  {
    id: "prd-015",
    slug: "custom-dining-table",
    name: "Custom Dining Table",
    categoryId: "cat-tables",
    categoryName: "Tables",
    shortDescription:
      "Dining table made to your length, stone or timber. Price on enquiry.",
    description:
      "Tell us the room size, how many you seat, and whether you prefer marble, oak or a mixed finish. We confirm the price after that conversation — it is not a fixed showroom tag.",
    imageUrl: img("dining-set.jpg"),
    gallery: [img("dining-set.jpg"), img("dining-oak.jpg"), img("dining-marble.jpg")],
    specs: [
      { label: "Options", value: "Marble, oak, mixed" },
      { label: "Sizing", value: "Made to your room" },
    ],
    featured: false,
    customisable: true,
    price: null,
    priceNote: "Size and material are chosen with you. Price is confirmed after enquiry.",
  },
  {
    id: "prd-016",
    slug: "round-wood-coffee-table",
    name: "Round Wood Coffee Table",
    categoryId: "cat-tables",
    categoryName: "Tables",
    shortDescription:
      "Low round timber coffee table — a ready showroom piece.",
    description:
      "A simple round wood coffee table for smaller living rooms. Priced as shown. A custom diameter or finish is available on enquiry.",
    imageUrl: img("coffee-round-wood.jpg"),
    gallery: [img("coffee-round-wood.jpg")],
    specs: [
      { label: "Shape", value: "Round" },
      { label: "Material", value: "Timber" },
    ],
    featured: false,
    customisable: false,
    price: 1890,
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
  heroHeadline: "Stylish, comfortable furniture for modern homes",
  heroSupport:
    "Quality sofas, beds, mattresses, bedroom and living room furniture, dining tables, coffee tables and more — visit our Al Barsha showroom in Dubai. We customise sofas, beds, club chairs and more.",
  heroImageUrl: img("living-white-sectional-hero.jpg"),
  introTitle: "Comfort and elegance for your home",
  introBody:
    "West Home Furniture Dubai offers stylish and comfortable furniture for modern homes. Discover quality pieces for every room, visit our showroom in Al Barsha, and find furniture that brings comfort and elegance to your space. Open daily 9:00 AM – 9:00 PM.",
  valueProps: [
    {
      title: "Custom sofas, beds & club chairs",
      description:
        "We customise sofas, beds, club chairs and more — fabric, size and finish chosen with you.",
    },
    {
      title: "Al Barsha showroom",
      description:
        "See living room and bedroom furniture in person at our Dubai showroom and plan your rooms with our team.",
    },
    {
      title: "Complete home collections",
      description:
        "Sofas, beds, mattresses, dining tables, coffee tables and more for modern Dubai homes.",
    },
  ],
};

const aboutContent: AboutContent = {
  title: "About West Home",
  intro:
    "West Home Furniture Dubai offers stylish and comfortable furniture for modern homes — quality pieces that bring comfort and elegance to every room.",
  body: "Visit our showroom in Al Barsha, Dubai, to discover sofas, beds, mattresses, bedroom furniture, living room furniture, dining tables, coffee tables and more. We also customise sofas, beds, club chairs and other pieces so your furniture fits how you live. Enquire by WhatsApp, call or online — we focus on quality, modern style and everyday comfort.",
  values: [
    {
      title: "Comfort first",
      description:
        "Stylish, comfortable furniture built for daily living and lasting ease.",
    },
    {
      title: "Modern elegance",
      description:
        "Clean, contemporary designs that bring elegance to apartments and villas.",
    },
    {
      title: "Made for your home",
      description:
        "Ready collections plus custom sofas, beds, club chairs and more to suit your space.",
    },
  ],
  process: [
    {
      title: "Visit the showroom",
      description:
        "Explore living and bedroom furniture in Al Barsha — sit with the pieces and talk through your rooms.",
    },
    {
      title: "Choose or customise",
      description:
        "Pick ready pieces, or customise sofas, beds, club chairs and more in fabric, size and finish.",
    },
    {
      title: "Confirm & deliver",
      description:
        "We confirm details after enquiry, then deliver furniture ready for your Dubai home.",
    },
  ],
  offerings: [
    "Sofas & sectionals",
    "Beds & mattresses",
    "Bedroom furniture",
    "Living room furniture",
    "Dining & coffee tables",
    "Custom sofas, beds & club chairs",
  ],
  imageUrl: img("showroom-boucle-sectional.jpg"),
  craftImageUrl: img("sofa-custom-swatches.jpg"),
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
    if (typeof params?.customisable === "boolean") {
      list = list.filter((p) => p.customisable === params.customisable);
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
