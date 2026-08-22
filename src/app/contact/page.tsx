"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);
        setSuccess(false);
        setError("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    message,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong.");
            }

            setSuccess(true);

            setName("");
            setEmail("");
            setMessage("");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Could not send your message."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                    <a href="/" className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-lg text-white">
                            ✦
                        </div>

                        <span className="text-xl font-bold">
                            DigitalKit
                        </span>
                    </a>

                    <a
                        href="/"
                        className="text-sm font-medium text-slate-500 hover:text-slate-900"
                    >
                        ← Back to home
                    </a>
                </div>
            </header>

            <div className="mx-auto max-w-5xl px-6 py-16">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                        💬 Get in touch
                    </div>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                        Contact DigitalKit
                    </h1>

                    <p className="mt-4 text-lg leading-7 text-slate-600">
                        Have a question, suggestion, bug report, or business
                        inquiry? Send us a message.
                    </p>
                </div>

                <section className="mx-auto mt-12 max-w-2xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="text-sm font-semibold"
                            >
                                Your Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="text-sm font-semibold"
                            >
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="text-sm font-semibold"
                            >
                                Message
                            </label>

                            <textarea
                                id="message"
                                required
                                rows={7}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="How can we help?"
                                className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-100"
                            />
                        </div>

                        {error && (
                            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                                Your message was sent successfully! 🎉
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </section>

                <div className="mt-10 flex justify-center gap-6 text-sm text-slate-400">
                    <a href="/privacy" className="hover:text-slate-900">
                        Privacy
                    </a>

                    <a href="/terms" className="hover:text-slate-900">
                        Terms
                    </a>

                    <a href="/" className="hover:text-slate-900">
                        Home
                    </a>
                </div>
            </div>
        </main>
    );
}