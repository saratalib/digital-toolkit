import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free JSON Formatter",
    description:
        "Format, beautify and validate JSON online for free with this fast JSON formatter from DigitalKit.",
    alternates: {
        canonical: "https://getdigitalkit.online/json-formatter",
    },
};

export default function JsonFormatterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}