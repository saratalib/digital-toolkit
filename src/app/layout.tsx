import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.getdigitalkit.online"),

  title: {
    default: "DigitalKit – Free Online Tools for Everyday Work",
    template: "%s | DigitalKit",
  },

  description:
    "DigitalKit provides free online tools for business, images, developers, calculators, text, security, and everyday digital tasks.",

  keywords: [
    "free online tools",
    "online tools",
    "free tools",
    "digital tools",
    "business tools",
    "image tools",
    "developer tools",
    "calculators",
    "online calculator",
    "productivity tools",
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

  alternates: {
    canonical: "https://www.getdigitalkit.online/",
  },

  openGraph: {
    type: "website",
    url: "https://www.getdigitalkit.online/",
    siteName: "DigitalKit",
    title: "DigitalKit – Free Online Tools for Everyday Work",
    description:
      "Free online tools for business, images, developers, calculators, security, text, and everyday digital tasks.",
  },

  twitter: {
    card: "summary_large_image",
    title: "DigitalKit – Free Online Tools",
    description:
      "Simple, free online tools for everyday digital work.",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B1T224RWQS"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-B1T224RWQS');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}