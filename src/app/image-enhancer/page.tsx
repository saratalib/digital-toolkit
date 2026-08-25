"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

type Scale = 2 | 4;

function formatBytes(bytes: number) {
    if (!bytes) return "0 B";

    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function imageToImageData(file: File): Promise<{
    width: number;
    height: number;
    imageData: ImageData;
}> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        const url = URL.createObjectURL(file);

        image.onload = () => {
            try {
                const width = image.naturalWidth;
                const height = image.naturalHeight;

                if (!width || !height) {
                    throw new Error("Could not determine image dimensions.");
                }

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;

                const context = canvas.getContext("2d", {
                    willReadFrequently: true,
                });

                if (!context) {
                    throw new Error(
                        "Your browser could not create a canvas."
                    );
                }

                context.drawImage(
                    image,
                    0,
                    0,
                    width,
                    height
                );

                const imageData = context.getImageData(
                    0,
                    0,
                    width,
                    height
                );

                URL.revokeObjectURL(url);

                resolve({
                    width,
                    height,
                    imageData,
                });
            } catch (error) {
                URL.revokeObjectURL(url);
                reject(error);
            }
        };

        image.onerror = () => {
            URL.revokeObjectURL(url);
            reject(
                new Error("Could not read the selected image.")
            );
        };

        image.src = url;
    });
}

export default function ImageEnhancerPage() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState("");

    // IMPORTANT:
    // We store the enhanced image as a data URL.
    // This avoids blob URL display/revocation problems.
    const [result, setResult] = useState("");

    const [scale, setScale] = useState<Scale>(2);

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    const [originalDimensions, setOriginalDimensions] = useState({
        width: 0,
        height: 0,
    });

    const [resultDimensions, setResultDimensions] = useState({
        width: 0,
        height: 0,
    });

    const [resultSize, setResultSize] = useState(0);

    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }

            if (workerRef.current) {
                workerRef.current.terminate();
                workerRef.current = null;
            }
        };
    }, [preview]);

    function handleFileChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const selectedFile =
            event.target.files?.[0] || null;

        if (!selectedFile) {
            return;
        }

        if (!selectedFile.type.startsWith("image/")) {
            setError("Please choose a valid image.");
            return;
        }

        if (preview) {
            URL.revokeObjectURL(preview);
        }

        if (workerRef.current) {
            workerRef.current.terminate();
            workerRef.current = null;
        }

        const previewUrl =
            URL.createObjectURL(selectedFile);

        const image = new Image();

        image.onload = () => {
            setOriginalDimensions({
                width: image.naturalWidth,
                height: image.naturalHeight,
            });

            URL.revokeObjectURL(previewUrl);

            const newPreviewUrl =
                URL.createObjectURL(selectedFile);

            setPreview(newPreviewUrl);
        };

        image.onerror = () => {
            URL.revokeObjectURL(previewUrl);
            setError("Could not read this image.");
        };

        image.src = previewUrl;

        setFile(selectedFile);

        setResult("");

        setResultDimensions({
            width: 0,
            height: 0,
        });

        setResultSize(0);

        setProgress(0);
        setStatus("");
        setError("");
    }

    async function enhanceImage() {
        if (!file) {
            setError("Please choose an image first.");
            return;
        }

        if (loading) {
            return;
        }

        setLoading(true);
        setProgress(0);
        setError("");
        setStatus("Preparing image...");
        setResult("");

        if (workerRef.current) {
            workerRef.current.terminate();
            workerRef.current = null;
        }

        let worker: Worker | null = null;

        try {
            const {
                width,
                height,
                imageData,
            } = await imageToImageData(file);

            const inputData =
                new Uint8Array(imageData.data);

            let hasAlpha = false;

            for (
                let i = 3;
                i < inputData.length;
                i += 4
            ) {
                if (inputData[i] !== 255) {
                    hasAlpha = true;
                    break;
                }
            }

            setStatus(
                "Loading Real-ESRGAN AI model..."
            );

            /*
             * The original web-realesrgan worker expects:
             *
             * input
             * width
             * height
             * hasAlpha
             * model_type
             * model
             * factor
             * tile_size
             * min_lap
             * backend
             */
            worker = new Worker(
                new URL(
                    "../../workers/realesrgan.worker.js",
                    import.meta.url
                )
            );

            workerRef.current = worker;

            const outputBuffer =
                await new Promise<ArrayBuffer>(
                    (resolve, reject) => {
                        let finished = false;

                        worker!.onmessage = (
                            event: MessageEvent
                        ) => {
                            const data =
                                event.data;

                            if (
                                typeof data?.info ===
                                "string"
                            ) {
                                setStatus(data.info);
                            }

                            if (
                                typeof data?.progress ===
                                "number"
                            ) {
                                setProgress(
                                    Math.max(
                                        0,
                                        Math.min(
                                            100,
                                            data.progress
                                        )
                                    )
                                );
                            }

                            if (data?.alertmsg) {
                                if (!finished) {
                                    finished = true;

                                    reject(
                                        new Error(
                                            String(
                                                data.alertmsg
                                            )
                                        )
                                    );
                                }

                                return;
                            }

                            if (
                                data?.done &&
                                data?.output
                            ) {
                                if (!finished) {
                                    finished = true;

                                    resolve(
                                        data.output
                                    );
                                }
                            }
                        };

                        worker!.onerror = (
                            event: ErrorEvent
                        ) => {
                            if (!finished) {
                                finished = true;

                                reject(
                                    new Error(
                                        event.message ||
                                        "The AI worker failed. Your browser may not support WebGPU/WebGL correctly."
                                    )
                                );
                            }
                        };

                        worker!.postMessage(
                            {
                                input:
                                    inputData.buffer,

                                width,
                                height,

                                hasAlpha,

                                model_type:
                                    "realesrgan",

                                model:
                                    "general_fast",

                                // Real-ESRGAN general_fast
                                // is a native 4× model.
                                factor: 4,

                                tile_size: 64,

                                min_lap: 12,

                                backend:
                                    "webgpu" in
                                        navigator
                                        ? "webgpu"
                                        : "webgl",
                            },
                            [inputData.buffer]
                        );
                    }
                );

            setStatus(
                "AI enhancement completed. Creating image..."
            );

            /*
             * The worker returns RGBA pixels.
             *
             * general_fast = 4×.
             */
            const aiWidth = width * 4;
            const aiHeight = height * 4;

            const expectedLength =
                aiWidth *
                aiHeight *
                4;

            const outputPixels =
                new Uint8ClampedArray(
                    outputBuffer
                );

            console.log(
                "REAL-ESRGAN OUTPUT:",
                outputPixels.length,
                "expected:",
                expectedLength
            );

            if (
                outputPixels.length <
                expectedLength
            ) {
                throw new Error(
                    `The AI returned incomplete image data. Received ${outputPixels.length} pixels, expected ${expectedLength}.`
                );
            }

            /*
             * Create the actual 4× AI image.
             */
            const aiCanvas =
                document.createElement("canvas");

            aiCanvas.width = aiWidth;
            aiCanvas.height = aiHeight;

            const aiContext =
                aiCanvas.getContext("2d");

            if (!aiContext) {
                throw new Error(
                    "Could not create the AI output canvas."
                );
            }

            const aiImageData =
                new ImageData(
                    outputPixels.slice(
                        0,
                        expectedLength
                    ),
                    aiWidth,
                    aiHeight
                );

            aiContext.putImageData(
                aiImageData,
                0,
                0
            );

            /*
             * Determine final output size.
             *
             * 4× = native Real-ESRGAN result.
             * 2× = AI 4× result resized down to 2×.
             */
            const finalWidth =
                scale === 4
                    ? aiWidth
                    : width * 2;

            const finalHeight =
                scale === 4
                    ? aiHeight
                    : height * 2;

            const finalCanvas =
                document.createElement("canvas");

            finalCanvas.width =
                finalWidth;

            finalCanvas.height =
                finalHeight;

            const finalContext =
                finalCanvas.getContext("2d");

            if (!finalContext) {
                throw new Error(
                    "Could not create the final enhanced image."
                );
            }

            finalContext.imageSmoothingEnabled =
                true;

            finalContext.imageSmoothingQuality =
                "high";

            finalContext.drawImage(
                aiCanvas,
                0,
                0,
                aiWidth,
                aiHeight,
                0,
                0,
                finalWidth,
                finalHeight
            );

            /*
             * IMPORTANT:
             *
             * Use dataURL instead of createObjectURL().
             *
             * This keeps the image available to the
             * <img> element without blob URL lifecycle
             * problems.
             */
            const resultDataUrl =
                finalCanvas.toDataURL(
                    "image/png"
                );

            if (
                !resultDataUrl ||
                resultDataUrl.length < 100
            ) {
                throw new Error(
                    "The enhanced image could not be created."
                );
            }

            console.log(
                "ENHANCED IMAGE CREATED:",
                finalWidth,
                "x",
                finalHeight,
                "data URL length:",
                resultDataUrl.length
            );

            setResult(
                resultDataUrl
            );

            setResultDimensions({
                width: finalWidth,
                height: finalHeight,
            });

            /*
             * Estimate PNG size from the data URL.
             */
            const base64 =
                resultDataUrl.split(",")[1] ||
                "";

            const estimatedSize =
                Math.floor(
                    (base64.length * 3) /
                    4
                );

            setResultSize(
                estimatedSize
            );

            setProgress(100);

            setStatus(
                "AI enhancement completed successfully."
            );
        } catch (err) {
            console.error(
                "IMAGE ENHANCER ERROR:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Could not enhance the image."
            );

            setStatus("");
        } finally {
            if (worker) {
                worker.terminate();
            }

            workerRef.current = null;

            setLoading(false);
        }
    }

    function resetTool() {
        if (preview) {
            URL.revokeObjectURL(preview);
        }

        if (workerRef.current) {
            workerRef.current.terminate();
            workerRef.current = null;
        }

        setFile(null);
        setPreview("");
        setResult("");

        setError("");
        setStatus("");

        setLoading(false);
        setProgress(0);

        setOriginalDimensions({
            width: 0,
            height: 0,
        });

        setResultDimensions({
            width: 0,
            height: 0,
        });

        setResultSize(0);
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
                        className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                    >
                        ← Back to Tools
                    </a>
                </div>
            </header>

            <section className="mx-auto max-w-4xl px-6 py-12">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                        AI Image Enhancer
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-slate-500">
                        Upscale and enhance low-resolution
                        images using Real-ESRGAN AI directly
                        in your browser. Your image stays
                        on your device.
                    </p>
                </div>

                <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    {!file && (
                        <label
                            htmlFor="image-upload"
                            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center transition hover:border-slate-400 hover:bg-white"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-2xl text-white">
                                ↑
                            </div>

                            <h2 className="mt-5 text-xl font-bold text-slate-900">
                                Upload an image
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                PNG, JPG, JPEG or WEBP
                            </p>

                            <span className="mt-6 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white">
                                Choose Image
                            </span>

                            <input
                                id="image-upload"
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                className="hidden"
                                onChange={
                                    handleFileChange
                                }
                            />
                        </label>
                    )}

                    {file && (
                        <>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="break-all text-xl font-bold text-slate-900">
                                        {file.name}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {formatBytes(
                                            file.size
                                        )}{" "}
                                        ·{" "}
                                        {
                                            originalDimensions.width
                                        }{" "}
                                        ×{" "}
                                        {
                                            originalDimensions.height
                                        }
                                        px
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={
                                        resetTool
                                    }
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Choose Another
                                </button>
                            </div>

                            {!result && (
                                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                                    <img
                                        src={preview}
                                        alt="Original image"
                                        className="mx-auto block max-h-[600px] max-w-full object-contain"
                                    />
                                </div>
                            )}

                            {result && (
                                <div className="mt-6">
                                    <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-600">
                                        <span>Original</span>
                                        <span>AI Enhanced</span>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                                            <div className="border-b border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
                                                Original
                                            </div>

                                            {preview && (
                                                <img
                                                    src={preview}
                                                    alt="Original image"
                                                    className="block h-auto w-full object-contain"
                                                />
                                            )}
                                        </div>

                                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                                            <div className="border-b border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
                                                AI Enhanced
                                            </div>

                                            <img
                                                src={result}
                                                alt="AI enhanced image"
                                                className="block h-auto w-full object-contain"
                                                onLoad={() =>
                                                    console.log(
                                                        "AI ENHANCED IMAGE VISIBLE"
                                                    )
                                                }
                                                onError={() =>
                                                    console.error(
                                                        "AI ENHANCED IMAGE FAILED",
                                                        result
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <p className="mt-3 text-center text-xs text-slate-500">
                                        Real-ESRGAN enhanced image ·{" "}
                                        {resultDimensions.width} ×{" "}
                                        {resultDimensions.height}px
                                    </p>
                                </div>
                            )}

                            <div className="mt-8">
                                <p className="text-sm font-semibold text-slate-900">
                                    Enhancement level
                                </p>

                                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setScale(
                                                2
                                            )
                                        }
                                        disabled={
                                            loading
                                        }
                                        className={`rounded-2xl border p-5 text-left transition ${scale === 2
                                            ? "border-slate-900 bg-slate-900 text-white"
                                            : "border-slate-200 bg-white text-slate-900 hover:border-slate-400"
                                            }`}
                                    >
                                        <div className="text-lg font-bold">
                                            HD · 2×
                                        </div>

                                        <div
                                            className={`mt-1 text-sm ${scale ===
                                                2
                                                ? "text-slate-300"
                                                : "text-slate-500"
                                                }`}
                                        >
                                            Real-ESRGAN
                                            AI processing
                                            with 2× final
                                            output
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setScale(
                                                4
                                            )
                                        }
                                        disabled={
                                            loading
                                        }
                                        className={`rounded-2xl border p-5 text-left transition ${scale === 4
                                            ? "border-slate-900 bg-slate-900 text-white"
                                            : "border-slate-200 bg-white text-slate-900 hover:border-slate-400"
                                            }`}
                                    >
                                        <div className="text-lg font-bold">
                                            Super HD ·
                                            4×
                                        </div>

                                        <div
                                            className={`mt-1 text-sm ${scale ===
                                                4
                                                ? "text-slate-300"
                                                : "text-slate-500"
                                                }`}
                                        >
                                            Full native
                                            Real-ESRGAN
                                            4× output
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={
                                    enhanceImage
                                }
                                disabled={loading}
                                className="mt-8 w-full rounded-xl bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? `Enhancing... ${Math.round(
                                        progress
                                    )}%`
                                    : result
                                        ? `Enhance Again · ${scale}×`
                                        : `Enhance Image · ${scale}×`}
                            </button>

                            {loading && (
                                <div className="mt-4">
                                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                                        <div
                                            className="h-full rounded-full bg-slate-900 transition-all duration-300"
                                            style={{
                                                width: `${progress}%`,
                                            }}
                                        />
                                    </div>

                                    {status && (
                                        <p className="mt-2 text-center text-xs text-slate-500">
                                            {status}
                                        </p>
                                    )}
                                </div>
                            )}

                            {!loading &&
                                status && (
                                    <p className="mt-4 text-center text-sm font-medium text-emerald-600">
                                        {status}
                                    </p>
                                )}

                            {result && (
                                <a
                                    href={result}
                                    download={`digitalkit-enhanced-${scale}x.png`}
                                    className="mt-6 block w-full rounded-xl bg-slate-900 px-6 py-4 text-center font-semibold text-white transition hover:bg-slate-800"
                                >
                                    Download Enhanced Image
                                </a>
                            )}
                        </>
                    )}

                    {error && (
                        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                            {error}
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center text-sm text-slate-500">
                    Your image is processed locally in your
                    browser using Real-ESRGAN AI. It is not
                    uploaded to a server.
                </div>
            </section>
        </main>
    );
}
