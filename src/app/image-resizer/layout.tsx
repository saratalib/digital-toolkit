import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Image Resizer Online – Resize Images for Free",
    description:
        "Resize images online for free. Change image width and height while keeping the aspect ratio. Works directly in your browser with no upload required.",

    keywords: [
        "image resizer",
        "resize image online",
        "resize image",
        "image resize tool",
        "free image resizer",
        "online image resizer",
        "resize photo online",
        "change image dimensions",
    ],

    alternates: {
        canonical: "https://www.getdigitalkit.online/image-resizer",
    },

    openGraph: {
        title: "Image Resizer Online – Resize Images for Free",
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