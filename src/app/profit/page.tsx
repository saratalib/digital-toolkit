"use client";

import { useMemo, useState } from "react";

export default function ProfitPage() {
    const [cost, setCost] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [targetMargin, setTargetMargin] = useState("");

    const costNumber = Number(cost) || 0;
    const sellingNumber = Number(sellingPrice) || 0;
    const marginNumber = Number(targetMargin) || 0;

    const profit = sellingNumber - costNumber;

    const profitMargin =
        sellingNumber > 0
            ? (profit / sellingNumber) * 100
            : 0;

    const markup =
        costNumber > 0
            ? (profit / costNumber) * 100
            : 0;

    const recommendedPrice = useMemo(() => {
        if (costNumber <= 0 || marginNumber >= 100) {
            return 0;
        }

        return costNumber / (1 - marginNumber / 100);
    }, [costNumber, marginNumber]);

    const formatMoney = (value: number) => {
        return value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const clearAll = () => {
        setCost("");
        setSellingPrice("");
        setTargetMargin("");
    };

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">

            {/* HEADER */}

            <header className="border-b border-slate-200 bg-white">

                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

                    <a
                        href="/"
                        className="flex items-center gap-2"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-lg">
                            🧰
                        </div>

                        <span className="text-xl font-bold">
                            DigitalKit
                        </span>
                    </a>

                    <a
                        href="/"
                        className="text-sm font-medium text-slate-500 hover:text-slate-900"
                    >
                        ← All tools
                    </a>

                </div>

            </header>

            {/* MAIN */}

            <div className="mx-auto max-w-6xl px-6 py-12">

                {/* TITLE */}

                <div className="mx-auto max-w-2xl text-center">

                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                        💰 Business calculator
                    </div>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                        Profit & Pricing Calculator
                    </h1>

                    <p className="mt-4 text-lg leading-7 text-slate-600">
                        Calculate your profit, profit margin, markup,
                        and the selling price you need to reach your
                        target margin.
                    </p>

                </div>

                {/* CALCULATOR */}

                <div className="mt-12 grid gap-8 lg:grid-cols-2">

                    {/* INPUTS */}

                    <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

                        <div className="flex items-center justify-between">

                            <h2 className="text-xl font-bold">
                                Enter your numbers
                            </h2>

                            <button
                                onClick={clearAll}
                                className="text-sm font-medium text-slate-400 hover:text-slate-900"
                            >
                                Clear
                            </button>

                        </div>

                        <div className="mt-8 space-y-6">

                            {/* COST */}

                            <div>

                                <label
                                    htmlFor="cost"
                                    className="text-sm font-semibold"
                                >
                                    Cost / Purchase Price
                                </label>

                                <div className="relative mt-2">

                                    <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                                        $
                                    </span>

                                    <input
                                        id="cost"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={cost}
                                        onChange={(e) =>
                                            setCost(e.target.value)
                                        }
                                        placeholder="100"
                                        className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-4 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-100"
                                    />

                                </div>

                                <p className="mt-2 text-xs text-slate-400">
                                    How much does the product or service cost you?
                                </p>

                            </div>

                            {/* SELLING PRICE */}

                            <div>

                                <label
                                    htmlFor="sellingPrice"
                                    className="text-sm font-semibold"
                                >
                                    Selling Price
                                </label>

                                <div className="relative mt-2">

                                    <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                                        $
                                    </span>

                                    <input
                                        id="sellingPrice"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={sellingPrice}
                                        onChange={(e) =>
                                            setSellingPrice(e.target.value)
                                        }
                                        placeholder="150"
                                        className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-4 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-100"
                                    />

                                </div>

                                <p className="mt-2 text-xs text-slate-400">
                                    What price are you charging your customer?
                                </p>

                            </div>

                            {/* TARGET MARGIN */}

                            <div>

                                <label
                                    htmlFor="targetMargin"
                                    className="text-sm font-semibold"
                                >
                                    Target Profit Margin
                                </label>

                                <div className="relative mt-2">

                                    <input
                                        id="targetMargin"
                                        type="number"
                                        min="0"
                                        max="99.99"
                                        step="0.1"
                                        value={targetMargin}
                                        onChange={(e) =>
                                            setTargetMargin(e.target.value)
                                        }
                                        placeholder="30"
                                        className="w-full rounded-xl border border-slate-200 py-3 pl-4 pr-10 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-100"
                                    />

                                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                                        %
                                    </span>

                                </div>

                                <p className="mt-2 text-xs text-slate-400">
                                    Enter a target to calculate your recommended
                                    selling price.
                                </p>

                            </div>

                        </div>

                    </section>

                    {/* RESULTS */}

                    <section className="rounded-3xl bg-slate-900 p-7 text-white shadow-sm">

                        <div>

                            <p className="text-sm font-medium text-slate-400">
                                Your results
                            </p>

                            <h2 className="mt-2 text-2xl font-bold">
                                Pricing breakdown
                            </h2>

                        </div>

                        <div className="mt-8 space-y-4">

                            {/* PROFIT */}

                            <div className="rounded-2xl bg-white/10 p-5">

                                <div className="flex items-center justify-between">

                                    <span className="text-sm text-slate-300">
                                        Profit
                                    </span>

                                    <span className="text-2xl font-bold">
                                        ${formatMoney(profit)}
                                    </span>

                                </div>

                            </div>

                            {/* MARGIN */}

                            <div className="rounded-2xl bg-white/10 p-5">

                                <div className="flex items-center justify-between">

                                    <span className="text-sm text-slate-300">
                                        Profit Margin
                                    </span>

                                    <span className="text-2xl font-bold">
                                        {profitMargin.toFixed(2)}%
                                    </span>

                                </div>

                            </div>

                            {/* MARKUP */}

                            <div className="rounded-2xl bg-white/10 p-5">

                                <div className="flex items-center justify-between">

                                    <span className="text-sm text-slate-300">
                                        Markup
                                    </span>

                                    <span className="text-2xl font-bold">
                                        {markup.toFixed(2)}%
                                    </span>

                                </div>

                            </div>

                            {/* RECOMMENDED PRICE */}

                            <div className="mt-6 rounded-2xl bg-white p-5 text-slate-900">

                                <p className="text-sm font-semibold text-slate-500">
                                    Recommended price
                                </p>

                                <div className="mt-2 text-3xl font-bold">
                                    ${formatMoney(recommendedPrice)}
                                </div>

                                <p className="mt-2 text-xs leading-5 text-slate-500">
                                    Based on your cost and target profit margin.
                                </p>

                            </div>

                        </div>

                    </section>

                </div>

                {/* EXPLANATION */}

                <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7">

                    <h2 className="text-xl font-bold">
                        How the calculator works
                    </h2>

                    <div className="mt-6 grid gap-6 md:grid-cols-3">

                        <div>

                            <div className="text-2xl">
                                💵
                            </div>

                            <h3 className="mt-3 font-bold">
                                Profit
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Selling price minus your cost gives you the
                                profit earned on each sale.
                            </p>

                        </div>

                        <div>

                            <div className="text-2xl">
                                📊
                            </div>

                            <h3 className="mt-3 font-bold">
                                Profit Margin
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Profit margin shows what percentage of your
                                selling price is profit.
                            </p>

                        </div>

                        <div>

                            <div className="text-2xl">
                                📈
                            </div>

                            <h3 className="mt-3 font-bold">
                                Markup
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Markup compares your profit with the original
                                cost of the product or service.
                            </p>

                        </div>

                    </div>

                </section>

                {/* FOOTER */}

                <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-400">

                    <a
                        href="/privacy"
                        className="hover:text-slate-900"
                    >
                        Privacy
                    </a>

                    <a
                        href="/terms"
                        className="hover:text-slate-900"
                    >
                        Terms
                    </a>

                    <a
                        href="/contact"
                        className="hover:text-slate-900"
                    >
                        Contact
                    </a>

                </div>

            </div>

        </main>
    );
}