import type { Product } from "./cms/types";

export function formatPrice(price: number | null | undefined): string {
  if (price == null) return "Price on enquiry";
  return `AED ${price.toLocaleString("en-AE")}`;
}

export function priceNoteFor(product: Pick<Product, "price" | "priceNote">): string {
  if (product.priceNote) return product.priceNote;
  if (product.price == null) {
    return "Made to your size and finish. We confirm the price after you enquire.";
  }
  return "Showroom price for the piece as shown.";
}
