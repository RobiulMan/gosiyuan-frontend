import { Metadata } from "next";

export const siteConfig = {
  name: "Excellusense",
  description: "Excellusense Wholesale Trading Supplies . is a leading provider of big brand toiletry and household products to wholesalers and retailers in the US, CA, UK and Europe.",
  url: "https://excellusense.com",
  ogImage: "https://excellusense.com/og/excellusense-og-image.jpg",
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Wholesale Trading Supplies .`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "wholesale", "toiletry products", "household products", "bulk order", 
    "wholesalers", "retailers", "trading supplies", "Excellusense"
  ],
  authors: [{ name: "Excellusense LLC." }],
  creator: "Excellusense LLC.",
  publisher: "Excellusense LLC.",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} | Wholesale Trading Supplies .`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Excellusense - Wholesale Trading Supplies.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Wholesale Trading Supplies.`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@excellusense",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};