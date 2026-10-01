import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
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

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.shortName,
  title: {
    default: `${siteConfig.name} | Style your home, live better`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: "/images/logo.jpg", alt: "West Home Furniture logo" }],
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
      className={`${fraunces.variable} ${outfit.variable} h-full antialiased`}
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
