const DEFAULT_NUMBER = "971501234567";

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
  return `Hello WestHome,

I would like to enquire about your furniture collection.

Please assist me with this request.
Thank you.`;
}

export function productWhatsAppMessage(productName: string, productId: string): string {
  return `Hello WestHome,

I am interested in the following product:
Product: ${productName}
Product ID: ${productId}

I found this product on your website and would like to know more about it.
Thank you.`;
}

export function enquiryFollowUpMessage(params: {
  reference: string;
  name: string;
  phone: string;
  productOrRequirement: string;
  message: string;
}): string {
  return `Hello WestHome,

I have submitted an enquiry/booking request.
Reference: ${params.reference}
Name: ${params.name}
Phone: ${params.phone}
Product/Requirement: ${params.productOrRequirement}
Message: ${params.message}

Please assist me with this request.
Thank you.`;
}

export function contactWhatsAppMessage(): string {
  return `Hello WestHome,

I would like to get in touch regarding your furniture.
Thank you.`;
}
