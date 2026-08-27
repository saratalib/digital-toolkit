"use client";

import { useEffect, useState } from "react";

type OutputFormat = "image/jpeg" | "image/webp" | "image/png";

export default function ImageCompressorPage() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [result, setResult] = useState("");
    const [quality, setQuality] = useState(80);
    const [format, setFormat] = useState<OutputFormat>("image/jpeg");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [originalSize, setOriginalSize] = useState(0);
    const [compressedSize, setCompressedSize] = useState(0);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }

            if (result) {
                URL.revokeObjectURL(result);
            }
        };
    }, [preview, result]);

    function formatBytes(bytes: number) {
        if (!bytes) return "0 Bytes";

        const units = ["Bytes", "KB", "MB", "GB"];
        const index = Math.floor(Math.log(bytes) / Math.log(1024));

        return `${(bytes / Math.pow(1024, index)).toFixed(
            index === 0 ? 0 : 2
        )} ${units[index]}`;
    }

    function getExtension() {
        if (format === "image/webp") return "webp";
        if (format === "image/png") return "png";
        return "jpg";
    }

    function handleFileChange(selectedFile: File | null) {
        if (!selectedFile) return;

        if (!selectedFile.type.startsWith("image/")) {
            setError("Please choose a valid image file.");
            return;
        }

        if (preview) {
            URL.revokeObjectURL(preview);
        }

        if (result) {
            URL.revokeObjectURL(result);
        }

        const previewUrl = URL.createObjectURL(selectedFile);

        setFile(selectedFile);
        setPreview(previewUrl);
        setResult("");
        setError("");
        setOriginalSize(selectedFile.size);
        setCompressedSize(0);

        const image = new Image();

        image.onload = () => {
            setDimensions({
                width: image.naturalWidth,
                height: image.naturalHeight,
            });
        };

        image.onerror = () => {
            setError("Could not read this image.");
        };

        image.src = previewUrl;
    }

    async function compressImage() {
        if (!file) {
            setError("Please choose an image first.");
            return;
        }

        setLoading(true);
        setError("");

        if (result) {
            URL.revokeObjectURL(result);
            setResult("");
        }

        try {
            const image = new Image();
            const imageUrl = URL.createObjectURL(file);

            await new Promise<void>((resolve, reject) => {
                image.onload = () => resolve();

                image.onerror = () =>
                    reject(
                        new Error(
                            "Could not read the selected image."
                        )
                    );

                image.src = imageUrl;
            });

            const canvas = document.createElement("canvas");

            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;

            const context = canvas.getContext("2d");

            if (!context) {
                URL.revokeObjectURL(imageUrl);

                throw new Error(
                    "Your browser could not process this image."
                );
            }

            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";

            /*
             * JPEG and WebP don't preserve transparency.
             * Use a white background so transparent images don't
             * become black when converted.
             */
            if (
                format === "image/jpeg" ||
                format === "image/webp"
            ) {
                context.fillStyle = "#ffffff";
                context.fillRect(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
            }

            context.drawImage(
                image,
                0,
                0,
                canvas.width,
                canvas.height
            );

            URL.revokeObjectURL(imageUrl);

            const blob = await new Promise<Blob | null>(
                (resolve) => {
                    canvas.toBlob(
                        resolve,
                        format,
                        format === "image/png"
                            ? undefined
                            : quality / 100
                    );
                }
            );

            if (!blob) {
                throw new Error(
                    "Could not create the compressed image."
                );
            }

            const resultUrl = URL.createObjectURL(blob);

            setResult(resultUrl);
            setCompressedSize(blob.size);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Could not compress the image."
            );
        } finally {
            setLoading(false);
        }
    }

    function resetTool() {
        if (preview) {
            URL.revokeObjectURL(preview);
        }

        if (result) {
            URL.revokeObjectURL(result);
        }

        setFile(null);
        setPreview("");
        setResult("");
        setError("");

        setOriginalSize(0);
        setCompressedSize(0);

        setDimensions({
            width: 0,
            height: 0,
        });

        setQuality(80);
        setFormat("image/jpeg");
        setLoading(false);
    }

    const savings =
        originalSize > 0 && compressedSize > 0
            ? Math.max(
                0,
                Math.round(
                    ((originalSize - compressedSize) /
                        originalSize) *
                    100
                )
            )
            : 0;

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
                        className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                    >
                        ← Back to Tools
                    </a>
                </div>
            </header>

            <section className="mx-auto max-w-5xl px-6 py-16">
                <div className="text-center">
                    <div className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
                        🖼️ Free Image Compressor
                    </div>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                        Compress Images Online
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                        Reduce image file size while keeping your
                        pictures looking sharp. Compress JPG,
                        PNG, and WebP images directly in your
                        browser.
                    </p>
                </div>

                <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    {!file && (
                        <label
                            htmlFor="image-upload"
                            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center transition hover:border-slate-400 hover:bg-white"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-3xl text-white">
                                ↑
                            </div>

                            <h2 className="mt-5 text-xl font-bold">
                                Upload an image
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                JPG, JPEG, PNG or WEBP
                            </p>

                            <span className="mt-6 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white">
                                Choose Image
                            </span>

                            <input
                                id="image-upload"
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                className="hidden"
                                onChange={(event) =>
                                    handleFileChange(
                                        event.target.files?.[0] ||
                                        null
                                    )
                                }
                            />
                        </label>
                    )}

                    {file && (
                        <>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="break-all text-xl font-bold">
                                        {file.name}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {formatBytes(
                                            originalSize
                                        )}{" "}
                                        ·{" "}
                                        {dimensions.width} ×{" "}
                                        {dimensions.height}px
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={resetTool}
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Choose Another
                                </button>
                            </div>

                            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                                <img
                                    src={preview}
                                    alt="Image selected for compression"
                                    className="max-h-[550px] w-full object-contain"
                                />
                            </div>

                            <div className="mt-8">
                                <p className="text-sm font-semibold">
                                    Compression quality
                                </p>

                                <div className="mt-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500">
                                            Lower file size
                                        </span>

                                        <span className="font-bold">
                                            {quality}%
                                        </span>

                                        <span className="text-slate-500">
                                            Higher quality
                                        </span>
                                    </div>

                                    <input
                                        type="range"
                                        min="20"
                                        max="100"
                                        step="5"
                                        value={quality}
                                        onChange={(event) =>
                                            setQuality(
                                                Number(
                                                    event
                                                        .target
                                                        .value
                                                )
                                            )
                                        }
                                        className="mt-3 w-full"
                                    />
                                </div>
                            </div>

                            <div className="mt-8">
                                <p className="text-sm font-semibold">
                                    Output format
                                </p>

                                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormat(
                                                "image/jpeg"
                                            )
                                        }
                                        className={`rounded-2xl border p-4 text-left transition ${format ===
                                                "image/jpeg"
                                                ? "border-slate-900 bg-slate-900 text-white"
                                                : "border-slate-200 bg-white hover:border-slate-400"
                                            }`}
                                    >
                                        <div className="font-bold">
                                            JPG
                                        </div>

                                        <div
                                            className={`mt-1 text-xs ${format ===
                                                    "image/jpeg"
                                                    ? "text-slate-300"
                                                    : "text-slate-500"
                                                }`}
                                        >
                                            Small file size
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormat(
                                                "image/webp"
                                            )
                                        }
                                        className={`rounded-2xl border p-4 text-left transition ${format ===
                                                "image/webp"
                                                ? "border-slate-900 bg-slate-900 text-white"
                                                : "border-slate-200 bg-white hover:border-slate-400"
                                            }`}
                                    >
                                        <div className="font-bold">
                                            WebP
                                        </div>

                                        <div
                                            className={`mt-1 text-xs ${format ===
                                                    "image/webp"
                                                    ? "text-slate-300"
                                                    : "text-slate-500"
                                                }`}
                                        >
                                            Modern format
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormat(
                                                "image/png"
                                            )
                                        }
                                        className={`rounded-2xl border p-4 text-left transition ${format ===
                                                "image/png"
                                                ? "border-slate-900 bg-slate-900 text-white"
                                                : "border-slate-200 bg-white hover:border-slate-400"
                                            }`}
                                    >
                                        <div className="font-bold">
                                            PNG
                                        </div>

                                        <div
                                            className={`mt-1 text-xs ${format ===
                                                    "image/png"
                                                    ? "text-slate-300"
                                                    : "text-slate-500"
                                                }`}
                                        >
                                            Lossless output
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={compressImage}
                                disabled={loading}
                                className="mt-8 w-full rounded-xl bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Compressing image..."
                                    : "Compress Image"}
                            </button>
                        </>
                    )}

                    {error && (
                        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {result && (
                        <div className="mt-10 border-t border-slate-200 pt-10">
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl bg-slate-50 p-5 text-center">
                                    <div className="text-xs font-medium text-slate-500">
                                        Original
                                    </div>

                                    <div className="mt-2 text-xl font-bold">
                                        {formatBytes(
                                            originalSize
                                        )}
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-5 text-center">
                                    <div className="text-xs font-medium text-slate-500">
                                        Compressed
                                    </div>

                                    <div className="mt-2 text-xl font-bold">
                                        {formatBytes(
                                            compressedSize
                                        )}
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-slate-900 p-5 text-center text-white">
                                    <div className="text-xs font-medium text-slate-300">
                                        Saved
                                    </div>

                                    <div className="mt-2 text-xl font-bold">
                                        {savings}%
                                    </div>
                                </div>
                            </div>

                            <h2 className="mt-8 text-2xl font-bold">
                                Compressed Image
                            </h2>

                            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                                <img
                                    src={result}
                                    alt="Compressed image preview"
                                    className="max-h-[700px] w-full object-contain"
                                />
                            </div>

                            <a
                                href={result}
                                download={`digitalkit-compressed.${getExtension()}`}
                                className="mt-6 block w-full rounded-xl bg-slate-900 px-6 py-4 text-center font-semibold text-white transition hover:bg-slate-800"
                            >
                                Download Compressed Image
                            </a>
                        </div>
                    )}
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <div className="text-2xl">⚡</div>

                        <h2 className="mt-4 font-bold">
                            Fast Compression
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Compress images directly in your
                            browser without waiting for a server.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <div className="text-2xl">🔒</div>

                        <h2 className="mt-4 font-bold">
                            Private
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Your images are processed locally
                            instead of being uploaded to a server.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <div className="text-2xl">🖼️</div>

                        <h2 className="mt-4 font-bold">
                            Multiple Formats
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Choose JPG, WebP, or PNG depending on
                            your needs.
                        </p>
                    </div>
                </div>

                <div className="mt-10 text-center text-sm text-slate-500">
                    Your image is processed locally in your
                    browser. It is not uploaded to a server.
                </div>
            </section>
        </main>
    );
}