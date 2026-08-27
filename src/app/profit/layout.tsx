import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profit & Pricing Calculator – Calculate Profit, Margin & Markup",
    description:
        "Calculate profit, profit margin, markup, and selling price online for free. Use this simple business calculator to find the right price for your products or services.",

    keywords: [
        "profit calculator",
        "profit margin calculator",
        "markup calculator",
        "pricing calculator",
        "selling price calculator",
        "profit and pricing calculator",
        "business calculator",
        "calculate profit",
        "free profit calculator",
        "online profit calculator",
    ],

    alternates: {
        canonical: "https://www.getdigitalkit.online/profit",
    },

    openGraph: {
        title: "Profit & Pricing Calculator – Calculate Profit, Margin & Markup",
        description:
            "Free online calculator for profit, margin, markup, and selling price.",
        url: "https://www.getdigitalkit.online/profit",
        siteName: "DigitalKit",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function ProfitLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}