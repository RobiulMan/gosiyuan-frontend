import { Metadata } from "next";

// Dynamic URL based on environment
const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3010";
};

export const siteConfig = {
  name: "gosiyuan",
  description:
    "Gosiyuan Wholesale Trading Supplies . is a leading provider of mobile and electronic accessories products to wholesalers and retailers in the US, CA, UK and Europe.",
  url: getBaseUrl(),
  ogImage: `${getBaseUrl()}/images/gosiyuan-og-image.jpg`, // Relative to domain
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Wholesale Trading Supplies .`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "wholesale",
    "mobile products",
    "accessories products",
    "bulk order",
    " mobile  accessories",
    "electronic accessories",
    "wholesale trading supplies",
    "wholesale mobile products",
    "wholesale accessories products",
    "wholesale electronic accessories",
    "bulk order mobile products",
    "bulk order accessories products",
    "bulk order electronic accessories",
    "wholesalers in US",
    "wholesalers in CA",
    "wholesalers in UK",
    "wholesalers in Europe",
    "wholesalers",
    "retailers",
    "trading supplies",
    "gosiyuan",
  ],
  authors: [{ name: "gosiyuan LLC." }],
  creator: "gosiyuan LLC.",
  publisher: "gosiyuan LLC.",
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
        alt: "gosiyuan - Wholesale Trading Supplies.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Wholesale Trading Supplies.`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@gosiyuan",
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
