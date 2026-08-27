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
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                    <a
                        href="/"
                        className="text-xl font-bold tracking-tight"
                    >
                        DigitalKit
                    </a>

                    <a
                        href="/"
                        className="text-sm font-medium text-slate-500 hover:text-slate-900"
                    >
                        ← Back to Tools
                    </a>
                </div>
            </header>

            <section className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
                <div className="text-center">
                    <div className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
                        🧩 Free JSON Formatter
                    </div>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                        JSON Formatter & Validator
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                        Format, minify, validate, and copy JSON instantly with
                        this free online JSON formatter.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                        <h2 className="mb-3 text-xl font-bold">
                            Input JSON
                        </h2>

                        <textarea
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                setMessage("");
                            }}
                            placeholder={`Paste JSON here, for example:
{"name":"DigitalKit","tools":10}`}
                            className="min-h-[400px] w-full resize-y rounded-xl border border-slate-300 p-4 font-mono text-sm outline-none focus:border-slate-900"
                        />

                        <div className="mt-4 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={formatJSON}
                                className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
                            >
                                Format
                            </button>

                            <button
                                type="button"
                                onClick={minifyJSON}
                                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold hover:bg-slate-100"
                            >
                                Minify
                            </button>

                            <button
                                type="button"
                                onClick={validateJSON}
                                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold hover:bg-slate-100"
                            >
                                Validate
                            </button>

                            <button
                                type="button"
                                onClick={clearAll}
                                className="rounded-xl border border-red-300 bg-white px-5 py-3 font-semibold text-red-600 hover:bg-red-50"
                            >
                                Clear
                            </button>
                        </div>

                        {message && (
                            <p className="mt-4 rounded-lg bg-slate-100 p-3 text-sm font-medium">
                                {message}
                            </p>
                        )}
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-xl font-bold">
                                Result
                            </h2>

                            <button
                                type="button"
                                onClick={copyOutput}
                                disabled={!output}
                                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Copy
                            </button>
                        </div>

                        <textarea
                            value={output}
                            readOnly
                            placeholder="Formatted JSON will appear here..."
                            className="min-h-[400px] w-full resize-y rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm outline-none"
                        />
                    </div>
                </div>

                <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-7 sm:p-9">
                    <h2 className="text-2xl font-bold">
                        Free Online JSON Formatter
                    </h2>

                    <div className="mt-5 space-y-5 text-sm leading-7 text-slate-600">
                        <p>
                            DigitalKit's JSON formatter is a free online tool
                            for developers, students, and anyone working with
                            JSON data. Paste your JSON into the editor to
                            format it into an easy-to-read structure, minify
                            it for compact output, or validate it for syntax
                            errors.
                        </p>

                        <p>
                            Properly formatted JSON is easier to read,
                            troubleshoot, and edit. The formatter uses your
                            browser to process the JSON, so you can quickly
                            check data without installing additional software.
                        </p>

                        <p>
                            Use the tool when working with API responses,
                            configuration files, application data, web
                            development projects, or other systems that use
                            JSON.
                        </p>
                    </div>

                    <h2 className="mt-10 text-2xl font-bold">
                        How to Use the JSON Formatter
                    </h2>

                    <ol className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                        <li>
                            <strong>1. Paste your JSON:</strong> Put your JSON
                            data into the input box.
                        </li>
                        <li>
                            <strong>2. Format:</strong> Click Format to make
                            valid JSON easier to read.
                        </li>
                        <li>
                            <strong>3. Validate:</strong> Use Validate to
                            check whether the JSON syntax is valid.
                        </li>
                        <li>
                            <strong>4. Minify:</strong> Use Minify to remove
                            unnecessary whitespace and create compact JSON.
                        </li>
                        <li>
                            <strong>5. Copy:</strong> Copy the generated result
                            directly to your clipboard.
                        </li>
                    </ol>

                    <h2 className="mt-10 text-2xl font-bold">
                        Related DigitalKit Developer Tools
                    </h2>

                    <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
                        <a
                            href="/base64"
                            className="text-slate-900 underline underline-offset-4"
                        >
                            Base64 Encoder & Decoder →
                        </a>

                        <a
                            href="/uuid-generator"
                            className="text-slate-900 underline underline-offset-4"
                        >
                            UUID Generator →
                        </a>

                        <a
                            href="/timestamp-converter"
                            className="text-slate-900 underline underline-offset-4"
                        >
                            Timestamp Converter →
                        </a>

                        <a
                            href="/color-converter"
                            className="text-slate-900 underline underline-offset-4"
                        >
                            Color Converter →
                        </a>
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-bold">
                        JSON Formatter FAQ
                    </h2>

                    <div className="mt-5 space-y-4">
                        <details className="rounded-2xl border border-slate-200 bg-white p-5">
                            <summary className="cursor-pointer font-semibold">
                                What is a JSON formatter?
                            </summary>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                A JSON formatter takes JSON data and organizes
                                it with indentation and line breaks so it is
                                easier for people to read and inspect.
                            </p>
                        </details>

                        <details className="rounded-2xl border border-slate-200 bg-white p-5">
                            <summary className="cursor-pointer font-semibold">
                                Can this tool validate JSON?
                            </summary>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                Yes. Click Validate to check whether the JSON
                                can be parsed successfully.
                            </p>
                        </details>

                        <details className="rounded-2xl border border-slate-200 bg-white p-5">
                            <summary className="cursor-pointer font-semibold">
                                What does JSON minify mean?
                            </summary>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                Minifying JSON removes unnecessary spaces,
                                indentation, and line breaks while keeping the
                                data structure intact.
                            </p>
                        </details>

                        <details className="rounded-2xl border border-slate-200 bg-white p-5">
                            <summary className="cursor-pointer font-semibold">
                                Is this JSON formatter free?
                            </summary>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                Yes. The DigitalKit JSON formatter is free to
                                use in your browser.
                            </p>
                        </details>
                    </div>
                </section>
            </section>
        </main>
    );
}