import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Base64 Encoder & Decoder – Encode and Decode Base64 Online",
    description:
        "Encode text to Base64 or decode Base64 to readable text online for free. Fast, simple, and browser-based Base64 encoder and decoder.",

    keywords: [
        "Base64 encoder",
        "Base64 decoder",
        "Base64 encode online",
        "Base64 decode online",
        "Base64 converter",
        "encode text to Base64",
        "decode Base64",
        "free Base64 encoder",
        "online Base64 decoder",
    ],

    alternates: {
        canonical: "https://www.getdigitalkit.online/base64",
    },

    openGraph: {
        title: "Base64 Encoder & Decoder – Encode and Decode Base64 Online",
        description:
            "Free online Base64 encoder and decoder. Encode text or decode Base64 directly in your browser.",
        url: "https://www.getdigitalkit.online/base64",
        siteName: "DigitalKit",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function Base64Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}