"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function ImageResizerPage() {
    const [imageSrc, setImageSrc] = useState("");
    const [fileName, setFileName] = useState("resized-image");
    const [originalWidth, setOriginalWidth] = useState(0);
    const [originalHeight, setOriginalHeight] = useState(0);
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [keepRatio, setKeepRatio] = useState(true);
    const [message, setMessage] = useState("");

    const imageRef = useRef<HTMLImageElement | null>(null);
    const objectUrlRef = useRef<string | null>(null);

    useEffect(() => {
        return () => {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }
        };
    }, []);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setMessage("Please select an image file.");
            return;
        }

        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
        }

        const url = URL.createObjectURL(file);
        objectUrlRef.current = url;

        setImageSrc(url);
        setFileName(file.name.replace(/\.[^/.]+$/, ""));
        setMessage("");
    };

    const handleImageLoad = () => {
        if (!imageRef.current) return;

        const img = imageRef.current;

        setOriginalWidth(img.naturalWidth);
        setOriginalHeight(img.naturalHeight);
        setWidth(String(img.naturalWidth));
        setHeight(String(img.naturalHeight));
    };

    const handleWidthChange = (value: string) => {
        setWidth(value);

        if (!keepRatio || !originalWidth || !originalHeight) return;

        const newWidth = Number(value);

        if (!newWidth || newWidth <= 0) {
            setHeight("");
            return;
        }

        const newHeight = Math.round(
            (newWidth / originalWidth) * originalHeight
        );

        setHeight(String(newHeight));
    };

    const handleHeightChange = (value: string) => {
        setHeight(value);

        if (!keepRatio || !originalWidth || !originalHeight) return;

        const newHeight = Number(value);

        if (!newHeight || newHeight <= 0) {
            setWidth("");
            return;
        }

        const newWidth = Math.round(
            (newHeight / originalHeight) * originalWidth
        );

        setWidth(String(newWidth));
    };

    const resizeImage = () => {
        if (!imageSrc) {
            setMessage("Please upload an image first.");
            return;
        }

        const newWidth = Number(width);
        const newHeight = Number(height);

        if (
            !Number.isFinite(newWidth) ||
            !Number.isFinite(newHeight) ||
            newWidth <= 0 ||
            newHeight <= 0
        ) {
            setMessage("Please enter valid width and height.");
            return;
        }

        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement("canvas");

            canvas.width = Math.round(newWidth);
            canvas.height = Math.round(newHeight);

            const context = canvas.getContext("2d");

            if (!context) {
                setMessage("Could not resize the image.");
                return;
            }

            context.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        setMessage("Could not create the resized image.");
                        return;
                    }

                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");

                    link.href = url;
                    link.download = `${fileName}-${canvas.width}x${canvas.height}.png`;

                    document.body.appendChild(link);
                    link.click();
                    link.remove();

                    URL.revokeObjectURL(url);

                    setMessage("Image resized and downloaded ✓");
                },
                "image/png",
                0.95
            );
        };

        img.onerror = () => {
            setMessage("Could not process the image.");
        };

        img.src = imageSrc;
    };

    const clearAll = () => {
        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
            objectUrlRef.current = null;
        }

        setImageSrc("");
        setFileName("resized-image");
        setOriginalWidth(0);
        setOriginalHeight(0);
        setWidth("");
        setHeight("");
        setMessage("");
    };

    return (
        <main className="relative z-10 min-h-screen bg-gray-50 px-4 py-12">
            <div className="relative z-10 mx-auto max-w-4xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Image Resizer
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Resize your images quickly without uploading them to a server.
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-lg">
                    <label
                        htmlFor="image-upload"
                        className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-10 text-center transition hover:border-black"
                    >
                        <span className="text-lg font-semibold text-gray-900">
                            Choose an image
                        </span>

                        <span className="mt-2 text-sm text-gray-500">
                            PNG, JPG, JPEG, WEBP, or other image formats
                        </span>

                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>

                    {imageSrc && (
                        <>
                            <div className="mt-6 rounded-xl bg-gray-100 p-4">
                                <img
                                    ref={imageRef}
                                    src={imageSrc}
                                    alt="Selected image"
                                    onLoad={handleImageLoad}
                                    className="mx-auto max-h-80 max-w-full rounded-lg object-contain"
                                />
                            </div>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-xl bg-gray-100 p-4">
                                    <p className="text-sm text-gray-500">
                                        Original Width
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-gray-900">
                                        {originalWidth}px
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-100 p-4">
                                    <p className="text-sm text-gray-500">
                                        Original Height
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-gray-900">
                                        {originalHeight}px
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block font-medium text-gray-900">
                                        New Width
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        value={width}
                                        onChange={(e) =>
                                            handleWidthChange(e.target.value)
                                        }
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-black"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block font-medium text-gray-900">
                                        New Height
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        value={height}
                                        onChange={(e) =>
                                            handleHeightChange(e.target.value)
                                        }
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-black"
                                    />
                                </div>
                            </div>

                            <label className="mt-5 flex items-center gap-3 text-gray-900">
                                <input
                                    type="checkbox"
                                    checked={keepRatio}
                                    onChange={(e) => setKeepRatio(e.target.checked)}
                                    className="h-4 w-4"
                                />

                                Keep aspect ratio
                            </label>

                            {message && (
                                <p className="mt-5 rounded-lg bg-gray-100 p-3 text-center text-sm font-medium text-gray-800">
                                    {message}
                                </p>
                            )}

                            <div className="mt-6 flex flex-wrap gap-3">
                                <button
                                    onClick={resizeImage}
                                    className="rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
                                >
                                    Resize & Download
                                </button>

                                <button
                                    onClick={clearAll}
                                    className="rounded-xl border border-red-300 bg-white px-6 py-3 font-semibold text-red-600 hover:bg-red-50"
                                >
                                    Clear
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}