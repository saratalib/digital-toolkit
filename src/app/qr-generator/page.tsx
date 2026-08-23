"use client";

import { useRef, useState } from "react";
import QRCode from "qrcode";

export default function QRGeneratorPage() {
    const [text, setText] = useState("");
    const [qrCode, setQrCode] = useState("");
    const [error, setError] = useState("");

    const generateQR = async () => {
        if (!text.trim()) {
            setError("Please enter some text or a URL.");
            setQrCode("");
            return;
        }

        try {
            const dataUrl = await QRCode.toDataURL(text, {
                width: 400,
                margin: 2,
                errorCorrectionLevel: "M",
            });

            setQrCode(dataUrl);
            setError("");
        } catch {
            setError("Could not generate the QR code.");
            setQrCode("");
        }
    };

    const downloadQR = () => {
        if (!qrCode) return;

        const link = document.createElement("a");
        link.href = qrCode;
        link.download = "digitalkit-qr-code.png";
        link.click();
    };

    const clearAll = () => {
        setText("");
        setQrCode("");
        setError("");
    };

    return (
        <main className="relative z-10 min-h-screen bg-gray-50 px-4 py-12">
            <div className="relative z-10 mx-auto max-w-2xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        QR Code Generator
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Create a QR code for any text, link, or information.
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-lg">
                    <label className="mb-2 block font-medium text-gray-900">
                        Text or URL
                    </label>

                    <textarea
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                            setError("");
                        }}
                        placeholder="Enter a website URL, text, contact information..."
                        className="min-h-[140px] w-full rounded-xl border border-gray-300 p-4 text-gray-900 outline-none transition focus:border-black"
                    />

                    {error && (
                        <p className="mt-3 text-sm font-medium text-red-600">
                            {error}
                        </p>
                    )}

                    <div className="mt-5 flex flex-wrap gap-3">
                        <button
                            onClick={generateQR}
                            className="rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
                        >
                            Generate QR Code
                        </button>

                        <button
                            onClick={clearAll}
                            className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 hover:bg-gray-100"
                        >
                            Clear
                        </button>
                    </div>

                    {qrCode && (
                        <div className="mt-8 rounded-2xl border border-gray-200 p-6 text-center">
                            <h2 className="mb-4 text-xl font-bold text-gray-900">
                                Your QR Code
                            </h2>

                            <div className="flex justify-center">
                                <img
                                    src={qrCode}
                                    alt="Generated QR Code"
                                    className="h-72 w-72 rounded-lg"
                                />
                            </div>

                            <button
                                onClick={downloadQR}
                                className="mt-6 rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
                            >
                                Download QR Code
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}