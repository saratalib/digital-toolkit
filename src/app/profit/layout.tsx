import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Profit Calculator",
    description:
        "Calculate profit, revenue, costs and profit margin quickly with this free online profit calculator from DigitalKit.",
    alternates: {
        canonical: "https://getdigitalkit.online/profit",
    },
};

export default function ProfitLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}