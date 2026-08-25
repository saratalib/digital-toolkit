import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free QR Code Generator",
    description:
        "Create QR codes online for free. Generate downloadable QR codes quickly with this simple QR code generator from DigitalKit.",
    alternates: {
        canonical: "https://getdigitalkit.online/qr-generator",
    },
};

export default function QRGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}