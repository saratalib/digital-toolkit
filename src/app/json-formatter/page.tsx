"use client";

import { useState } from "react";

export default function JSONFormatterPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [message, setMessage] = useState("");

    const formatJSON = () => {
        if (!input.trim()) {
            setMessage("Please paste some JSON first.");
            setOutput("");
            return;
        }

        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, 2));
            setMessage("Valid JSON ✓");
        } catch {
            setOutput("");
            setMessage("Invalid JSON. Please check your syntax.");
        }
    };

    const minifyJSON = () => {
        if (!input.trim()) {
            setMessage("Please paste some JSON first.");
            setOutput("");
            return;
        }

        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setMessage("JSON minified ✓");
        } catch {
            setOutput("");
            setMessage("Invalid JSON. Please check your syntax.");
        }
    };

    const validateJSON = () => {
        if (!input.trim()) {
            setMessage("Please paste some JSON first.");
            return;
        }

        try {
            JSON.parse(input);
            setMessage("Valid JSON ✓");
        } catch {
            setMessage("Invalid JSON ✕");
        }
    };

    const copyOutput = async () => {
        if (!output) return;

        try {
            await navigator.clipboard.writeText(output);
            setMessage("Copied to clipboard ✓");
        } catch {
            setMessage("Could not copy the result.");
        }
    };

    const clearAll = () => {
        setInput("");
        setOutput("");
        setMessage("");
    };

    return (
        <main className="relative z-10 min-h-screen bg-gray-50 px-4 py-12">
            <div className="relative z-10 mx-auto max-w-5xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        JSON Formatter
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Format, minify, validate, and copy JSON instantly.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                        <h2 className="mb-3 text-xl font-bold text-gray-900">
                            Input JSON
                        </h2>

                        <textarea
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                setMessage("");
                            }}
                            placeholder='Paste JSON here, for example:
{"name":"DigitalKit","tools":10}'
                            className="min-h-[400px] w-full resize-y rounded-xl border border-gray-300 p-4 font-mono text-sm text-gray-900 outline-none focus:border-black"
                        />

                        <div className="mt-4 flex flex-wrap gap-3">
                            <button
                                onClick={formatJSON}
                                className="rounded-xl bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800"
                            >
                                Format
                            </button>

                            <button
                                onClick={minifyJSON}
                                className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-900 hover:bg-gray-100"
                            >
                                Minify
                            </button>

                            <button
                                onClick={validateJSON}
                                className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-900 hover:bg-gray-100"
                            >
                                Validate
                            </button>

                            <button
                                onClick={clearAll}
                                className="rounded-xl border border-red-300 bg-white px-5 py-3 font-semibold text-red-600 hover:bg-red-50"
                            >
                                Clear
                            </button>
                        </div>

                        {message && (
                            <p className="mt-4 rounded-lg bg-gray-100 p-3 text-sm font-medium text-gray-800">
                                {message}
                            </p>
                        )}
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">
                                Result
                            </h2>

                            <button
                                onClick={copyOutput}
                                disabled={!output}
                                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Copy
                            </button>
                        </div>

                        <textarea
                            value={output}
                            readOnly
                            placeholder="Formatted JSON will appear here..."
                            className="min-h-[400px] w-full resize-y rounded-xl border border-gray-300 bg-gray-50 p-4 font-mono text-sm text-gray-900 outline-none"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}