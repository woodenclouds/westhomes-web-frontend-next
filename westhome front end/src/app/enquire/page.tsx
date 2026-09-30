import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { cms } from "@/lib/cms/client";
import type { EnquiryType } from "@/lib/cms/types";

export const metadata: Metadata = {
  title: "Enquire / Book",
  description:
    "Submit a product enquiry or booking request to WestHome Furniture in Dubai.",
};

type SearchParams = Promise<{
  product?: string;
  type?: string;
}>;

function parseType(value?: string): EnquiryType {
  if (value === "product" || value === "booking" || value === "general") {
    return value;
  }
  return value ? "product" : "general";
}

export default async function EnquirePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const products = await cms.getProducts();
  const defaultType = params.product
    ? parseType(params.type ?? "product")
    : parseType(params.type);

  return (
    <div className="section-space">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Get in touch
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal md:text-5xl">
            Enquire or book a visit
          </h1>
          <p className="mt-4 max-w-md text-muted leading-relaxed">
            Tell us what you need — a specific piece, a showroom visit, or
            general advice. You will receive a reference number after
            submitting, and can continue the conversation on WhatsApp.
          </p>
        </div>
        <EnquiryForm
          products={products}
          defaultProductSlug={params.product ?? ""}
          defaultType={defaultType}
        />
      </div>
    </div>
  );
}
