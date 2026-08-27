import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "UUID Generator Online Free | Generate UUID v4 | DigitalKit",
    description:
        "Generate random UUIDs online for free. Create UUID v4 identifiers instantly for apps, APIs, databases and software projects.",
    keywords: [
        "UUID generator",
        "UUID generator online",
        "random UUID generator",
        "UUID v4 generator",
        "generate UUID",
        "GUID generator",
    ],
    alternates: {
        canonical: "https://www.getdigitalkit.online/uuid-generator",
    },
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}

