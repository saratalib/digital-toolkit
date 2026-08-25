"use client";

import { useEffect, useState } from "react";

type Scale = 2 | 4;

export default function ImageEnhancerPage() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [result, setResult] = useState("");
    const [scale, setScale] = useState<Scale>(2);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
            if (result) URL.revokeObjectURL(result);
        };
    }, [preview, result]);

    function handleFileChange(selectedFile: File | null) {
        if (!selectedFile) return;

        if (!selectedFile.type.startsWith("image/")) {
            setError("Please choose a valid image.");
            return;
        }

        if (preview) URL.revokeObjectURL(preview);
        if (result) URL.revokeObjectURL(result);

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setResult("");
        setError("");
    }

    async function enhanceImage() {
        if (!file) {
            setError("Please choose an image first.");
            return;
        }

        setLoading(true);
        setError("");
        setResult("");

        try {
            const image = new Image();
            const imageUrl = URL.createObjectURL(file);

            await new Promise<void>((resolve, reject) => {
                image.onload = () => resolve();
                image.onerror = () => reject(new Error("Could not read the image."));
                image.src = imageUrl;
            });

            const maxOutputSize = 8000;

            let width = image.naturalWidth * scale;
            let height = image.naturalHeight * scale;

            if (width > maxOutputSize || height > maxOutputSize) {
                const ratio = Math.min(
                    maxOutputSize / width,
                    maxOutputSize / height
                );

                width = Math.floor(width * ratio);
                height = Math.floor(height * ratio);
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");

            if (!ctx) {
                throw new Error("Your browser could not process the image.");
            }

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            ctx.drawImage(image, 0, 0, width, height);

            URL.revokeObjectURL(imageUrl);

            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;
            const original = new Uint8ClampedArray(data);

            const strength = scale === 4 ? 0.28 : 0.22;

            for (let y = 1; y < height - 1; y++) {
                for (let x = 1; x < width - 1; x++) {
                    const i = (y * width + x) * 4;

                    for (let channel = 0; channel < 3; channel++) {
                        const center = original[i + channel];

                        const top = original[i - width * 4 + channel];
                        const bottom = original[i + width * 4 + channel];
                        const left = original[i - 4 + channel];
                        const right = original[i + 4 + channel];

                        const sharpened =
                            center * 5 - top - bottom - left - right;

                        data[i + channel] =
                            center + (sharpened - center) * strength;
                    }
                }
            }

            ctx.putImageData(imageData, 0, 0);

            const blob = await new Promise<Blob | null>((resolve) => {
                canvas.toBlob(resolve, "image/png", 1);
            });

            if (!blob) {
                throw new Error("Could not create the enhanced image.");
            }

            setResult(URL.createObjectURL(blob));
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Could not enhance the image."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                    <a
                        href="/"
                        className="text-xl font-bold tracking-tight text-slate-900"
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

            <section className="mx-auto max-w-5xl px-6 py-16">
                <div className="text-center">
                    <div className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
                        ✨ Free Image Enhancer
                    </div>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                        Make Your Images HD
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                        Upscale and sharpen your images directly in your browser.
                        Choose HD 2× or Super HD 4× and download your enhanced image.
                    </p>
                </div>

                <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <label
                        htmlFor="image-upload"
                        className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 px-6 py-14 text-center transition hover:border-slate-400 hover:bg-slate-50"
                    >
                        <div className="text-5xl">🖼️</div>

                        <h2 className="mt-5 text-xl font-bold text-slate-900">
                            Upload an image
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            PNG, JPG, JPEG or WEBP
                        </p>

                        <span className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
                            Choose Image
                        </span>

                        <input
                            id="image-upload"
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            className="hidden"
                            onChange={(event) =>
                                handleFileChange(event.target.files?.[0] || null)
                            }
                        />
                    </label>

                    {file && (
                        <div className="mt-8">
                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                                <img
                                    src={preview}
                                    alt="Selected image"
                                    className="max-h-[500px] w-full object-contain"
                                />
                            </div>

                            <p className="mt-3 text-center text-sm text-slate-500">
                                {file.name}
                            </p>

                            <div className="mt-8">
                                <p className="text-sm font-semibold text-slate-900">
                                    Enhancement level
                                </p>

                                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                    <button
                                        type="button"
                                        onClick={() => setScale(2)}
                                        className={`rounded-2xl border p-5 text-left transition ${scale === 2
                                                ? "border-slate-900 bg-slate-900 text-white"
                                                : "border-slate-200 bg-white text-slate-900 hover:border-slate-400"
                                            }`}
                                    >
                                        <div className="text-lg font-bold">HD · 2×</div>

                                        <div
                                            className={`mt-1 text-sm ${scale === 2 ? "text-slate-300" : "text-slate-500"
                                                }`}
                                        >
                                            Sharper and larger
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setScale(4)}
                                        className={`rounded-2xl border p-5 text-left transition ${scale === 4
                                                ? "border-slate-900 bg-slate-900 text-white"
                                                : "border-slate-200 bg-white text-slate-900 hover:border-slate-400"
                                            }`}
                                    >
                                        <div className="text-lg font-bold">
                                            Super HD · 4×
                                        </div>

                                        <div
                                            className={`mt-1 text-sm ${scale === 4 ? "text-slate-300" : "text-slate-500"
                                                }`}
                                        >
                                            Maximum free upscale
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={enhanceImage}
                                disabled={loading}
                                className="mt-8 w-full rounded-xl bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Enhancing image..."
                                    : `Enhance Image · ${scale}×`}
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {result && (
                        <div className="mt-10 border-t border-slate-200 pt-10">
                            <h2 className="text-2xl font-bold text-slate-900">
                                Enhanced Image
                            </h2>

                            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                                <img
                                    src={result}
                                    alt="Enhanced image"
                                    className="max-h-[700px] w-full object-contain"
                                />
                            </div>

                            <a
                                href={result}
                                download={`digitalkit-enhanced-${scale}x.png`}
                                className="mt-6 block w-full rounded-xl bg-slate-900 px-6 py-4 text-center font-semibold text-white transition hover:bg-slate-800"
                            >
                                Download Enhanced Image
                            </a>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center text-sm text-slate-500">
                    Your image is processed locally in your browser. It is not uploaded
                    to a server.
                </div>
            </section>
        </main>
    );
}