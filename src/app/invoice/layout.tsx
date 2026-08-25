import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Invoice Generator",
    description:
        "Create professional invoices online for free. Generate, customize and download invoices quickly with DigitalKit.",
    alternates: {
        canonical: "https://getdigitalkit.online/invoice",
    },
};

export default function InvoiceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}