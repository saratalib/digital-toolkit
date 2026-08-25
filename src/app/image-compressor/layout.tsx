import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Image Compressor",
    description:
        "Compress JPG, JPEG, PNG and WEBP images online for free. Reduce image file size while keeping good quality with DigitalKit.",
    alternates: {
        canonical: "https://getdigitalkit.online/image-compressor",
    },
};

export default function ImageCompressorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}