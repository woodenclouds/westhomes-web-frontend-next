import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/WhatsAppButton";
import { cms } from "@/lib/cms/client";
import { siteConfig } from "@/lib/site";
import { generalEnquiryMessage } from "@/lib/whatsapp";
import "./globals.css";

const neueMontreal = localFont({
  src: [
    {
      path: "../fonts/neue-montreal/NeueMontreal-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/neue-montreal/NeueMontreal-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/neue-montreal/NeueMontreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/neue-montreal/NeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/neue-montreal/NeueMontreal-Italic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.shortName,
  title: {
    default: `${siteConfig.name} | Comfort and elegance for modern homes`,
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
      data-scroll-behavior="smooth"
      className={`${neueMontreal.variable} ${inter.variable} h-full antialiased`}
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
