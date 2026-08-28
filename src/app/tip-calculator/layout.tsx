import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tip Calculator – Calculate Tips & Split Bills Online",
    description:
        "Calculate tips, total bills, and the amount each person should pay with this free online tip calculator. Easily split restaurant and service bills.",

    keywords: [
        "tip calculator",
        "tip calculator online",
        "calculate tip",
        "restaurant tip calculator",
        "bill splitter",
        "split bill calculator",
        "tip percentage calculator",
        "free tip calculator",
        "online tip calculator",
        "tip and bill calculator",
    ],

    alternates: {
        canonical: "https://www.getdigitalkit.online/tip-calculator",
    },

    openGraph: {
        title: "Tip Calculator – Calculate Tips & Split Bills Online",
        description:
            "Free online tip calculator for calculating tips, total bills, and each person's share.",
        url: "https://www.getdigitalkit.online/tip-calculator",
        siteName: "DigitalKit",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function TipCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}