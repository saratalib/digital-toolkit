"use client";

import { useState } from "react";

export default function Base64Page() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [message, setMessage] = useState("");

    const encodeBase64 = () => {
        if (!input) {
            setMessage("Please enter some text first.");
            setOutput("");
            return;
        }

        try {
            const encoded = btoa(
                String.fromCharCode(...new TextEncoder().encode(input))
            );

            setOutput(encoded);
            setMessage("Text encoded successfully ✓");
        } catch {
            setOutput("");
            setMessage("Could not encode the text.");
        }
    };

    const decodeBase64 = () => {
        if (!input.trim()) {
            setMessage("Please enter Base64 text first.");
            setOutput("");
            return;
        }

        try {
            const binary = atob(input.trim());

            const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

            const decoded = new TextDecoder().decode(bytes);

            setOutput(decoded);
            setMessage("Base64 decoded successfully ✓");
        } catch {
            setOutput("");
            setMessage("Invalid Base64 text.");
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

    const swap = () => {
        setInput(output);
        setOutput(input);
        setMessage("");
    };

    const clearAll = () => {
        setInput("");
        setOutput("");
        setMessage("");
    };

    return (
        <main className="relative z-10 min-h-screen bg-gray-50 px-4 py-12">
            <div className="relative z-10 mx-auto max-w-4xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Base64 Encoder & Decoder
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Encode text to Base64 or decode Base64 back to text.
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-lg">
                    <label className="mb-2 block font-medium text-gray-900">
                        Input
                    </label>

                    <textarea
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setMessage("");
                        }}
                        placeholder="Enter text or Base64 here..."
                        className="min-h-[220px] w-full resize-y rounded-xl border border-gray-300 p-4 font-mono text-sm text-gray-900 outline-none focus:border-black"
                    />

                    <div className="mt-5 flex flex-wrap gap-3">
                        <button
                            onClick={encodeBase64}
                            className="rounded-xl bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800"
                        >
                            Encode
                        </button>

                        <button
                            onClick={decodeBase64}
                            className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-900 hover:bg-gray-100"
                        >
                            Decode
                        </button>

                        <button
                            onClick={swap}
                            disabled={!output}
                            className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-900 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Swap
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

                    <div className="mt-8">
                        <div className="mb-2 flex items-center justify-between">
                            <label className="font-medium text-gray-900">
                                Result
                            </label>

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
                            placeholder="Your result will appear here..."
                            className="min-h-[220px] w-full resize-y rounded-xl border border-gray-300 bg-gray-50 p-4 font-mono text-sm text-gray-900 outline-none"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}