"use client";

import { useState } from "react";

export default function TextFormatterPage() {
    const [text, setText] = useState("");

    const uppercase = () => setText(text.toUpperCase());

    const lowercase = () => setText(text.toLowerCase());

    const capitalize = () => {
        setText(
            text
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase())
        );
    };

    const removeExtraSpaces = () => {
        setText(text.replace(/\s+/g, " ").trim());
    };

    const copyText = async () => {
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
            alert("Text copied!");
        } catch {
            alert("Could not copy text.");
        }
    };

    const clearText = () => {
        setText("");
    };

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-12">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Text Formatter
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Quickly format, clean, and transform your text.
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-lg">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type or paste your text here..."
                        className="min-h-[300px] w-full resize-y rounded-xl border border-gray-300 p-4 text-gray-900 outline-none transition focus:border-black"
                    />

                    <div className="mt-5 flex flex-wrap gap-3">
                        <button
                            onClick={uppercase}
                            className="rounded-lg bg-black px-5 py-2.5 font-medium text-white hover:bg-gray-800"
                        >
                            UPPERCASE
                        </button>

                        <button
                            onClick={lowercase}
                            className="rounded-lg bg-black px-5 py-2.5 font-medium text-white hover:bg-gray-800"
                        >
                            lowercase
                        </button>

                        <button
                            onClick={capitalize}
                            className="rounded-lg bg-black px-5 py-2.5 font-medium text-white hover:bg-gray-800"
                        >
                            Capitalize
                        </button>

                        <button
                            onClick={removeExtraSpaces}
                            className="rounded-lg bg-black px-5 py-2.5 font-medium text-white hover:bg-gray-800"
                        >
                            Remove Extra Spaces
                        </button>

                        <button
                            onClick={copyText}
                            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-medium text-gray-900 hover:bg-gray-100"
                        >
                            Copy
                        </button>

                        <button
                            onClick={clearText}
                            className="rounded-lg border border-red-300 bg-white px-5 py-2.5 font-medium text-red-600 hover:bg-red-50"
                        >
                            Clear
                        </button>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-xl bg-gray-100 p-4">
                            <p className="text-sm text-gray-500">Characters</p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {text.length}
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-100 p-4">
                            <p className="text-sm text-gray-500">Words</p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {text.trim() ? text.trim().split(/\s+/).length : 0}
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-100 p-4">
                            <p className="text-sm text-gray-500">Lines</p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {text ? text.split("\n").length : 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}