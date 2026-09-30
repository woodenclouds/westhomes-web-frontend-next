import Link from "next/link";
import type { SiteContact } from "@/lib/cms/types";
import { WhatsAppButton } from "./WhatsAppButton";
import { generalEnquiryMessage } from "@/lib/whatsapp";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/enquire", label: "Enquire" },
  { href: "/contact", label: "Contact" },
];

export function Footer({ contact }: { contact: SiteContact }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-charcoal text-stone">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">WestHome</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone/70">
            Furniture shaped for Dubai living — from our Hessa Street showroom
            in Al Barsha.
          </p>
          <div className="mt-5">
            <WhatsAppButton
              message={generalEnquiryMessage()}
              label="Chat on WhatsApp"
              variant="wood-outline"
              className="!border-stone/40 !text-stone hover:!bg-stone hover:!text-charcoal"
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone/50">
            Navigate
          </p>
          <ul className="mt-4 space-y-2">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-stone/80 transition hover:text-stone"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone/50">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-stone/80">
            <li>{contact.address}</li>
            <li>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-stone">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-stone">
                {contact.email}
              </a>
            </li>
          </ul>
          <ul className="mt-4 flex flex-wrap gap-3">
            {contact.socialLinks.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-wood-soft hover:text-stone"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-5 text-xs text-stone/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {contact.companyName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-stone">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-stone">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
