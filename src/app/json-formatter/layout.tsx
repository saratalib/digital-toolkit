import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator – Format, Minify & Validate JSON",
  description:
    "Format, validate, and minify JSON online for free. Easily make JSON readable, check syntax errors, and copy clean JSON directly from your browser.",

  keywords: [
    "JSON formatter",
    "JSON validator",
    "JSON minifier",
    "format JSON online",
    "validate JSON",
    "JSON beautifier",
    "JSON formatter online",
    "free JSON formatter",
    "JSON editor",
    "minify JSON",
  ],

  alternates: {
    canonical: "https://www.getdigitalkit.online/json-formatter",
  },

  openGraph: {
    title: "JSON Formatter & Validator – Format, Minify & Validate JSON",
    description:
      "Free online JSON formatter, validator, and minifier for developers and everyday data tasks.",
    url: "https://www.getdigitalkit.online/json-formatter",
    siteName: "DigitalKit",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function JSONFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}