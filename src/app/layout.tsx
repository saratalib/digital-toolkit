import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://digitalkit.example.com"),

  title: {
    default: "DigitalKit - Simple Online Tools",
    template: "%s | DigitalKit",
  },

  description:
    "DigitalKit provides simple, fast and useful online tools for invoices, images, documents and everyday digital work.",

  keywords: [
    "online tools",
    "free online tools",
    "invoice generator",
    "image compressor",
    "productivity tools",
    "business tools",
    "digital tools",
  ],

  authors: [
    {
      name: "DigitalKit",
    },
  ],

  creator: "DigitalKit",
  publisher: "DigitalKit",

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
    title: "DigitalKit - Simple Online Tools",
    description:
      "Simple and useful online tools for everyday digital work.",
    url: "https://digitalkit.example.com",
  },

  twitter: {
    card: "summary_large_image",
    title: "DigitalKit - Simple Online Tools",
    description:
      "Simple and useful online tools for everyday digital work.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}