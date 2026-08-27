
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Invoice Generator Online",
    description:
        "Create professional invoices online for free. Generate clean invoices quickly, add customer and business details, and download your invoice.",
    alternates: {
        canonical: "/invoice",
    },
    openGraph: {
        title: "Free Invoice Generator Online | DigitalKit",
        description:
            "Create professional invoices online for free with DigitalKit's simple invoice generator.",
        url: "https://getdigitalkit.online/invoice",
        type: "website",
    },
};

export default function InvoiceLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}

