"use client";

import { useState } from "react";

export default function UUIDGeneratorPage() {
    const [uuids, setUuids] = useState<string[]>([]);
    const [count, setCount] = useState(1);
    const [message, setMessage] = useState("");

    const generateUUIDs = () => {
        const generated: string[] = [];

        for (let i = 0; i < count; i++) {
            generated.push(crypto.randomUUID());
        }

        setUuids(generated);
        setMessage(`${generated.length} UUID${generated.length > 1 ? "s" : ""} generated ✓`);
    };

    const copyUUID = async (uuid: string) => {
        try {
            await navigator.clipboard.writeText(uuid);
            setMessage("UUID copied ✓");
        } catch {
            setMessage("Could not copy UUID.");
        }
    };

    const copyAll = async () => {
        if (!uuids.length) return;

        try {
            await navigator.clipboard.writeText(uuids.join("\n"));
            setMessage("All UUIDs copied ✓");
        } catch {
            setMessage("Could not copy UUIDs.");
        }
    };

    const clearAll = () => {
        setUuids([]);
        setMessage("");
    };

    return (
        <main className="relative z-10 min-h-screen bg-gray-50 px-4 py-12">
            <div className="relative z-10 mx-auto max-w-3xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        UUID Generator
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Generate random UUIDs instantly for your projects.
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-lg">
                    <label className="mb-2 block font-medium text-gray-900">
                        Number of UUIDs
                    </label>

                    <select
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-black"
                    >
                        <option value={1}>1 UUID</option>
                        <option value={5}>5 UUIDs</option>
                        <option value={10}>10 UUIDs</option>
                        <option value={20}>20 UUIDs</option>
                        <option value={50}>50 UUIDs</option>
                    </select>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <button
                            onClick={generateUUIDs}
                            className="rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
                        >
                            Generate UUID
                        </button>

                        <button
                            onClick={copyAll}
                            disabled={!uuids.length}
                            className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Copy All
                        </button>

                        <button
                            onClick={clearAll}
                            className="rounded-xl border border-red-300 bg-white px-6 py-3 font-semibold text-red-600 hover:bg-red-50"
                        >
                            Clear
                        </button>
                    </div>

                    {message && (
                        <p className="mt-4 rounded-lg bg-gray-100 p-3 text-sm font-medium text-gray-800">
                            {message}
                        </p>
                    )}

                    {uuids.length > 0 && (
                        <div className="mt-6 space-y-3">
                            {uuids.map((uuid, index) => (
                                <div
                                    key={uuid}
                                    className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3"
                                >
                                    <span className="w-8 text-sm text-gray-500">
                                        {index + 1}.
                                    </span>

                                    <code className="min-w-0 flex-1 break-all text-sm text-gray-900">
                                        {uuid}
                                    </code>

                                    <button
                                        onClick={() => copyUUID(uuid)}
                                        className="shrink-0 rounded-lg bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
                                    >
                                        Copy
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {uuids.length === 0 && (
                        <div className="mt-6 rounded-xl bg-gray-100 p-8 text-center">
                            <p className="text-gray-500">
                                Your generated UUIDs will appear here.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}