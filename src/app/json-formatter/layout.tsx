import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "JSON Formatter & Validator Online | DigitalKit",
    description:
        "Free online JSON formatter, validator, beautifier and minifier. Format, validate, minify and copy JSON instantly in your browser.",
    keywords: [
        "JSON formatter",
        "JSON validator",
        "JSON beautifier",
        "JSON minifier",
        "format JSON online",
        "validate JSON online",
    ],
    alternates: {
        canonical: "https://www.getdigitalkit.online/json-formatter",
    },
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}

