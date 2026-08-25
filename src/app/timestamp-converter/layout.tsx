import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Timestamp Converter",
    description:
        "Convert Unix timestamps to readable dates and dates to Unix timestamps with this free online timestamp converter from DigitalKit.",
    alternates: {
        canonical: "https://getdigitalkit.online/timestamp-converter",
    },
};

export default function TimestampConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}