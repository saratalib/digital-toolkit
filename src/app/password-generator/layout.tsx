import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Password Generator – Create Strong Random Passwords",
    description:
        "Generate strong random passwords online for free. Customize password length and character options to create secure passwords instantly in your browser.",

    keywords: [
        "password generator",
        "strong password generator",
        "random password generator",
        "secure password generator",
        "password generator online",
        "free password generator",
        "random password",
        "secure password",
        "strong password creator",
    ],

    alternates: {
        canonical: "https://www.getdigitalkit.online/password-generator",
    },

    openGraph: {
        title: "Password Generator – Create Strong Random Passwords",
        description:
            "Free online password generator for creating strong random passwords with customizable options.",
        url: "https://www.getdigitalkit.online/password-generator",
        siteName: "DigitalKit",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function PasswordGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}