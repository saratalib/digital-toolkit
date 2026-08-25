import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Password Generator",
    description:
        "Generate strong random passwords online for free. Create secure passwords with customizable length and options using DigitalKit.",
    alternates: {
        canonical: "https://getdigitalkit.online/password-generator",
    },
};

export default function PasswordGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}