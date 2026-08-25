import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact DigitalKit",
    description:
        "Contact the DigitalKit team with questions, feedback or suggestions about our free online tools.",
    alternates: {
        canonical: "https://getdigitalkit.online/contact",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}