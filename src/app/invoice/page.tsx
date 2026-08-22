"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

type Item = {
    description: string;
    quantity: number;
    price: number;
};

type Template = "modern" | "professional" | "simple" | "bold";

const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
    { code: "PKR", symbol: "Rs" },
    { code: "INR", symbol: "₹" },
    { code: "AED", symbol: "د.إ" },
];

const templates = [
    {
        id: "modern" as Template,
        name: "Modern",
        description: "Clean and minimal",
    },
    {
        id: "professional" as Template,
        name: "Professional",
        description: "Classic business style",
    },
    {
        id: "simple" as Template,
        name: "Simple",
        description: "Light and straightforward",
    },
    {
        id: "bold" as Template,
        name: "Bold",
        description: "Strong visual style",
    },
];

export default function InvoicePage() {
    const [businessName, setBusinessName] = useState("");
    const [businessAddress, setBusinessAddress] = useState("");

    const [clientName, setClientName] = useState("");
    const [clientAddress, setClientAddress] = useState("");

    const [invoiceNumber, setInvoiceNumber] = useState("INV-001");

    const [invoiceDate, setInvoiceDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [currency, setCurrency] = useState("USD");

    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(0);

    const [paymentDetails, setPaymentDetails] = useState("");

    const [notes, setNotes] = useState("");

    const [template, setTemplate] =
        useState<Template>("modern");

    const [items, setItems] = useState<Item[]>([
        {
            description: "",
            quantity: 1,
            price: 0,
        },
    ]);

    const selectedCurrency =
        currencies.find((item) => item.code === currency) ||
        currencies[0];

    const symbol = selectedCurrency.symbol;

    const addItem = () => {
        setItems([
            ...items,
            {
                description: "",
                quantity: 1,
                price: 0,
            },
        ]);
    };

    const removeItem = (index: number) => {
        if (items.length === 1) return;

        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (
        index: number,
        field: keyof Item,
        value: string | number
    ) => {
        const updatedItems = [...items];

        if (field === "description") {
            updatedItems[index].description = String(value);
        } else {
            updatedItems[index][field] = Number(value);
        }

        setItems(updatedItems);
    };

    const subtotal = items.reduce(
        (total, item) =>
            total + item.quantity * item.price,
        0
    );

    const discountAmount =
        subtotal * (discount / 100);

    const taxableAmount =
        subtotal - discountAmount;

    const taxAmount =
        taxableAmount * (tax / 100);

    const total =
        taxableAmount + taxAmount;

    const getPdfColors = () => {
        switch (template) {
            case "professional":
                return {
                    primary: [30, 41, 59] as [number, number, number],
                    secondary: [100, 116, 139] as [number, number, number],
                    light: [241, 245, 249] as [number, number, number],
                };

            case "simple":
                return {
                    primary: [51, 65, 85] as [number, number, number],
                    secondary: [100, 116, 139] as [number, number, number],
                    light: [248, 250, 252] as [number, number, number],
                };

            case "bold":
                return {
                    primary: [79, 70, 229] as [number, number, number],
                    secondary: [99, 102, 241] as [number, number, number],
                    light: [238, 242, 255] as [number, number, number],
                };

            default:
                return {
                    primary: [15, 23, 42] as [number, number, number],
                    secondary: [100, 116, 139] as [number, number, number],
                    light: [241, 245, 249] as [number, number, number],
                };
        }
    };

    const downloadInvoice = () => {
        const doc = new jsPDF();

        const colors = getPdfColors();

        const primary = colors.primary;
        const secondary = colors.secondary;
        const light = colors.light;

        /*
         * TEMPLATE HEADER
         */

        if (template === "bold") {
            doc.setFillColor(
                primary[0],
                primary[1],
                primary[2]
            );

            doc.rect(0, 0, 210, 48, "F");

            doc.setTextColor(255, 255, 255);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(24);

            doc.text(
                businessName || "Your Business",
                20,
                24
            );

            doc.setFontSize(12);

            doc.text("INVOICE", 160, 20);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);

            doc.text(
                `# ${invoiceNumber}`,
                160,
                28
            );

            doc.text(
                invoiceDate,
                160,
                35
            );

            doc.setTextColor(15, 23, 42);
        } else if (template === "professional") {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(22);

            doc.setTextColor(
                primary[0],
                primary[1],
                primary[2]
            );

            doc.text(
                businessName || "Your Business",
                20,
                25
            );

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);

            doc.setTextColor(
                secondary[0],
                secondary[1],
                secondary[2]
            );

            if (businessAddress) {
                const lines = doc.splitTextToSize(
                    businessAddress,
                    100
                );

                doc.text(lines, 20, 33);
            }

            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);

            doc.setTextColor(
                primary[0],
                primary[1],
                primary[2]
            );

            doc.text("INVOICE", 150, 22);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);

            doc.text(
                `Invoice #: ${invoiceNumber}`,
                150,
                30
            );

            doc.text(
                `Date: ${invoiceDate}`,
                150,
                37
            );
        } else if (template === "simple") {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(20);

            doc.setTextColor(
                primary[0],
                primary[1],
                primary[2]
            );

            doc.text(
                businessName || "Your Business",
                20,
                25
            );

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);

            if (businessAddress) {
                const lines = doc.splitTextToSize(
                    businessAddress,
                    100
                );

                doc.text(lines, 20, 32);
            }

            doc.setFontSize(11);

            doc.text(
                `Invoice ${invoiceNumber}`,
                150,
                22
            );

            doc.setFontSize(9);

            doc.text(
                invoiceDate,
                150,
                29
            );
        } else {
            doc.setFillColor(
                light[0],
                light[1],
                light[2]
            );

            doc.roundedRect(
                12,
                12,
                186,
                38,
                4,
                4,
                "F"
            );

            doc.setFont("helvetica", "bold");
            doc.setFontSize(21);

            doc.setTextColor(
                primary[0],
                primary[1],
                primary[2]
            );

            doc.text(
                businessName || "Your Business",
                20,
                27
            );

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);

            doc.setTextColor(
                secondary[0],
                secondary[1],
                secondary[2]
            );

            doc.text(
                `Invoice #${invoiceNumber}`,
                150,
                25
            );

            doc.text(
                invoiceDate,
                150,
                32
            );
        }

        /*
         * BUSINESS ADDRESS
         */

        let addressY = 58;

        if (businessAddress) {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);

            doc.setTextColor(
                secondary[0],
                secondary[1],
                secondary[2]
            );

            const businessLines = doc.splitTextToSize(
                businessAddress,
                90
            );

            doc.text(
                businessLines,
                20,
                addressY
            );

            addressY +=
                businessLines.length * 5 + 4;
        }

        /*
         * BILL TO
         */

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);

        doc.setTextColor(
            primary[0],
            primary[1],
            primary[2]
        );

        doc.text(
            "BILL TO",
            20,
            addressY + 8
        );

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);

        doc.text(
            clientName || "Client Name",
            20,
            addressY + 16
        );

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);

        if (clientAddress) {
            const clientLines = doc.splitTextToSize(
                clientAddress,
                90
            );

            doc.text(
                clientLines,
                20,
                addressY + 23
            );
        }

        const tableStartY =
            addressY +
            (clientAddress
                ? Math.min(
                    doc.splitTextToSize(
                        clientAddress,
                        90
                    ).length * 5,
                    20
                )
                : 0) +
            35;

        /*
         * ITEMS TABLE
         */

        autoTable(doc, {
            startY: tableStartY,

            head: [
                [
                    "Description",
                    "Qty",
                    "Price",
                    "Total",
                ],
            ],

            body: items.map((item) => [
                item.description || "Item",
                item.quantity.toString(),
                `${symbol}${item.price.toFixed(2)}`,
                `${symbol}${(
                    item.quantity * item.price
                ).toFixed(2)}`,
            ]),

            theme:
                template === "simple"
                    ? "plain"
                    : "grid",

            headStyles: {
                fillColor: primary,
                textColor: 255,
                fontStyle: "bold",
            },

            alternateRowStyles:
                template === "modern"
                    ? {
                        fillColor: light,
                    }
                    : undefined,

            styles: {
                fontSize: 9,
                cellPadding: 4,
            },
        });

        const lastTable = (
            doc as jsPDF & {
                lastAutoTable?: {
                    finalY: number;
                };
            }
        ).lastAutoTable;

        const finalY =
            lastTable?.finalY ??
            tableStartY + 40;

        /*
         * TOTALS
         */

        const summaryY = finalY + 18;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);

        doc.setTextColor(
            secondary[0],
            secondary[1],
            secondary[2]
        );

        doc.text(
            `Subtotal: ${symbol}${subtotal.toFixed(2)}`,
            130,
            summaryY
        );

        doc.text(
            `Discount (${discount}%): -${symbol}${discountAmount.toFixed(
                2
            )}`,
            130,
            summaryY + 8
        );

        doc.text(
            `Tax (${tax}%): ${symbol}${taxAmount.toFixed(
                2
            )}`,
            130,
            summaryY + 16
        );

        doc.setDrawColor(
            primary[0],
            primary[1],
            primary[2]
        );

        doc.line(
            130,
            summaryY + 21,
            195,
            summaryY + 21
        );

        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);

        doc.setTextColor(
            primary[0],
            primary[1],
            primary[2]
        );

        doc.text(
            `Total: ${symbol}${total.toFixed(2)}`,
            130,
            summaryY + 31
        );

        /*
         * PAYMENT DETAILS
         */

        let bottomY = summaryY + 50;

        if (paymentDetails) {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);

            doc.text(
                "PAYMENT DETAILS",
                20,
                bottomY
            );

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);

            const paymentLines =
                doc.splitTextToSize(
                    paymentDetails,
                    170
                );

            doc.text(
                paymentLines,
                20,
                bottomY + 7
            );

            bottomY +=
                7 +
                paymentLines.length * 5 +
                10;
        }

        /*
         * NOTES
         */

        if (notes) {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);

            doc.text(
                "NOTES / PAYMENT TERMS",
                20,
                bottomY
            );

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);

            const noteLines =
                doc.splitTextToSize(
                    notes,
                    170
                );

            doc.text(
                noteLines,
                20,
                bottomY + 7
            );
        }

        /*
         * FOOTER
         */

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);

        doc.setTextColor(
            secondary[0],
            secondary[1],
            secondary[2]
        );

        doc.text(
            "Generated with DigitalKit",
            20,
            285
        );

        doc.save(
            `${invoiceNumber || "invoice"}.pdf`
        );
    };

    /*
     * PREVIEW STYLES
     */

    const previewContainer =
        template === "professional"
            ? "border-slate-300"
            : template === "simple"
                ? "border-slate-200"
                : template === "bold"
                    ? "border-indigo-200"
                    : "border-slate-200";

    const previewHeader =
        template === "bold"
            ? "bg-indigo-600 text-white"
            : template === "professional"
                ? "bg-slate-800 text-white"
                : template === "simple"
                    ? "bg-white"
                    : "bg-slate-50";

    const previewAccent =
        template === "bold"
            ? "text-indigo-600"
            : template === "professional"
                ? "text-slate-800"
                : "text-slate-900";

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">

            <div className="mx-auto max-w-7xl">

                <a
                    href="/"
                    className="text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                    ← Back to DigitalKit
                </a>

                <div className="mt-8">

                    <h1 className="text-4xl font-bold tracking-tight">
                        Invoice Generator
                    </h1>

                    <p className="mt-3 text-slate-600">
                        Create a professional invoice in minutes.
                    </p>

                </div>

                {/* TEMPLATE SELECTOR */}

                <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h2 className="font-bold">
                                Choose a template
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Select a style for your invoice.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

                            {templates.map((item) => (

                                <button
                                    key={item.id}
                                    onClick={() =>
                                        setTemplate(item.id)
                                    }
                                    className={`rounded-xl border px-4 py-3 text-left transition ${template === item.id
                                            ? "border-slate-900 bg-slate-900 text-white"
                                            : "border-slate-200 bg-white hover:border-slate-400"
                                        }`}
                                >

                                    <div className="text-sm font-semibold">
                                        {item.name}
                                    </div>

                                    <div
                                        className={`mt-1 text-xs ${template === item.id
                                                ? "text-slate-300"
                                                : "text-slate-500"
                                            }`}
                                    >
                                        {item.description}
                                    </div>

                                </button>

                            ))}

                        </div>

                    </div>

                </section>

                <div className="mt-8 grid gap-8 lg:grid-cols-2">

                    {/* LEFT FORM */}

                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <h2 className="text-xl font-bold">
                            Invoice Details
                        </h2>

                        <div className="mt-6 space-y-5">

                            {/* BUSINESS */}

                            <div>

                                <label className="text-sm font-semibold">
                                    Your business name
                                </label>

                                <input
                                    value={businessName}
                                    onChange={(e) =>
                                        setBusinessName(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Example Studio"
                                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
                                />

                            </div>

                            <div>

                                <label className="text-sm font-semibold">
                                    Business address
                                </label>

                                <textarea
                                    value={businessAddress}
                                    onChange={(e) =>
                                        setBusinessAddress(
                                            e.target.value
                                        )
                                    }
                                    placeholder="123 Main Street, Lahore, Pakistan"
                                    rows={3}
                                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
                                />

                            </div>

                            {/* CLIENT */}

                            <div>

                                <label className="text-sm font-semibold">
                                    Client name
                                </label>

                                <input
                                    value={clientName}
                                    onChange={(e) =>
                                        setClientName(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Client Company"
                                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
                                />

                            </div>

                            <div>

                                <label className="text-sm font-semibold">
                                    Client address
                                </label>

                                <textarea
                                    value={clientAddress}
                                    onChange={(e) =>
                                        setClientAddress(
                                            e.target.value
                                        )
                                    }
                                    placeholder="456 Business Road, Dubai, UAE"
                                    rows={3}
                                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
                                />

                            </div>

                            {/* NUMBER */}

                            <div>

                                <label className="text-sm font-semibold">
                                    Invoice number
                                </label>

                                <input
                                    value={invoiceNumber}
                                    onChange={(e) =>
                                        setInvoiceNumber(
                                            e.target.value
                                        )
                                    }
                                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
                                />

                            </div>

                            {/* DATE + CURRENCY */}

                            <div className="grid gap-4 sm:grid-cols-2">

                                <div>

                                    <label className="text-sm font-semibold">
                                        Invoice date
                                    </label>

                                    <input
                                        type="date"
                                        value={invoiceDate}
                                        onChange={(e) =>
                                            setInvoiceDate(
                                                e.target.value
                                            )
                                        }
                                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
                                    />

                                </div>

                                <div>

                                    <label className="text-sm font-semibold">
                                        Currency
                                    </label>

                                    <select
                                        value={currency}
                                        onChange={(e) =>
                                            setCurrency(
                                                e.target.value
                                            )
                                        }
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-500"
                                    >

                                        {currencies.map(
                                            (item) => (

                                                <option
                                                    key={item.code}
                                                    value={item.code}
                                                >
                                                    {item.code} (
                                                    {item.symbol})
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>

                            </div>

                        </div>

                        {/* ITEMS */}

                        <div className="mt-8 border-t border-slate-200 pt-6">

                            <div className="flex items-center justify-between">

                                <h2 className="text-xl font-bold">
                                    Items
                                </h2>

                                <button
                                    onClick={addItem}
                                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                                >
                                    + Add item
                                </button>

                            </div>

                            <div className="mt-5 space-y-4">

                                {items.map(
                                    (item, index) => (

                                        <div
                                            key={index}
                                            className="rounded-xl border border-slate-200 p-4"
                                        >

                                            <input
                                                value={
                                                    item.description
                                                }
                                                onChange={(e) =>
                                                    updateItem(
                                                        index,
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Item description"
                                                className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none"
                                            />

                                            <div className="mt-3 grid grid-cols-2 gap-3">

                                                <div>

                                                    <label className="text-xs text-slate-500">
                                                        Quantity
                                                    </label>

                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={
                                                            item.quantity
                                                        }
                                                        onChange={(e) =>
                                                            updateItem(
                                                                index,
                                                                "quantity",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none"
                                                    />

                                                </div>

                                                <div>

                                                    <label className="text-xs text-slate-500">
                                                        Price
                                                    </label>

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        value={
                                                            item.price
                                                        }
                                                        onChange={(e) =>
                                                            updateItem(
                                                                index,
                                                                "price",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 outline-none"
                                                    />

                                                </div>

                                            </div>

                                            {items.length >
                                                1 && (

                                                    <button
                                                        onClick={() =>
                                                            removeItem(
                                                                index
                                                            )
                                                        }
                                                        className="mt-3 text-sm font-medium text-red-500 hover:text-red-700"
                                                    >
                                                        Remove item
                                                    </button>

                                                )}

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                        {/* TAX + DISCOUNT */}

                        <div className="mt-8 border-t border-slate-200 pt-6">

                            <h2 className="text-xl font-bold">
                                Adjustments
                            </h2>

                            <div className="mt-5 grid gap-4 sm:grid-cols-2">

                                <div>

                                    <label className="text-sm font-semibold">
                                        Discount (%)
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={discount}
                                        onChange={(e) =>
                                            setDiscount(
                                                Number(
                                                    e.target.value
                                                )
                                            )
                                        }
                                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
                                    />

                                </div>

                                <div>

                                    <label className="text-sm font-semibold">
                                        Tax (%)
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={tax}
                                        onChange={(e) =>
                                            setTax(
                                                Number(
                                                    e.target.value
                                                )
                                            )
                                        }
                                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* PAYMENT */}

                        <div className="mt-8 border-t border-slate-200 pt-6">

                            <h2 className="text-xl font-bold">
                                Payment Details
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Add your bank, PayPal, payment link, or other payment instructions.
                            </p>

                            <textarea
                                value={
                                    paymentDetails
                                }
                                onChange={(e) =>
                                    setPaymentDetails(
                                        e.target.value
                                    )
                                }
                                placeholder={
                                    "Bank: Example Bank\nAccount: 123456789\nIBAN: PK00 XXXX XXXX XXXX"
                                }
                                rows={5}
                                className="mt-4 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
                            />

                        </div>

                        {/* NOTES */}

                        <div className="mt-8 border-t border-slate-200 pt-6">

                            <h2 className="text-xl font-bold">
                                Notes / Payment Terms
                            </h2>

                            <textarea
                                value={notes}
                                onChange={(e) =>
                                    setNotes(
                                        e.target.value
                                    )
                                }
                                placeholder="Payment due within 14 days. Thank you for your business!"
                                rows={4}
                                className="mt-4 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
                            />

                        </div>

                    </section>

                    {/* RIGHT PREVIEW */}

                    <section
                        className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${previewContainer}`}
                    >

                        {/* TEMPLATE HEADER */}

                        <div
                            className={`p-8 ${previewHeader}`}
                        >

                            <div className="flex items-start justify-between">

                                <div>

                                    <h2 className="text-2xl font-bold">
                                        {businessName ||
                                            "Your Business"}
                                    </h2>

                                    {businessAddress && (
                                        <p
                                            className={`mt-2 max-w-xs whitespace-pre-line text-sm ${template ===
                                                    "bold" ||
                                                    template ===
                                                    "professional"
                                                    ? "text-slate-200"
                                                    : "text-slate-500"
                                                }`}
                                        >
                                            {
                                                businessAddress
                                            }
                                        </p>
                                    )}

                                </div>

                                <div className="text-right">

                                    <p className="text-sm font-bold">
                                        INVOICE
                                    </p>

                                    <p
                                        className={`mt-1 text-sm ${template ===
                                                "bold" ||
                                                template ===
                                                "professional"
                                                ? "text-slate-300"
                                                : "text-slate-500"
                                            }`}
                                    >
                                        {invoiceNumber}
                                    </p>

                                    <p
                                        className={`mt-1 text-sm ${template ===
                                                "bold" ||
                                                template ===
                                                "professional"
                                                ? "text-slate-300"
                                                : "text-slate-500"
                                            }`}
                                    >
                                        {invoiceDate}
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="p-8">

                            {/* FROM / TO */}

                            <div className="grid grid-cols-2 gap-6 border-b border-slate-200 pb-6">

                                <div>

                                    <p className="text-xs font-semibold uppercase text-slate-400">
                                        From
                                    </p>

                                    <p
                                        className={`mt-2 font-semibold ${previewAccent}`}
                                    >
                                        {businessName ||
                                            "Your Business"}
                                    </p>

                                    {businessAddress && (
                                        <p className="mt-1 whitespace-pre-line text-sm text-slate-500">
                                            {
                                                businessAddress
                                            }
                                        </p>
                                    )}

                                </div>

                                <div>

                                    <p className="text-xs font-semibold uppercase text-slate-400">
                                        Bill To
                                    </p>

                                    <p
                                        className={`mt-2 font-semibold ${previewAccent}`}
                                    >
                                        {clientName ||
                                            "Client Name"}
                                    </p>

                                    {clientAddress && (
                                        <p className="mt-1 whitespace-pre-line text-sm text-slate-500">
                                            {
                                                clientAddress
                                            }
                                        </p>
                                    )}

                                </div>

                            </div>

                            {/* ITEMS */}

                            <div className="py-6">

                                <div className="grid grid-cols-[1fr_55px_80px_90px] gap-3 border-b border-slate-200 pb-3 text-xs font-semibold uppercase text-slate-400">

                                    <span>
                                        Description
                                    </span>

                                    <span>Qty</span>

                                    <span>Price</span>

                                    <span>Total</span>

                                </div>

                                <div className="mt-4 space-y-4">

                                    {items.map(
                                        (item, index) => (

                                            <div
                                                key={index}
                                                className="grid grid-cols-[1fr_55px_80px_90px] gap-3 text-sm"
                                            >

                                                <span>
                                                    {
                                                        item.description ||
                                                        "Item"
                                                    }
                                                </span>

                                                <span>
                                                    {
                                                        item.quantity
                                                    }
                                                </span>

                                                <span>
                                                    {symbol}
                                                    {item.price.toFixed(
                                                        2
                                                    )}
                                                </span>

                                                <span className="font-semibold">
                                                    {symbol}
                                                    {(
                                                        item.quantity *
                                                        item.price
                                                    ).toFixed(2)}
                                                </span>

                                            </div>

                                        )
                                    )}

                                </div>

                            </div>

                            {/* TOTALS */}

                            <div className="border-t border-slate-200 pt-6">

                                <div className="ml-auto w-72 space-y-3 text-sm">

                                    <div className="flex justify-between">

                                        <span className="text-slate-500">
                                            Subtotal
                                        </span>

                                        <span className="font-semibold">
                                            {symbol}
                                            {subtotal.toFixed(
                                                2
                                            )}
                                        </span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span className="text-slate-500">
                                            Discount (
                                            {discount}
                                            %)
                                        </span>

                                        <span className="font-semibold text-red-500">
                                            -{symbol}
                                            {discountAmount.toFixed(
                                                2
                                            )}
                                        </span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span className="text-slate-500">
                                            Tax ({tax}%)
                                        </span>

                                        <span className="font-semibold">
                                            {symbol}
                                            {taxAmount.toFixed(
                                                2
                                            )}
                                        </span>

                                    </div>

                                    <div
                                        className={`flex justify-between border-t pt-3 text-lg font-bold ${template ===
                                                "bold"
                                                ? "border-indigo-200 text-indigo-600"
                                                : "border-slate-200"
                                            }`}
                                    >

                                        <span>Total</span>

                                        <span>
                                            {symbol}
                                            {total.toFixed(2)}
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* PAYMENT */}

                            {paymentDetails && (
                                <div className="mt-8 border-t border-slate-200 pt-6">

                                    <h3 className="font-bold">
                                        Payment Details
                                    </h3>

                                    <p className="mt-2 whitespace-pre-line text-sm text-slate-600">
                                        {
                                            paymentDetails
                                        }
                                    </p>

                                </div>
                            )}

                            {/* NOTES */}

                            {notes && (
                                <div className="mt-6 border-t border-slate-200 pt-6">

                                    <h3 className="font-bold">
                                        Notes / Payment Terms
                                    </h3>

                                    <p className="mt-2 whitespace-pre-line text-sm text-slate-600">
                                        {notes}
                                    </p>

                                </div>
                            )}

                            {/* DOWNLOAD */}

                            <button
                                onClick={
                                    downloadInvoice
                                }
                                className={`mt-8 w-full rounded-xl px-5 py-3 font-semibold text-white transition ${template ===
                                        "bold"
                                        ? "bg-indigo-600 hover:bg-indigo-700"
                                        : template ===
                                            "professional"
                                            ? "bg-slate-800 hover:bg-slate-700"
                                            : "bg-slate-900 hover:bg-slate-700"
                                    }`}
                            >
                                Download Invoice PDF
                            </button>

                        </div>

                    </section>

                </div>

            </div>

        </main>
    );
}