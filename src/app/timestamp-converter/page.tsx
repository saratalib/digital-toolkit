"use client";

import { useState } from "react";

export default function TimestampConverterPage() {
    const [timestamp, setTimestamp] = useState("");
    const [timestampUnit, setTimestampUnit] = useState<"seconds" | "milliseconds">(
        "seconds"
    );
    const [dateTime, setDateTime] = useState("");
    const [result, setResult] = useState("");
    const [message, setMessage] = useState("");

    const convertTimestamp = () => {
        if (!timestamp.trim()) {
            setResult("");
            setMessage("Please enter a timestamp.");
            return;
        }

        const value = Number(timestamp);

        if (!Number.isFinite(value)) {
            setResult("");
            setMessage("Please enter a valid timestamp.");
            return;
        }

        const milliseconds =
            timestampUnit === "seconds" ? value * 1000 : value;

        const date = new Date(milliseconds);

        if (Number.isNaN(date.getTime())) {
            setResult("");
            setMessage("Invalid timestamp.");
            return;
        }

        setResult(date.toLocaleString());
        setMessage("Timestamp converted ✓");
    };

    const convertDateTime = () => {
        if (!dateTime) {
            setResult("");
            setMessage("Please select a date and time.");
            return;
        }

        const date = new Date(dateTime);

        if (Number.isNaN(date.getTime())) {
            setResult("");
            setMessage("Invalid date and time.");
            return;
        }

        const milliseconds = date.getTime();

        const value =
            timestampUnit === "seconds"
                ? Math.floor(milliseconds / 1000)
                : milliseconds;

        setResult(String(value));
        setMessage("Date converted to timestamp ✓");
    };

    const useCurrentTimestamp = () => {
        const milliseconds = Date.now();

        const value =
            timestampUnit === "seconds"
                ? Math.floor(milliseconds / 1000)
                : milliseconds;

        setTimestamp(String(value));
        setResult(new Date(milliseconds).toLocaleString());
        setMessage("Current timestamp loaded ✓");
    };

    const copyResult = async () => {
        if (!result) return;

        try {
            await navigator.clipboard.writeText(result);
            setMessage("Result copied ✓");
        } catch {
            setMessage("Could not copy the result.");
        }
    };

    const clearAll = () => {
        setTimestamp("");
        setDateTime("");
        setResult("");
        setMessage("");
    };

    return (
        <main className="relative z-10 min-h-screen bg-gray-50 px-4 py-12">
            <div className="relative z-10 mx-auto max-w-4xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Timestamp Converter
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Convert Unix timestamps and dates quickly and easily.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                        <h2 className="text-xl font-bold text-gray-900">
                            Timestamp → Date
                        </h2>

                        <div className="mt-5">
                            <label className="mb-2 block font-medium text-gray-900">
                                Unix Timestamp
                            </label>

                            <input
                                type="number"
                                value={timestamp}
                                onChange={(e) => {
                                    setTimestamp(e.target.value);
                                    setMessage("");
                                }}
                                placeholder="e.g. 1756000000"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-black"
                            />
                        </div>

                        <div className="mt-5">
                            <label className="mb-2 block font-medium text-gray-900">
                                Timestamp Unit
                            </label>

                            <select
                                value={timestampUnit}
                                onChange={(e) =>
                                    setTimestampUnit(
                                        e.target.value as "seconds" | "milliseconds"
                                    )
                                }
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-black"
                            >
                                <option value="seconds">Seconds</option>
                                <option value="milliseconds">Milliseconds</option>
                            </select>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <button
                                onClick={convertTimestamp}
                                className="rounded-xl bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800"
                            >
                                Convert
                            </button>

                            <button
                                onClick={useCurrentTimestamp}
                                className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-900 hover:bg-gray-100"
                            >
                                Current
                            </button>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                        <h2 className="text-xl font-bold text-gray-900">
                            Date → Timestamp
                        </h2>

                        <div className="mt-5">
                            <label className="mb-2 block font-medium text-gray-900">
                                Date and Time
                            </label>

                            <input
                                type="datetime-local"
                                value={dateTime}
                                onChange={(e) => {
                                    setDateTime(e.target.value);
                                    setMessage("");
                                }}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-black"
                            />
                        </div>

                        <button
                            onClick={convertDateTime}
                            className="mt-5 w-full rounded-xl bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800"
                        >
                            Convert to Timestamp
                        </button>
                    </div>
                </div>

                {message && (
                    <div className="mt-6 rounded-xl bg-white p-4 text-center shadow-lg">
                        <p className="font-medium text-gray-800">{message}</p>
                    </div>
                )}

                {result && (
                    <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow-lg">
                        <h2 className="text-xl font-bold text-gray-900">
                            Result
                        </h2>

                        <div className="mt-4 break-all rounded-xl bg-gray-100 p-5 font-mono text-lg text-gray-900">
                            {result}
                        </div>

                        <div className="mt-5 flex justify-center gap-3">
                            <button
                                onClick={copyResult}
                                className="rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
                            >
                                Copy Result
                            </button>

                            <button
                                onClick={clearAll}
                                className="rounded-xl border border-red-300 bg-white px-6 py-3 font-semibold text-red-600 hover:bg-red-50"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}