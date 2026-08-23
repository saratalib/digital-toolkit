"use client";

import { useState } from "react";

type Mode = "percentOf" | "whatPercent" | "change";

export default function PercentageCalculatorPage() {
    const [mode, setMode] = useState<Mode>("percentOf");
    const [first, setFirst] = useState("");
    const [second, setSecond] = useState("");
    const [result, setResult] = useState("");
    const [message, setMessage] = useState("");

    const calculate = () => {
        const a = Number(first);
        const b = Number(second);

        if (!first || !second || !Number.isFinite(a) || !Number.isFinite(b)) {
            setResult("");
            setMessage("Please enter valid numbers.");
            return;
        }

        if (mode === "percentOf") {
            const answer = (a / 100) * b;
            setResult(`${a}% of ${b} = ${formatNumber(answer)}`);
        }

        if (mode === "whatPercent") {
            if (b === 0) {
                setResult("");
                setMessage("The second number cannot be zero.");
                return;
            }

            const answer = (a / b) * 100;
            setResult(`${a} is ${formatNumber(answer)}% of ${b}`);
        }

        if (mode === "change") {
            if (b === 0) {
                setResult("");
                setMessage("The original value cannot be zero.");
                return;
            }

            const answer = ((a - b) / b) * 100;
            const direction = answer >= 0 ? "increase" : "decrease";

            setResult(
                `${formatNumber(Math.abs(answer))}% ${direction}`
            );
        }

        setMessage("Calculation complete ✓");
    };

    const formatNumber = (number: number) => {
        return Number(number.toFixed(10)).toLocaleString();
    };

    const clearAll = () => {
        setFirst("");
        setSecond("");
        setResult("");
        setMessage("");
    };

    const getLabels = () => {
        if (mode === "percentOf") {
            return {
                first: "Percentage",
                second: "Number",
                firstPlaceholder: "e.g. 20",
                secondPlaceholder: "e.g. 150",
            };
        }

        if (mode === "whatPercent") {
            return {
                first: "Value",
                second: "Total",
                firstPlaceholder: "e.g. 30",
                secondPlaceholder: "e.g. 150",
            };
        }

        return {
            first: "New Value",
            second: "Original Value",
            firstPlaceholder: "e.g. 120",
            secondPlaceholder: "e.g. 100",
        };
    };

    const labels = getLabels();

    return (
        <main className="relative z-10 min-h-screen bg-gray-50 px-4 py-12">
            <div className="relative z-10 mx-auto max-w-3xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Percentage Calculator
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Calculate percentages, percentage changes, and more.
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-lg">
                    <label className="mb-2 block font-medium text-gray-900">
                        Calculation
                    </label>

                    <select
                        value={mode}
                        onChange={(e) => {
                            setMode(e.target.value as Mode);
                            setFirst("");
                            setSecond("");
                            setResult("");
                            setMessage("");
                        }}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-black"
                    >
                        <option value="percentOf">
                            What is X% of Y?
                        </option>

                        <option value="whatPercent">
                            X is what percentage of Y?
                        </option>

                        <option value="change">
                            Percentage increase/decrease
                        </option>
                    </select>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block font-medium text-gray-900">
                                {labels.first}
                            </label>

                            <input
                                type="number"
                                value={first}
                                onChange={(e) => {
                                    setFirst(e.target.value);
                                    setMessage("");
                                }}
                                placeholder={labels.firstPlaceholder}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-black"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium text-gray-900">
                                {labels.second}
                            </label>

                            <input
                                type="number"
                                value={second}
                                onChange={(e) => {
                                    setSecond(e.target.value);
                                    setMessage("");
                                }}
                                placeholder={labels.secondPlaceholder}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-black"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <button
                            onClick={calculate}
                            className="rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
                        >
                            Calculate
                        </button>

                        <button
                            onClick={clearAll}
                            className="rounded-xl border border-red-300 bg-white px-6 py-3 font-semibold text-red-600 hover:bg-red-50"
                        >
                            Clear
                        </button>
                    </div>

                    {message && (
                        <p className="mt-5 rounded-lg bg-gray-100 p-3 text-center text-sm font-medium text-gray-800">
                            {message}
                        </p>
                    )}

                    {result && (
                        <div className="mt-6 rounded-2xl bg-gray-100 p-6 text-center">
                            <p className="text-sm font-medium text-gray-500">
                                Result
                            </p>

                            <p className="mt-2 break-words text-2xl font-bold text-gray-900">
                                {result}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}