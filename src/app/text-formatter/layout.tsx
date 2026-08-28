import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Text Formatter – Clean, Format & Transform Text Online",
    description:
        "Format, clean, transform, and organize text online for free. Use DigitalKit's text formatter for everyday writing, editing, and text-processing tasks.",

    keywords: [
        "text formatter",
        "text formatter online",
        "format text online",
        "text editor",
        "text cleaner",
        "text converter",
        "text transformation tool",
        "online text formatter",
        "free text formatter",
        "clean text online",
    ],

    alternates: {
        canonical: "https://www.getdigitalkit.online/text-formatter",
    },

    openGraph: {
        title: "Text Formatter – Clean, Format & Transform Text Online",
        description:
            "Free online text formatter for cleaning, formatting, transforming, and organizing text.",
        url: "https://www.getdigitalkit.online/text-formatter",
        siteName: "DigitalKit",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function TextFormatterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}