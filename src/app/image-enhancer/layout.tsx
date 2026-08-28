import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Image Enhancer – Improve & Upscale Images Online",
    description:
        "Enhance and upscale images online for free. Improve image quality, sharpen details, and enlarge images directly in your browser with DigitalKit.",

    keywords: [
        "AI image enhancer",
        "image enhancer",
        "AI image upscaler",
        "image upscaler",
        "enhance image online",
        "improve image quality",
        "upscale image online",
        "photo enhancer",
        "free image enhancer",
        "online image enhancer",
    ],

    alternates: {
        canonical: "https://www.getdigitalkit.online/image-enhancer",
    },

    openGraph: {
        title: "AI Image Enhancer – Improve & Upscale Images Online",
        description:
            "Enhance and upscale images online with DigitalKit. Improve image quality and sharpen details directly in your browser.",
        url: "https://www.getdigitalkit.online/image-enhancer",
        siteName: "DigitalKit",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function ImageEnhancerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}