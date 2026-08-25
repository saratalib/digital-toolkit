import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Base64 Encoder & Decoder",
    description:
        "Encode and decode text with Base64 online for free. A fast and simple Base64 encoder and decoder from DigitalKit.",
    alternates: {
        canonical: "https://getdigitalkit.online/base64",
    },
};

export default function Base64Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}