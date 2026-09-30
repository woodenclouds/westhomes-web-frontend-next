import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for WestHome Furniture website.",
};

export default function PrivacyPage() {
  return (
    <div className="section-space">
      <div className="container-page prose-west max-w-3xl">
        <h1 className="font-display text-4xl text-charcoal">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted">Last updated: September 2026</p>
        <div className="mt-8 space-y-5 text-muted leading-relaxed">
          <p>
            West Home Furniture (&quot;WestHome&quot;, &quot;we&quot;, &quot;us&quot;)
            respects your privacy. This policy explains how we handle information
            collected through our website enquiry and contact forms.
          </p>
          <h2 className="font-display text-2xl text-charcoal">Information we collect</h2>
          <p>
            When you submit an enquiry or booking request, we may collect your
            name, phone number, email address, preferred visit date, product
            interest and message content.
          </p>
          <h2 className="font-display text-2xl text-charcoal">How we use information</h2>
          <p>
            We use this information to respond to your enquiry, arrange visits,
            and provide furniture-related assistance. Enquiry records are stored
            in our content management system for follow-up by our team.
          </p>
          <h2 className="font-display text-2xl text-charcoal">Sharing</h2>
          <p>
            We do not sell your personal information. We may share details with
            service providers who process communications on our behalf (such as
            email or hosting), only as needed to operate the website.
          </p>
          <h2 className="font-display text-2xl text-charcoal">Contact</h2>
          <p>
            For privacy questions, contact us via the details on our{" "}
            <a href="/contact">Contact</a> page.
          </p>
        </div>
      </div>
    </div>
  );
}
