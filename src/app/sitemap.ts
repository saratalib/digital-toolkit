import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://getdigitalkit.online";

    const tools = [
        "/invoice",
        "/image-compressor",
        "/image-resizer",
        "/profit",
        "/percentage-calculator",
        "/tip-calculator",
        "/unit-converter",
        "/json-formatter",
        "/base64",
        "/uuid-generator",
        "/timestamp-converter",
        "/color-converter",
        "/qr-generator",
        "/password-generator",
        "/text-formatter",
    ];

    const pages = [
        "/",
        "/privacy",
        "/terms",
        "/contact",
    ];

    return [
        ...pages.map((path) => ({
            url: `${baseUrl}${path}`,
            lastModified: new Date(),
        })),

        ...tools.map((path) => ({
            url: `${baseUrl}${path}`,
            lastModified: new Date(),
        })),
    ];
}

