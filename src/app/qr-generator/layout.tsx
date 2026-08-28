import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "QR Code Generator – Create QR Codes Online for Free",
    description:
        "Create QR codes online for free. Generate QR codes for websites, text, contact information, and other content instantly with DigitalKit.",

    keywords: [
        "QR code generator",
        "QR generator",
        "QR code maker",
        "create QR code",
        "QR code generator online",
        "free QR code generator",
        "online QR code maker",
        "generate QR code",
        "QR code creator",
    ],

    alternates: {
        canonical: "https://www.getdigitalkit.online/qr-generator",
    },

    openGraph: {
        title: "QR Code Generator – Create QR Codes Online for Free",
        description:
            "Free online QR code generator for links, text, contact information, and more.",
        url: "https://www.getdigitalkit.online/qr-generator",
        siteName: "DigitalKit",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function QRGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}