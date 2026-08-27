
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Unix Timestamp Converter Online | DigitalKit",
    description:
        "Free Unix timestamp converter. Convert Unix timestamps to readable dates and convert dates back to Unix timestamps instantly.",
    keywords: [
        "Unix timestamp converter",
        "timestamp converter",
        "Unix time converter",
        "epoch converter",
        "Unix timestamp to date",
        "date to Unix timestamp",
    ],
    alternates: {
        canonical: "https://www.getdigitalkit.online/timestamp-converter",
    },
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}

