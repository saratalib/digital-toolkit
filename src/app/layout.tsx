import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://getdigitalkit.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "DigitalKit - Free Online Tools",
    template: "%s | DigitalKit",
  },

  description:
    "DigitalKit is a collection of fast, simple and free online tools for business, developers, images, calculations and everyday digital work.",

  keywords: [
    "online tools",
    "free online tools",
    "digital tools",
    "invoice generator",
    "image compressor",
    "image resizer",
    "QR code generator",
    "password generator",
    "JSON formatter",
    "Base64 encoder",
    "UUID generator",
    "timestamp converter",
    "unit converter",
    "percentage calculator",
    "tip calculator",
    "color converter",
  ],

  authors: [
    {
      name: "DigitalKit",
    },
  ],

  creator: "DigitalKit",
  publisher: "DigitalKit",

  alternates: {
    canonical: siteUrl,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    siteName: "DigitalKit",
    title: "DigitalKit - Free Online Tools",
    description:
      "Fast, simple and free online tools for business, developers, images, calculations and everyday digital work.",
    url: siteUrl,
  },

  twitter: {
    card: "summary_large_image",
    title: "DigitalKit - Free Online Tools",
    description:
      "Fast, simple and free online tools for everyday digital work.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

