import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Base64 Encoder & Decoder Online | DigitalKit",
    description:
        "Free online Base64 encoder and decoder. Encode text to Base64 or decode Base64 strings instantly in your browser.",
    keywords: [
        "Base64 encoder",
        "Base64 decoder",
        "Base64 encode online",
        "Base64 decode online",
        "Base64 converter",
    ],
    alternates: {
        canonical: "https://www.getdigitalkit.online/base64",
    },
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}

