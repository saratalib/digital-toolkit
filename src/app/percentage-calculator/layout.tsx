import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Percentage Calculator",
    description:
        "Calculate percentages, percentage increases and decreases quickly with this free online percentage calculator from DigitalKit.",
    alternates: {
        canonical: "https://getdigitalkit.online/percentage-calculator",
    },
};

export default function PercentageCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}