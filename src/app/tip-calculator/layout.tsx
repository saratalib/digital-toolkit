import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Tip Calculator",
    description:
        "Calculate restaurant tips and split bills quickly with this free online tip calculator from DigitalKit.",
    alternates: {
        canonical: "https://getdigitalkit.online/tip-calculator",
    },
};

export default function TipCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}