import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Color Converter – HEX to RGB & HSL Online",
    description:
        "Convert HEX colors to RGB and HSL online for free. Enter a HEX color, preview it, and instantly get RGB and HSL values for your design and development projects.",

    keywords: [
        "color converter",
        "HEX to RGB",
        "HEX to HSL",
        "RGB converter",
        "HSL converter",
        "HEX color converter",
        "color code converter",
        "color picker",
        "online color converter",
        "free color converter",
    ],

    alternates: {
        canonical: "https://www.getdigitalkit.online/color-converter",
    },

    openGraph: {
        title: "Color Converter – HEX to RGB & HSL Online",
        description:
            "Free online color converter for HEX, RGB, and HSL color values.",
        url: "https://www.getdigitalkit.online/color-converter",
        siteName: "DigitalKit",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function ColorConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}