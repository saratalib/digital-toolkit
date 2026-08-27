import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Unit Converter Online – Convert Length, Weight, Temperature & More",
    description:
        "Convert units online for free. Convert length, weight, temperature, area, volume, and speed quickly with DigitalKit's simple unit converter.",

    keywords: [
        "unit converter",
        "unit conversion",
        "online unit converter",
        "free unit converter",
        "length converter",
        "weight converter",
        "temperature converter",
        "area converter",
        "volume converter",
        "speed converter",
    ],

    alternates: {
        canonical: "https://www.getdigitalkit.online/unit-converter",
    },

    openGraph: {
        title: "Unit Converter Online – Convert Units for Free",
        description:
            "Free online unit converter for length, weight, temperature, area, volume, and speed.",
        url: "https://www.getdigitalkit.online/unit-converter",
        siteName: "DigitalKit",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function UnitConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}