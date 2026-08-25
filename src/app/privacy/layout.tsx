import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Read the DigitalKit privacy policy and learn how information is handled when using our online tools.",
    alternates: {
        canonical: "https://getdigitalkit.online/privacy",
    },
};

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}