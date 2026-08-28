import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "UUID Generator – Generate Random UUIDs Online for Free",
    description:
        "Generate random UUIDs online for free. Create unique Version 4 UUIDs instantly for applications, APIs, databases, and software projects.",

    keywords: [
        "UUID generator",
        "UUID generator online",
        "random UUID generator",
        "UUID v4 generator",
        "generate UUID",
        "UUID creator",
        "unique ID generator",
        "free UUID generator",
        "online UUID generator",
    ],

    alternates: {
        canonical: "https://www.getdigitalkit.online/uuid-generator",
    },

    openGraph: {
        title: "UUID Generator – Generate Random UUIDs Online for Free",
        description:
            "Free online UUID generator for creating random UUIDs instantly for apps, APIs, databases, and development projects.",
        url: "https://www.getdigitalkit.online/uuid-generator",
        siteName: "DigitalKit",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function UUIDGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}