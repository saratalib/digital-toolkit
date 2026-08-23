"use client";

import { useState } from "react";

export default function TipCalculatorPage() {
    const [bill, setBill] = useState("");
    const [tipPercent, setTipPercent] = useState("15");
    const [people, setPeople] = useState("1");
    const [result, setResult] = useState<{
        tip: number;
        total: number;
        perPerson: number;
    } | null>(null);
    const [message, setMessage] = useState("");

    const calculate = () => {
        const billAmount = Number(bill);
        const tip = Number(tipPercent);
        const numberOfPeople = Number(people);

        if (
            !bill ||
            !Number.isFinite(billAmount) ||
            billAmount < 0 ||
            !Number.isFinite(tip) ||
            tip < 0 ||
            !Number.isFinite(numberOfPeople) ||
            numberOfPeople < 1
        ) {
            setResult(null);
            setMessage("Please enter valid values.");
            return;
        }

        const tipAmount = billAmount * (tip / 100);
        const totalAmount = billAmount + tipAmount;
        const amountPerPerson = totalAmount / numberOfPeople;

        setResult({
            tip: tipAmount,
            total: totalAmount,
            perPerson: amountPerPerson,
        });

        setMessage("Calculation complete ✓");
    };

    const clearAll = () => {
        setBill("");
        setTipPercent("15");
        setPeople("1");
        setResult(null);
        setMessage("");
    };

    const formatMoney = (value: number) => {
        return value.toFixed(2);
    };

    return (
        <main className="relative z-10 min-h-screen bg-gray-50 px-4 py-12">
            <div className="relative z-10 mx-auto max-w-3xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Tip Calculator
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Calculate your tip, total bill, and amount per person.
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-lg">
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block font-medium text-gray-900">
                                Bill Amount
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={bill}
                                onChange={(e) => {
                                    setBill(e.target.value);
                                    setMessage("");
                                }}
                                placeholder="e.g. 2500"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-black"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium text-gray-900">
                                Tip Percentage
                            </label>

                            <select
                                value={tipPercent}
                                onChange={(e) => {
                                    setTipPercent(e.target.value);
                                    setMessage("");
                                }}
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-black"
                            >
                                <option value="5">5%</option>
                                <option value="10">10%</option>
                                <option value="15">15%</option>
                                <option value="18">18%</option>
                                <option value="20">20%</option>
                                <option value="25">25%</option>
                                <option value="30">30%</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-5">
                        <label className="mb-2 block font-medium text-gray-900">
                            Number of People
                        </label>

                        <input
                            type="number"
                            min="1"
                            step="1"
                            value={people}
                            onChange={(e) => {
                                setPeople(e.target.value);
                                setMessage("");
                            }}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-black"
                        />
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
                        <div className="mt-6 grid gap-4 sm:grid-cols-3">
                            <div className="rounded-2xl bg-gray-100 p-5 text-center">
                                <p className="text-sm text-gray-500">
                                    Tip Amount
                                </p>

                                <p className="mt-2 text-2xl font-bold text-gray-900">
                                    {formatMoney(result.tip)}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-gray-100 p-5 text-center">
                                <p className="text-sm text-gray-500">
                                    Total Bill
                                </p>

                                <p className="mt-2 text-2xl font-bold text-gray-900">
                                    {formatMoney(result.total)}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-gray-100 p-5 text-center">
                                <p className="text-sm text-gray-500">
                                    Per Person
                                </p>

                                <p className="mt-2 text-2xl font-bold text-gray-900">
                                    {formatMoney(result.perPerson)}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}