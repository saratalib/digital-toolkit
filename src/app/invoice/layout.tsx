import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Invoice Generator – Create Professional Invoices Online",
    description:
        "Create professional invoices online for free. Add customer details, products, prices, taxes, and totals, then generate and download your invoice.",

    keywords: [
        "invoice generator",
        "free invoice generator",
        "online invoice generator",
        "create invoice online",
        "free invoice maker",
        "invoice maker",
        "professional invoice generator",
        "download invoice",
    ],

    alternates: {
        canonical: "https://www.getdigitalkit.online/invoice",
    },

    openGraph: {
        title: "Free Invoice Generator – Create Professional Invoices Online",
        description:
            "Create and download professional invoices online for free with DigitalKit.",
        url: "https://www.getdigitalkit.online/invoice",
        siteName: "DigitalKit",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

export default function InvoiceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}