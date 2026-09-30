const DEFAULT_NUMBER = "971558708760";

export function getWhatsAppNumber(): string {
  return (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || DEFAULT_NUMBER
  );
}

export function whatsappUrl(message: string): string {
  const number = getWhatsAppNumber();
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function generalEnquiryMessage(): string {
  return `Hello West Home,

I would like to enquire about your furniture collection.

Please assist me with this request.
Thank you.`;
}

export type ProductWhatsAppDetails = {
  id: string;
  name: string;
  categoryName?: string;
  shortDescription?: string;
  slug?: string;
};

export function productWhatsAppMessage(product: ProductWhatsAppDetails): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
  const productUrl =
    product.slug && site ? `${site}/products/${product.slug}` : undefined;

  const lines = [
    "Hello West Home,",
    "",
    "I am interested in the following product:",
    `Product: ${product.name}`,
    `Product ID: ${product.id}`,
  ];

  if (product.categoryName) {
    lines.push(`Category: ${product.categoryName}`);
  }
  if (product.shortDescription) {
    lines.push(`Details: ${product.shortDescription}`);
  }
  if (productUrl) {
    lines.push(`Link: ${productUrl}`);
  }

  lines.push(
    "",
    "I found this product on your website and would like to know more about it.",
    "Thank you.",
  );

  return lines.join("\n");
}

/** @deprecated Prefer productWhatsAppMessage(product) */
export function productWhatsAppMessageLegacy(
  productName: string,
  productId: string,
): string {
  return productWhatsAppMessage({ id: productId, name: productName });
}

export function enquiryFollowUpMessage(params: {
  reference: string;
  name: string;
  phone: string;
  productOrRequirement: string;
  message: string;
  productId?: string;
  productCategory?: string;
  productSlug?: string;
}): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
  const productUrl =
    params.productSlug && site
      ? `${site}/products/${params.productSlug}`
      : undefined;

  const lines = [
    "Hello West Home,",
    "",
    "I have submitted an enquiry/booking request.",
    `Reference: ${params.reference}`,
    `Name: ${params.name}`,
    `Phone: ${params.phone}`,
    `Product/Requirement: ${params.productOrRequirement}`,
  ];

  if (params.productId) {
    lines.push(`Product ID: ${params.productId}`);
  }
  if (params.productCategory) {
    lines.push(`Category: ${params.productCategory}`);
  }
  if (productUrl) {
    lines.push(`Link: ${productUrl}`);
  }

  lines.push(`Message: ${params.message}`, "", "Please assist me with this request.", "Thank you.");

  return lines.join("\n");
}

export function contactWhatsAppMessage(): string {
  return `Hello West Home,

I would like to get in touch regarding your furniture.
Thank you.`;
}
