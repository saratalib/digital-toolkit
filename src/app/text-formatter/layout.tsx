import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Text Formatter",
    description:
        "Format and transform text online with this free text formatter from DigitalKit. Quickly clean and organize your text.",
    alternates: {
        canonical: "https://getdigitalkit.online/text-formatter",
    },
};

export default function TextFormatterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}