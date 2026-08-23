"use client";

import { useState } from "react";

function hexToRgb(hex: string) {
    let value = hex.replace("#", "").trim();

    if (value.length === 3) {
        value = value
            .split("")
            .map((char) => char + char)
            .join("");
    }

    if (!/^[0-9A-Fa-f]{6}$/.test(value)) {
        return null;
    }

    return {
        r: parseInt(value.substring(0, 2), 16),
        g: parseInt(value.substring(2, 4), 16),
        b: parseInt(value.substring(4, 6), 16),
    };
}

function rgbToHex(r: number, g: number, b: number) {
    return (
        "#" +
        [r, g, b]
            .map((value) => Math.max(0, Math.min(255, value)).toString(16).padStart(2, "0"))
            .join("")
            .toUpperCase()
    );
}

function rgbToHsl(r: number, g: number, b: number) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const difference = max - min;

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (difference !== 0) {
        s =
            l > 0.5
                ? difference / (2 - max - min)
                : difference / (max + min);

        switch (max) {
            case r:
                h = (g - b) / difference + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / difference + 2;
                break;
            case b:
                h = (r - g) / difference + 4;
                break;
        }

        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    };
}

export default function ColorConverterPage() {
    const [hex, setHex] = useState("#000000");
    const [rgb, setRgb] = useState("rgb(0, 0, 0)");
    const [hsl, setHsl] = useState("hsl(0, 0%, 0%)");
    const [message, setMessage] = useState("");

    const convertColor = () => {
        const color = hexToRgb(hex);

        if (!color) {
            setMessage("Please enter a valid HEX color.");
            return;
        }

        const { r, g, b } = color;
        const hslValue = rgbToHsl(r, g, b);

        const normalizedHex = rgbToHex(r, g, b);

        setHex(normalizedHex);
        setRgb(`rgb(${r}, ${g}, ${b})`);
        setHsl(`hsl(${hslValue.h}, ${hslValue.s}%, ${hslValue.l}%)`);
        setMessage("Color converted ✓");
    };

    const copyValue = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setMessage(`${value} copied ✓`);
        } catch {
            setMessage("Could not copy the value.");
        }
    };

    const clearAll = () => {
        setHex("#000000");
        setRgb("rgb(0, 0, 0)");
        setHsl("hsl(0, 0%, 0%)");
        setMessage("");
    };

    return (
        <main className="relative z-10 min-h-screen bg-gray-50 px-4 py-12">
            <div className="relative z-10 mx-auto max-w-3xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Color Converter
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Convert HEX colors to RGB and HSL instantly.
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-lg">
                    <label className="mb-2 block font-medium text-gray-900">
                        HEX Color
                    </label>

                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={hex}
                            onChange={(e) => {
                                setHex(e.target.value);
                                setMessage("");
                            }}
                            placeholder="#000000"
                            className="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3 font-mono text-gray-900 outline-none focus:border-black"
                        />

                        <input
                            type="color"
                            value={
                                /^#[0-9A-Fa-f]{6}$/.test(hex) ? hex : "#000000"
                            }
                            onChange={(e) => {
                                setHex(e.target.value.toUpperCase());
                                setMessage("");
                            }}
                            className="h-12 w-16 cursor-pointer rounded-lg border border-gray-300"
                        />
                    </div>

                    <button
                        onClick={convertColor}
                        className="mt-5 w-full rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
                    >
                        Convert Color
                    </button>

                    {message && (
                        <p className="mt-4 rounded-lg bg-gray-100 p-3 text-center text-sm font-medium text-gray-800">
                            {message}
                        </p>
                    )}

                    <div
                        className="mt-6 h-40 rounded-2xl border border-gray-200"
                        style={{
                            backgroundColor: /^#[0-9A-Fa-f]{6}$/.test(hex)
                                ? hex
                                : "#000000",
                        }}
                    />

                    <div className="mt-6 space-y-4">
                        <div className="rounded-xl bg-gray-100 p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">HEX</p>
                                    <p className="mt-1 font-mono text-lg font-bold text-gray-900">
                                        {hex}
                                    </p>
                                </div>

                                <button
                                    onClick={() => copyValue(hex)}
                                    className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>

                        <div className="rounded-xl bg-gray-100 p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">RGB</p>
                                    <p className="mt-1 font-mono text-lg font-bold text-gray-900">
                                        {rgb}
                                    </p>
                                </div>

                                <button
                                    onClick={() => copyValue(rgb)}
                                    className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>

                        <div className="rounded-xl bg-gray-100 p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">HSL</p>
                                    <p className="mt-1 font-mono text-lg font-bold text-gray-900">
                                        {hsl}
                                    </p>
                                </div>

                                <button
                                    onClick={() => copyValue(hsl)}
                                    className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={clearAll}
                        className="mt-5 w-full rounded-xl border border-red-300 bg-white px-6 py-3 font-semibold text-red-600 hover:bg-red-50"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </main>
    );
}