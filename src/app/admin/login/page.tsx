"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.error || "Invalid email or password.");
                setLoading(false);
                return;
            }

            setMessage("Login successful ✓");

            router.push("/admin");
            router.refresh();
        } catch {
            setMessage("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl">
                        ✦
                    </div>

                    <h1 className="mt-5 text-3xl font-bold text-white">
                        DigitalKit Admin
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                        Secure administrator access
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7 shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setMessage("");
                                }}
                                placeholder="admin@example.com"
                                required
                                disabled={loading}
                                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-white disabled:opacity-50"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setMessage("");
                                }}
                                placeholder="Enter your password"
                                required
                                disabled={loading}
                                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-white disabled:opacity-50"
                            />
                        </div>

                        {message && (
                            <div
                                className={`rounded-xl border p-3 text-center text-sm ${message.includes("successful")
                                        ? "border-green-800 bg-green-950 text-green-300"
                                        : "border-red-800 bg-red-950 text-red-300"
                                    }`}
                            >
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-white px-5 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-xs text-slate-600">
                    DigitalKit Administration
                </p>
            </div>
        </main>
    );
}