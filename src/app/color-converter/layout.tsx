import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "HEX to RGB & HSL Color Converter Online | DigitalKit",
    description:
        "Free online color converter. Convert HEX colors to RGB and HSL instantly with a live color preview and one-click copy.",
    keywords: [
        "color converter",
        "HEX to RGB",
        "HEX to HSL",
        "HEX color converter",
        "RGB converter",
        "HSL converter",
    ],
    alternates: {
        canonical: "https://www.getdigitalkit.online/color-converter",
    },
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}

