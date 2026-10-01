export type EnquiryType = "product" | "booking" | "general";

export type EnquiryStatus =
  | "NEW"
  | "CONTACTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  categoryName: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  gallery: string[];
  specs: ProductSpec[];
  featured: boolean;
  /** Made-to-order: fabric, size or finish can be chosen with the showroom. */
  customisable: boolean;
  /** Showroom price in AED. Null means the piece is quoted after enquiry. */
  price: number | null;
  priceNote?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category?: string;
  alt: string;
}

export interface SiteContact {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  mapEmbedUrl?: string;
  socialLinks: { label: string; href: string }[];
}

export interface AboutContent {
  title: string;
  intro: string;
  body: string;
  values: { title: string; description: string }[];
  process: { title: string; description: string }[];
  offerings: string[];
  imageUrl: string;
  craftImageUrl: string;
}

export interface HomeContent {
  heroHeadline: string;
  heroSupport: string;
  heroImageUrl: string;
  introTitle: string;
  introBody: string;
  valueProps: { title: string; description: string }[];
}

export interface EnquiryPayload {
  name: string;
  phone: string;
  email?: string;
  type: EnquiryType;
  productId?: string;
  productName?: string;
  preferredDate?: string;
  message: string;
}

export interface EnquiryResult {
  reference: string;
  status: EnquiryStatus;
}

export interface CmsAdapter {
  getHomeContent(): Promise<HomeContent>;
  getAboutContent(): Promise<AboutContent>;
  getContact(): Promise<SiteContact>;
  getCategories(): Promise<Category[]>;
  getProducts(params?: {
    categorySlug?: string;
    search?: string;
    featured?: boolean;
    customisable?: boolean;
  }): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getRelatedProducts(productId: string, limit?: number): Promise<Product[]>;
  getGallery(): Promise<GalleryItem[]>;
  submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult>;
}
