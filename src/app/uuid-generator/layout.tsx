import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free UUID Generator",
    description:
        "Generate random UUIDs online for free. Create unique UUIDs quickly with this simple UUID generator from DigitalKit.",
    alternates: {
        canonical: "https://getdigitalkit.online/uuid-generator",
    },
};

export default function UuidGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}