import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Image Compressor Online – Compress Images for Free",
    description:
        "Compress JPG, JPEG, PNG, and WEBP images online for free. Reduce image file size while maintaining good quality. Process images directly in your browser.",

    keywords: [
        "image compressor",
        "compress image online",
        "compress images",
        "reduce image size",
        "image size reducer",
        "free image compressor",
        "compress JPG",
        "compress PNG",
        "compress WEBP",
    ],

    alternates: {
        canonical: "https://www.getdigitalkit.online/image-compressor",
    },

    openGraph: {
        title: "Image Compressor Online – Compress Images for Free",
        description:
            "Free online image compressor for reducing JPG, PNG, JPEG, and WEBP file sizes directly in your browser.",
        url: "https://www.getdigitalkit.online/image-compressor",
        siteName: "DigitalKit",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function ImageCompressorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}