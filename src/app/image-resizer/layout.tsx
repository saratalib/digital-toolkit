import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Image Resizer Online Free | Resize JPG PNG WEBP | DigitalKit",
    description:
        "Resize JPG, PNG and WEBP images online for free. Change image width and height while keeping the aspect ratio directly in your browser.",
    keywords: [
        "image resizer",
        "resize image online",
        "resize JPG online",
        "resize PNG online",
        "resize WEBP online",
        "free image resizer",
    ],
    alternates: {
        canonical: "https://www.getdigitalkit.online/image-resizer",
    },
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}

