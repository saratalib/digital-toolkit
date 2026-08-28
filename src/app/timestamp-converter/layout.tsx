import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Unix Timestamp Converter – Convert Timestamps Online",
    description:
        "Convert Unix timestamps to dates and dates to Unix timestamps online for free. Quickly work with Unix time for development, APIs, databases, and technical projects.",

    keywords: [
        "Unix timestamp converter",
        "timestamp converter",
        "Unix time converter",
        "timestamp to date",
        "date to timestamp",
        "Unix timestamp",
        "epoch converter",
        "epoch time converter",
        "Unix timestamp calculator",
        "free timestamp converter",
    ],

    alternates: {
        canonical: "https://www.getdigitalkit.online/timestamp-converter",
    },

    openGraph: {
        title: "Unix Timestamp Converter – Convert Timestamps Online",
        description:
            "Free online Unix timestamp converter. Convert timestamps to dates and dates to Unix time instantly.",
        url: "https://www.getdigitalkit.online/timestamp-converter",
        siteName: "DigitalKit",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function TimestampConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}