import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free AI Image Enhancer",
    description:
        "Enhance and upscale images online with AI using DigitalKit. Improve image resolution directly in your browser.",
    alternates: {
        canonical: "https://getdigitalkit.online/image-enhancer",
    },
};

export default function ImageEnhancerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
