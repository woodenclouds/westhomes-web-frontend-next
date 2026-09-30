"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";
import type { EnquiryType, Product } from "@/lib/cms/types";
import { Input, Select, Textarea } from "./ui/FormFields";
import { Button } from "./ui/Button";
import { StatusMessage } from "./ui/States";
import { WhatsAppButton } from "./WhatsAppButton";
import { enquiryFollowUpMessage, whatsappUrl } from "@/lib/whatsapp";

type Props = {
  products: Product[];
  defaultProductSlug?: string;
  defaultType?: EnquiryType;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  type: EnquiryType;
  productSlug: string;
  preferredDate: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

export function EnquiryForm({
  products,
  defaultProductSlug = "",
  defaultType = "general",
}: Props) {
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    reference: string;
    name: string;
    phone: string;
    productOrRequirement: string;
    message: string;
    productId?: string;
    productCategory?: string;
    productSlug?: string;
  } | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    type: defaultType,
    productSlug: defaultProductSlug,
    preferredDate: "",
    message: "",
  });

  const selectedProduct = useMemo(
    () => products.find((p) => p.slug === form.productSlug),
    [products, form.productSlug],
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(values: FormState): FieldErrors {
    const next: FieldErrors = {};
    if (!values.name.trim()) next.name = "Name is required";
    if (!values.phone.trim()) next.phone = "Phone is required";
    else if (values.phone.replace(/\D/g, "").length < 8) {
      next.phone = "Enter a valid phone number";
    }
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Enter a valid email";
    }
    if ((values.type === "product" || values.type === "booking") && !values.productSlug) {
      next.productSlug = "Select a product";
    }
    if (values.type === "booking" && !values.preferredDate) {
      next.preferredDate = "Preferred date is required for bookings";
    }
    if (!values.message.trim()) next.message = "Please describe your requirement";
    return next;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    startTransition(async () => {
      try {
        const res = await fetch("/api/enquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            phone: form.phone.trim(),
            email: form.email.trim() || undefined,
            type: form.type,
            productId: selectedProduct?.id,
            productName: selectedProduct?.name,
            preferredDate:
              form.type === "booking" ? form.preferredDate : undefined,
            message: form.message.trim(),
          }),
        });

        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(data?.error ?? "Unable to submit enquiry");
        }

        const data = (await res.json()) as { reference: string };
        const successPayload = {
          reference: data.reference,
          name: form.name.trim(),
          phone: form.phone.trim(),
          productOrRequirement:
            selectedProduct?.name ??
            (form.type === "booking" ? "Booking request" : "General enquiry"),
          message: form.message.trim(),
          productId: selectedProduct?.id,
          productCategory: selectedProduct?.categoryName,
          productSlug: selectedProduct?.slug,
        };
        setSuccess(successPayload);

        // Also open WhatsApp with the enquiry + product details
        const wa = enquiryFollowUpMessage(successPayload);
        window.open(whatsappUrl(wa), "_blank", "noopener,noreferrer");
      } catch (err) {
        setFormError(
          err instanceof Error ? err.message : "Unable to submit enquiry",
        );
      }
    });
  }

  if (success) {
    const waMessage = enquiryFollowUpMessage(success);
    return (
      <div className="space-y-6 rounded-sm border border-border bg-surface p-6 md:p-8">
        <StatusMessage tone="success" title="Enquiry received">
          Your reference number is <strong>{success.reference}</strong>. Our
          team will follow up shortly.
        </StatusMessage>
        <WhatsAppButton
          message={waMessage}
          label="Continue on WhatsApp"
          variant="primary"
        />
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-sm border border-border bg-surface p-6 md:p-8"
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          id="name"
          label="Name"
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          error={errors.name}
          autoComplete="name"
        />
        <Input
          id="phone"
          label="Phone"
          required
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          error={errors.phone}
          autoComplete="tel"
        />
      </div>

      <Input
        id="email"
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
        autoComplete="email"
        hint="Optional — helpful for follow-up"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Select
          id="type"
          label="Requirement type"
          required
          value={form.type}
          onChange={(e) => update("type", e.target.value as EnquiryType)}
        >
          <option value="general">General enquiry</option>
          <option value="product">Product enquiry</option>
          <option value="booking">Booking / visit</option>
        </Select>

        <Select
          id="product"
          label="Product"
          value={form.productSlug}
          onChange={(e) => update("productSlug", e.target.value)}
          error={errors.productSlug}
          required={form.type === "product" || form.type === "booking"}
        >
          <option value="">Select a product</option>
          {products.map((p) => (
            <option key={p.id} value={p.slug}>
              {p.name}
            </option>
          ))}
        </Select>
      </div>

      {form.type === "booking" ? (
        <Input
          id="preferredDate"
          label="Preferred date"
          type="date"
          required
          value={form.preferredDate}
          onChange={(e) => update("preferredDate", e.target.value)}
          error={errors.preferredDate}
        />
      ) : null}

      <Textarea
        id="message"
        label="Message"
        required
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
        error={errors.message}
        placeholder="Tell us about sizes, finishes, timelines or anything we should know."
      />

      {formError ? (
        <StatusMessage tone="error" title="Submission failed">
          {formError}. You can retry, or reach us on WhatsApp.
        </StatusMessage>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Submitting…" : "Submit enquiry"}
      </Button>
    </form>
  );
}
