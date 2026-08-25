import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Color Converter",
    description:
        "Convert colors between HEX, RGB and other common formats with this free online color converter from DigitalKit.",
    alternates: {
        canonical: "https://getdigitalkit.online/color-converter",
    },
};

export default function ColorConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}