import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Unit Converter",
    description:
        "Convert length, weight, temperature, volume and other common units quickly with this free online unit converter from DigitalKit.",
    alternates: {
        canonical: "https://getdigitalkit.online/unit-converter",
    },
};

export default function UnitConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}