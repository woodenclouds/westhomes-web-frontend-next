import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for WestHome Furniture website.",
};

export default function TermsPage() {
  return (
    <div className="section-space">
      <div className="container-page prose-west max-w-3xl">
        <h1 className="font-display text-4xl text-charcoal">
          Terms &amp; Conditions
        </h1>
        <p className="mt-4 text-sm text-muted">Last updated: September 2026</p>
        <div className="mt-8 space-y-5 text-muted leading-relaxed">
          <p>
            By using the WestHome Furniture website, you agree to these terms.
            Product information on this site is for presentation and enquiry
            purposes. Submitting an enquiry or booking request does not create a
            purchase contract until confirmed separately by WestHome.
          </p>
          <h2 className="font-display text-2xl text-charcoal">Enquiries</h2>
          <p>
            Enquiry and booking forms are a request for information or a visit.
            Availability, pricing (where shown), lead times and delivery terms
            will be confirmed by our team.
          </p>
          <h2 className="font-display text-2xl text-charcoal">Content accuracy</h2>
          <p>
            We aim to keep product descriptions and imagery accurate. Dimensions,
            finishes and materials may vary; please confirm details with us
            before ordering.
          </p>
          <h2 className="font-display text-2xl text-charcoal">Contact</h2>
          <p>
            Questions about these terms can be sent through our{" "}
            <a href="/contact">Contact</a> page.
          </p>
        </div>
      </div>
    </div>
  );
}
