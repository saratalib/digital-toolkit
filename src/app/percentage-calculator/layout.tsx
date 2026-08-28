import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Percentage Calculator – Calculate Percentages Online",
    description:
        "Calculate percentages, percentage increases, decreases, and percentage changes online for free. Use DigitalKit's simple percentage calculator for everyday calculations.",

    keywords: [
        "percentage calculator",
        "percent calculator",
        "percentage calculator online",
        "calculate percentage",
        "percentage increase calculator",
        "percentage decrease calculator",
        "percentage change calculator",
        "free percentage calculator",
        "online percentage calculator",
    ],

    alternates: {
        canonical: "https://www.getdigitalkit.online/percentage-calculator",
    },

    openGraph: {
        title: "Percentage Calculator – Calculate Percentages Online",
        description:
            "Free online percentage calculator for calculating percentages, increases, decreases, and percentage changes.",
        url: "https://www.getdigitalkit.online/percentage-calculator",
        siteName: "DigitalKit",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function PercentageCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}