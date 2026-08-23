"use client";

import { useState } from "react";

export default function PasswordGeneratorPage() {
    const [length, setLength] = useState(16);
    const [uppercase, setUppercase] = useState(true);
    const [lowercase, setLowercase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(true);
    const [password, setPassword] = useState("");

    const generatePassword = () => {
        let characters = "";

        if (uppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (lowercase) characters += "abcdefghijklmnopqrstuvwxyz";
        if (numbers) characters += "0123456789";
        if (symbols) characters += "!@#$%^&*()_+-=[]{}|;:,.<>?";

        if (!characters) {
            setPassword("");
            return;
        }

        const array = new Uint32Array(length);
        crypto.getRandomValues(array);

        let result = "";

        for (let i = 0; i < length; i++) {
            result += characters[array[i] % characters.length];
        }

        setPassword(result);
    };

    const copyPassword = async () => {
        if (!password) return;

        await navigator.clipboard.writeText(password);
        alert("Password copied!");
    };

    const getStrength = () => {
        let score = 0;

        if (length >= 12) score++;
        if (length >= 16) score++;
        if (uppercase) score++;
        if (lowercase) score++;
        if (numbers) score++;
        if (symbols) score++;

        if (score >= 6) return "Very Strong";
        if (score >= 4) return "Strong";
        if (score >= 3) return "Medium";
        return "Weak";
    };

    return (
        <main className="relative z-10 min-h-screen bg-gray-50 px-4 py-12">
            <div className="relative z-10 mx-auto max-w-2xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Password Generator
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Generate strong and secure passwords instantly.
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-lg">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={password}
                            readOnly
                            placeholder="Your password will appear here"
                            className="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none"
                        />

                        <button
                            onClick={copyPassword}
                            disabled={!password}
                            className="rounded-xl bg-black px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Copy
                        </button>
                    </div>

                    <div className="mt-6">
                        <div className="mb-2 flex justify-between">
                            <label className="font-medium text-gray-900">
                                Password Length
                            </label>

                            <span className="font-bold text-gray-900">
                                {length}
                            </span>
                        </div>

                        <input
                            type="range"
                            min="6"
                            max="64"
                            value={length}
                            onChange={(e) => setLength(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <div className="mt-6 space-y-3">
                        <label className="flex items-center gap-3 text-gray-900">
                            <input
                                type="checkbox"
                                checked={uppercase}
                                onChange={(e) => setUppercase(e.target.checked)}
                                className="h-4 w-4"
                            />
                            Uppercase letters
                        </label>

                        <label className="flex items-center gap-3 text-gray-900">
                            <input
                                type="checkbox"
                                checked={lowercase}
                                onChange={(e) => setLowercase(e.target.checked)}
                                className="h-4 w-4"
                            />
                            Lowercase letters
                        </label>

                        <label className="flex items-center gap-3 text-gray-900">
                            <input
                                type="checkbox"
                                checked={numbers}
                                onChange={(e) => setNumbers(e.target.checked)}
                                className="h-4 w-4"
                            />
                            Numbers
                        </label>

                        <label className="flex items-center gap-3 text-gray-900">
                            <input
                                type="checkbox"
                                checked={symbols}
                                onChange={(e) => setSymbols(e.target.checked)}
                                className="h-4 w-4"
                            />
                            Symbols
                        </label>
                    </div>

                    <div className="mt-6 rounded-xl bg-gray-100 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Strength</span>
                            <span className="font-bold text-gray-900">
                                {password ? getStrength() : "—"}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={generatePassword}
                        className="mt-6 w-full rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
                    >
                        Generate Password
                    </button>
                </div>
            </div>
        </main>
    );
}