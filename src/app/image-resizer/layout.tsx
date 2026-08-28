import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Image Resizer – Resize Images Online for Free",
    description:
        "Resize images online for free. Change image width and height, keep the aspect ratio, and download resized images directly in your browser.",

    keywords: [
        "image resizer",
        "resize image online",
        "image resizer online",
        "resize images",
        "photo resizer",
        "image size changer",
        "resize JPG",
        "resize PNG",
        "resize WEBP",
        "free image resizer",
        "online image resizer",
    ],

    alternates: {
        canonical: "https://www.getdigitalkit.online/image-resizer",
    },

    openGraph: {
        title: "Image Resizer – Resize Images Online for Free",
        description:
            "Free online image resizer. Change image dimensions and keep the aspect ratio directly in your browser.",
        url: "https://www.getdigitalkit.online/image-resizer",
        siteName: "DigitalKit",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function ImageResizerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}