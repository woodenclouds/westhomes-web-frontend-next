import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ButtonLink } from "@/components/ui/Button";
import { cms } from "@/lib/cms/client";
import { contactWhatsAppMessage } from "@/lib/whatsapp";
import { PageIntro } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact West Home Furniture Dubai in Al Barsha — stylish furniture for modern homes. Call or WhatsApp 055 870 8760.",
};

export default async function ContactPage() {
  const [contact, products] = await Promise.all([
    cms.getContact(),
    cms.getProducts(),
  ]);

  return (
    <div className="section-space">
      <div className="container-page">
        <PageIntro
          eyebrow="Visit"
          title="Come to the showroom"
          description="Visit our Al Barsha showroom for sofas, beds, tables and more. Call, email or WhatsApp — or leave a message below. Open daily 9:00 AM – 9:00 PM."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl text-charcoal">
                {contact.companyName}
              </h2>
              <p className="mt-3 text-muted">{contact.address}</p>
              <ul className="mt-4 space-y-2 text-charcoal">
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="hover:text-wood"
                  >
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className="hover:text-wood">
                    {contact.email}
                  </a>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  external
                  variant="secondary"
                >
                  Call
                </ButtonLink>
                <ButtonLink
                  href={`mailto:${contact.email}`}
                  external
                  variant="wood-outline"
                >
                  Email
                </ButtonLink>
                <WhatsAppButton
                  message={contactWhatsAppMessage()}
                  label="WhatsApp"
                />
              </div>
            </div>

            {contact.mapEmbedUrl ? (
              <div className="overflow-hidden rounded-sm border border-border bg-stone-deep">
                <iframe
                  title="WestHome location map"
                  src={contact.mapEmbedUrl}
                  className="h-64 w-full border-0 md:h-80"
                  loading="lazy"
                />
              </div>
            ) : null}
          </div>

          <EnquiryForm products={products} defaultType="general" />
        </div>
      </div>
    </div>
  );
}
