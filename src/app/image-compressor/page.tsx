"use client";

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";

type ImageFormat = "image/jpeg" | "image/png" | "image/webp";

type ImageInfo = {
    file: File;
    previewUrl: string;
    width: number;
    height: number;
};

const formatOptions: {
    value: ImageFormat;
    label: string;
}[] = [
        { value: "image/jpeg", label: "JPG" },
        { value: "image/png", label: "PNG" },
        { value: "image/webp", label: "WebP" },
    ];

function formatBytes(bytes: number) {
    if (bytes === 0) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB"];
    const index = Math.floor(
        Math.log(bytes) / Math.log(1024)
    );

    return `${(bytes / Math.pow(1024, index)).toFixed(
        index === 0 ? 0 : 2
    )} ${units[index]}`;
}

function getExtension(format: ImageFormat) {
    if (format === "image/png") return "png";
    if (format === "image/webp") return "webp";
    return "jpg";
}

export default function ImageCompressorPage() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [image, setImage] = useState<ImageInfo | null>(null);

    const [quality, setQuality] = useState(80);

    const [maxWidth, setMaxWidth] = useState("");

    const [format, setFormat] =
        useState<ImageFormat>("image/jpeg");

    const [compressedBlob, setCompressedBlob] =
        useState<Blob | null>(null);

    const [compressedPreviewUrl, setCompressedPreviewUrl] =
        useState<string | null>(null);

    const [isCompressing, setIsCompressing] =
        useState(false);

    const [isDragging, setIsDragging] =
        useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        return () => {
            if (image?.previewUrl) {
                URL.revokeObjectURL(image.previewUrl);
            }

            if (compressedPreviewUrl) {
                URL.revokeObjectURL(compressedPreviewUrl);
            }
        };
    }, [image, compressedPreviewUrl]);

    const loadImage = (file: File) => {
        setError("");

        if (!file.type.startsWith("image/")) {
            setError(
                "Please select a valid image file."
            );
            return;
        }

        const previewUrl =
            URL.createObjectURL(file);

        const img = new Image();

        img.onload = () => {
            if (image?.previewUrl) {
                URL.revokeObjectURL(
                    image.previewUrl
                );
            }

            if (compressedPreviewUrl) {
                URL.revokeObjectURL(
                    compressedPreviewUrl
                );
            }

            setImage({
                file,
                previewUrl,
                width: img.naturalWidth,
                height: img.naturalHeight,
            });

            setCompressedBlob(null);
            setCompressedPreviewUrl(null);
        };

        img.onerror = () => {
            URL.revokeObjectURL(previewUrl);

            setError(
                "This image could not be opened. Please try another image."
            );
        };

        img.src = previewUrl;
    };

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (file) {
            loadImage(file);
        }

        event.target.value = "";
    };

    const handleDrop = (
        event: DragEvent<HTMLDivElement>
    ) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files?.[0];

        if (file) {
            loadImage(file);
        }
    };

    const compressImage = async () => {
        if (!image) return;

        setError("");
        setIsCompressing(true);

        try {
            const img = new Image();

            img.src = image.previewUrl;

            await new Promise<void>(
                (resolve, reject) => {
                    img.onload = () => resolve();
                    img.onerror = () =>
                        reject(
                            new Error(
                                "Could not load image."
                            )
                        );
                }
            );

            let targetWidth = image.width;
            let targetHeight = image.height;

            const requestedWidth =
                Number(maxWidth);

            if (
                requestedWidth > 0 &&
                requestedWidth < image.width
            ) {
                targetWidth = requestedWidth;

                targetHeight = Math.round(
                    (image.height / image.width) *
                    targetWidth
                );
            }

            const canvas =
                document.createElement("canvas");

            canvas.width = targetWidth;
            canvas.height = targetHeight;

            const context =
                canvas.getContext("2d");

            if (!context) {
                throw new Error(
                    "Your browser could not create the image canvas."
                );
            }

            if (format === "image/jpeg") {
                context.fillStyle = "#ffffff";

                context.fillRect(
                    0,
                    0,
                    targetWidth,
                    targetHeight
                );
            }

            context.drawImage(
                img,
                0,
                0,
                targetWidth,
                targetHeight
            );

            const qualityValue =
                quality / 100;

            const blob =
                await new Promise<Blob | null>(
                    (resolve) => {
                        canvas.toBlob(
                            resolve,
                            format,
                            qualityValue
                        );
                    }
                );

            if (!blob) {
                throw new Error(
                    "The browser could not compress this image."
                );
            }

            if (compressedPreviewUrl) {
                URL.revokeObjectURL(
                    compressedPreviewUrl
                );
            }

            const newPreviewUrl =
                URL.createObjectURL(blob);

            setCompressedBlob(blob);
            setCompressedPreviewUrl(
                newPreviewUrl
            );
        } catch (compressionError) {
            console.error(
                compressionError
            );

            setError(
                "Something went wrong while compressing the image."
            );
        } finally {
            setIsCompressing(false);
        }
    };

    const downloadImage = () => {
        if (!compressedBlob || !image) {
            return;
        }

        const url =
            URL.createObjectURL(
                compressedBlob
            );

        const link =
            document.createElement("a");

        const originalName =
            image.file.name.replace(
                /\.[^/.]+$/,
                ""
            );

        link.href = url;

        link.download = `${originalName}-compressed.${getExtension(
            format
        )}`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(url);
    };

    const reset = () => {
        if (image?.previewUrl) {
            URL.revokeObjectURL(
                image.previewUrl
            );
        }

        if (compressedPreviewUrl) {
            URL.revokeObjectURL(
                compressedPreviewUrl
            );
        }

        setImage(null);
        setCompressedBlob(null);
        setCompressedPreviewUrl(null);
        setError("");
        setQuality(80);
        setMaxWidth("");
        setFormat("image/jpeg");
    };

    const compressionPercent =
        image && compressedBlob
            ? Math.max(
                0,
                Math.round(
                    (1 -
                        compressedBlob.size /
                        image.file.size) *
                    100
                )
            )
            : 0;

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">

            <div className="mx-auto max-w-6xl">

                {/* BACK */}

                <a
                    href="/"
                    className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                >
                    ← Back to DigitalKit
                </a>

                {/* HEADER */}

                <div className="mt-8">

                    <h1 className="text-4xl font-bold tracking-tight">
                        Image Compressor
                    </h1>

                    <p className="mt-3 max-w-2xl text-slate-600">
                        Compress images quickly without
                        uploading them to a server. Reduce
                        file size while keeping your images
                        looking great.
                    </p>

                </div>

                {/* ERROR */}

                {error && (
                    <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {!image ? (

                    /* UPLOAD AREA */

                    <section className="mt-10">

                        <div
                            onDragEnter={(event) => {
                                event.preventDefault();
                                setIsDragging(true);
                            }}
                            onDragOver={(event) => {
                                event.preventDefault();
                                setIsDragging(true);
                            }}
                            onDragLeave={(event) => {
                                event.preventDefault();
                                setIsDragging(false);
                            }}
                            onDrop={handleDrop}
                            className={`rounded-3xl border-2 border-dashed p-10 text-center transition sm:p-16 ${isDragging
                                    ? "border-slate-900 bg-slate-100"
                                    : "border-slate-300 bg-white hover:border-slate-400"
                                }`}
                        >

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                                🖼️
                            </div>

                            <h2 className="mt-6 text-2xl font-bold">
                                Drop your image here
                            </h2>

                            <p className="mt-2 text-slate-500">
                                or choose an image from your
                                computer
                            </p>

                            <button
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                                className="mt-6 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
                            >
                                Choose Image
                            </button>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            <p className="mt-5 text-xs text-slate-400">
                                JPG, PNG, WebP and other common
                                image formats
                            </p>

                            <div className="mx-auto mt-8 max-w-xl rounded-xl bg-slate-50 p-4 text-left">

                                <p className="text-sm font-semibold">
                                    🔒 Your privacy
                                </p>

                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Your image is processed directly
                                    in your browser. It is not
                                    uploaded to our server.
                                </p>

                            </div>

                        </div>

                    </section>

                ) : (

                    /* MAIN COMPRESSOR */

                    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">

                        {/* IMAGE PREVIEW */}

                        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                <div>

                                    <h2 className="text-xl font-bold">
                                        Your image
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {image.file.name}
                                    </p>

                                </div>

                                <button
                                    onClick={reset}
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                                >
                                    Choose another
                                </button>

                            </div>

                            <div className="mt-6 overflow-hidden rounded-2xl bg-slate-100">

                                <img
                                    src={image.previewUrl}
                                    alt="Selected image"
                                    className="mx-auto max-h-[600px] w-auto max-w-full object-contain"
                                />

                            </div>

                            <div className="mt-5 grid gap-3 sm:grid-cols-3">

                                <div className="rounded-xl bg-slate-50 p-4">

                                    <p className="text-xs font-medium text-slate-500">
                                        Original size
                                    </p>

                                    <p className="mt-1 font-bold">
                                        {formatBytes(
                                            image.file.size
                                        )}
                                    </p>

                                </div>

                                <div className="rounded-xl bg-slate-50 p-4">

                                    <p className="text-xs font-medium text-slate-500">
                                        Dimensions
                                    </p>

                                    <p className="mt-1 font-bold">
                                        {image.width} ×{" "}
                                        {image.height}
                                    </p>

                                </div>

                                <div className="rounded-xl bg-slate-50 p-4">

                                    <p className="text-xs font-medium text-slate-500">
                                        Format
                                    </p>

                                    <p className="mt-1 font-bold uppercase">
                                        {image.file.type
                                            .split("/")
                                            .pop()}
                                    </p>

                                </div>

                            </div>

                            {compressedBlob && (
                                <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4">

                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                                        <div>

                                            <p className="text-sm font-semibold text-green-800">
                                                Compression complete
                                            </p>

                                            <p className="mt-1 text-sm text-green-700">
                                                {formatBytes(
                                                    image.file.size
                                                )}{" "}
                                                →{" "}
                                                {formatBytes(
                                                    compressedBlob.size
                                                )}
                                            </p>

                                        </div>

                                        <div className="text-lg font-bold text-green-700">
                                            {compressionPercent}%
                                            smaller
                                        </div>

                                    </div>

                                </div>
                            )}

                        </section>

                        {/* SETTINGS */}

                        <section className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                            <h2 className="text-xl font-bold">
                                Compression settings
                            </h2>

                            {/* QUALITY */}

                            <div className="mt-7">

                                <div className="flex items-center justify-between">

                                    <label className="text-sm font-semibold">
                                        Quality
                                    </label>

                                    <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-bold">
                                        {quality}%
                                    </span>

                                </div>

                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    step="5"
                                    value={quality}
                                    onChange={(e) =>
                                        setQuality(
                                            Number(
                                                e.target.value
                                            )
                                        )
                                    }
                                    className="mt-4 w-full accent-slate-900"
                                />

                                <div className="mt-2 flex justify-between text-xs text-slate-400">
                                    <span>
                                        Smaller file
                                    </span>

                                    <span>
                                        Better quality
                                    </span>
                                </div>

                            </div>

                            {/* FORMAT */}

                            <div className="mt-7">

                                <label className="text-sm font-semibold">
                                    Output format
                                </label>

                                <div className="mt-3 grid grid-cols-3 gap-2">

                                    {formatOptions.map(
                                        (option) => (

                                            <button
                                                key={
                                                    option.value
                                                }
                                                onClick={() =>
                                                    setFormat(
                                                        option.value
                                                    )
                                                }
                                                className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${format ===
                                                        option.value
                                                        ? "border-slate-900 bg-slate-900 text-white"
                                                        : "border-slate-200 hover:border-slate-400"
                                                    }`}
                                            >
                                                {
                                                    option.label
                                                }
                                            </button>

                                        )
                                    )}

                                </div>

                            </div>

                            {/* WIDTH */}

                            <div className="mt-7">

                                <label className="text-sm font-semibold">
                                    Maximum width
                                    <span className="ml-1 font-normal text-slate-400">
                                        (optional)
                                    </span>
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    placeholder={`Original: ${image.width}px`}
                                    value={maxWidth}
                                    onChange={(e) =>
                                        setMaxWidth(
                                            e.target.value
                                        )
                                    }
                                    className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
                                />

                                <p className="mt-2 text-xs leading-5 text-slate-400">
                                    The height will be adjusted
                                    automatically to keep the
                                    original proportions.
                                </p>

                            </div>

                            {/* COMPRESS */}

                            <button
                                onClick={compressImage}
                                disabled={isCompressing}
                                className="mt-8 w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isCompressing
                                    ? "Compressing..."
                                    : "Compress Image"}
                            </button>

                            {/* DOWNLOAD */}

                            {compressedBlob && (
                                <button
                                    onClick={downloadImage}
                                    className="mt-3 w-full rounded-xl border border-slate-900 px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-50"
                                >
                                    Download Compressed Image
                                </button>
                            )}

                            <div className="mt-6 rounded-xl bg-slate-50 p-4">

                                <p className="text-xs font-semibold">
                                    💡 Tip
                                </p>

                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    For websites, try WebP at
                                    around 75–85% quality. For
                                    photos that need maximum
                                    compatibility, JPG is a good
                                    choice.
                                </p>

                            </div>

                        </section>

                    </div>

                )}

                {/* BOTTOM INFO */}

                <section className="mt-12 grid gap-4 sm:grid-cols-3">

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">

                        <div className="text-2xl">
                            ⚡
                        </div>

                        <h3 className="mt-3 font-bold">
                            Fast
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                            Compress images directly in
                            your browser without waiting
                            for uploads.
                        </p>

                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">

                        <div className="text-2xl">
                            🔒
                        </div>

                        <h3 className="mt-3 font-bold">
                            Private
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                            Your images stay on your device
                            while they are being processed.
                        </p>

                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">

                        <div className="text-2xl">
                            💰
                        </div>

                        <h3 className="mt-3 font-bold">
                            Free to use
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                            Compress images without
                            creating an account or paying
                            for a subscription.
                        </p>

                    </div>

                </section>

            </div>

        </main>
    );
}