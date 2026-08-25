import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Image Resizer",
    description:
        "Resize JPG, JPEG, PNG and WEBP images online for free. Change image dimensions quickly while keeping good quality with DigitalKit.",
    alternates: {
        canonical: "https://getdigitalkit.online/image-resizer",
    },
};

export default function ImageResizerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}