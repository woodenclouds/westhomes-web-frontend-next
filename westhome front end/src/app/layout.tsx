import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/WhatsAppButton";
import { cms } from "@/lib/cms/client";
import { siteConfig } from "@/lib/site";
import { generalEnquiryMessage } from "@/lib/whatsapp";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Dubai Furniture`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = await cms.getContact();

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer contact={contact} />
        <FloatingWhatsApp message={generalEnquiryMessage()} />
      </body>
    </html>
  );
}
