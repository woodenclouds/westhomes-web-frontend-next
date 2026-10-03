import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageIntro } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cms } from "@/lib/cms/client";
import type { EnquiryType } from "@/lib/cms/types";

export const metadata: Metadata = {
  title: "Enquire / Book",
  description:
    "Enquire about sofas, beds, mattresses, tables or custom furniture at West Home Furniture Dubai — Al Barsha showroom.",
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
      <div className="container-page grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <ScrollReveal>
          <PageIntro
            eyebrow="Get in touch"
            title="Tell us what you need"
            description="A sofa, bed, club chair, dining set, or a showroom visit. After you send this, WhatsApp opens with your details so we can reply quickly."
          />
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <EnquiryForm
            products={products}
            defaultProductSlug={params.product ?? ""}
            defaultType={defaultType}
          />
        </ScrollReveal>
      </div>
    </div>
  );
}
