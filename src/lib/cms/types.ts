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
  /** Image slugs chosen in CMS as extra product photos. */
  morePhotoSlugs?: string[];
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
  slug: string;
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
  pageTitle?: string;
  pageIntro?: string;
  hours?: string;
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
  quote?: string;
  heroText?: string;
  showroomTitle?: string;
  showroomHours?: string;
  showroomText?: string;
  processTitle?: string;
  processIntro?: string;
  valuesTitle?: string;
  offeringsTitle?: string;
}

export interface HomeContent {
  heroHeadline: string;
  heroSupport: string;
  heroImageUrl: string;
  introTitle: string;
  introBody: string;
  introImageUrl?: string;
  featuredTitle?: string;
  featuredText?: string;
  /** Product slugs chosen in CMS for the Featured section. Empty = fall back to featured flag. */
  featuredProductSlugs: string[];
  customisableTitle?: string;
  customisableText?: string;
  /** Product slugs chosen in CMS for the Customisable section. Empty = fall back to customisable flag. */
  customisableProductSlugs: string[];
  /** Gallery image slugs for the home banner carousel. Empty = built-in slides. */
  bannerPhotoSlugs: string[];
  /** Gallery image slugs for the home showroom strip. Empty = first gallery images. */
  previewImageSlugs: string[];
  valueProps: { title: string; description: string }[];
}

export interface ProductsPageContent {
  title: string;
  intro: string;
  customisableTitle: string;
  customisableText: string;
  showroomTitle: string;
  showroomText: string;
}

export interface GalleryPageContent {
  title: string;
  intro: string;
}

export interface EnquirePageContent {
  title: string;
  intro: string;
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
  getProductsPage(): Promise<ProductsPageContent>;
  getGalleryPage(): Promise<GalleryPageContent>;
  getEnquirePage(): Promise<EnquirePageContent>;
  submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult>;
}
