"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const tools = [
    {
        name: "Invoice Generator",
        description:
            "Create clean, professional invoices quickly and download them for your customers.",
        icon: "🧾",
        href: "/invoice",
        label: "Business",
    },
    {
        name: "Image Compressor",
        description:
            "Reduce image file sizes while keeping your images looking sharp and useful.",
        icon: "🖼️",
        href: "/image-compressor",
        label: "Images",
    },
    {
        name: "Profit & Pricing Calculator",
        description:
            "Calculate profit, margin, markup, and the selling price needed for your target margin.",
        icon: "💰",
        href: "/profit",
        label: "Business",
    },
    {
        name: "Unit Converter",
        description:
            "Convert length, weight, temperature, area, volume, and speed instantly.",
        icon: "📏",
        href: "/unit-converter",
        label: "Utilities",
    },
    {
        name: "JSON Formatter",
        description:
            "Format, minify, validate, and copy JSON quickly.",
        icon: "🧩",
        href: "/json-formatter",
        label: "Developer",
    },
    {
        name: "Base64 Encoder & Decoder",
        description:
            "Encode text to Base64 or decode Base64 back into readable text.",
        icon: "🔐",
        href: "/base64",
        label: "Developer",
    },
    {
        name: "UUID Generator",
        description:
            "Generate random UUIDs instantly for your apps and projects.",
        icon: "🆔",
        href: "/uuid-generator",
        label: "Developer",
    },
    {
        name: "Timestamp Converter",
        description:
            "Convert Unix timestamps into dates and dates into Unix timestamps.",
        icon: "🕐",
        href: "/timestamp-converter",
        label: "Developer",
    },
    {
        name: "Color Converter",
        description:
            "Convert HEX colors to RGB and HSL with a live color preview.",
        icon: "🎨",
        href: "/color-converter",
        label: "Design",
    },
    {
        name: "Image Resizer",
        description:
            "Resize images to your preferred dimensions directly in your browser.",
        icon: "📐",
        href: "/image-resizer",
        label: "Images",
    },
    {
        name: "Percentage Calculator",
        description:
            "Calculate percentages, percentage changes, increases, and decreases.",
        icon: "％",
        href: "/percentage-calculator",
        label: "Calculators",
    },
    {
        name: "Tip Calculator",
        description:
            "Calculate tips, total bills, and the amount each person should pay.",
        icon: "🧮",
        href: "/tip-calculator",
        label: "Calculators",
    },
    {
        name: "QR Code Generator",
        description:
            "Create QR codes for links, text, contact information, and more instantly.",
        icon: "▦",
        href: "/qr-generator",
        label: "Utilities",
    },
    {
        name: "Password Generator",
        description:
            "Generate strong random passwords with customizable length and character options.",
        icon: "🔑",
        href: "/password-generator",
        label: "Security",
    },
    {
        name: "Text Formatter",
        description:
            "Format, clean, transform, and organize text quickly with simple online tools.",
        icon: "📝",
        href: "/text-formatter",
        label: "Utilities",
    },
    {
        name: "AI Image Enhancer",
        description:
            "Enhance and upscale images directly in your browser with AI-powered image processing.",
        icon: "✨",
        href: "/image-enhancer",
        label: "Images",
    },
];

const faqItems = [
    {
        question: "Are DigitalKit tools free to use?",
        answer:
            "Yes. DigitalKit provides free browser-based tools for common business, image, developer, calculator, security, and everyday digital tasks.",
    },
    {
        question: "Do I need to install software?",
        answer:
            "No. DigitalKit tools are designed to work directly in your web browser, so you can use them without installing desktop software.",
    },
    {
        question: "What types of tools are available?",
        answer:
            "DigitalKit includes business tools, calculators, image tools, developer utilities, converters, text tools, security utilities, and other practical online tools.",
    },
    {
        question: "Can I use DigitalKit on my phone?",
        answer:
            "Yes. DigitalKit is designed to work across modern desktop and mobile web browsers.",
    },
];

const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DigitalKit",
    url: "https://www.getdigitalkit.online/",
    description:
        "Free online tools for business, images, developers, calculators, security, text, and everyday digital tasks.",
};

const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DigitalKit",
    url: "https://www.getdigitalkit.online/",
};

const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
        },
    })),
};

type Article = {
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    featured_image: string;
    created_at: string;
};

export default function Home() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetch("/api/articles", {
            cache: "no-store",
        })
            .then((response) => response.json())
            .then((data) => {
                setArticles(data.articles || []);
            })
            .catch(() => {
                setArticles([]);
            });
    }, []);

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteStructuredData),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationStructuredData),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqStructuredData),
                }}
            />

            {/* HEADER */}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-xl text-white">
                            ✦
                        </div>

                        <span className="text-xl font-bold tracking-tight">
                            DigitalKit
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-7 text-sm font-medium text-slate-500 sm:flex">
                        <a
                            href="#tools"
                            className="hover:text-slate-900"
                        >
                            Tools
                        </a>

                        <a
                            href="#faq"
                            className="hover:text-slate-900"
                        >
                            FAQ
                        </a>

                        <Link
                            href="/contact"
                            className="hover:text-slate-900"
                        >
                            Contact
                        </Link>
                    </nav>
                </div>
            </header>

            {/* HERO */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
                            ⚡ Simple tools. Less busywork.
                        </div>

                        <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-6xl">
                            Free Online Tools
                            <span className="block text-slate-500">
                                for Everyday Digital Work
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                            DigitalKit provides simple free online tools for business,
                            images, developers, calculators, security, text, and everyday
                            digital tasks.
                        </p>

                        <a
                            href="#tools"
                            className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 font-semibold text-white transition hover:bg-slate-800"
                        >
                            Explore Free Tools →
                        </a>
                    </div>
                </div>
            </section>

            {/* TOOLS */}
            <section
                id="tools"
                className="mx-auto max-w-6xl px-6 py-16 sm:py-20"
            >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                            DigitalKit Tools
                        </p>

                        <h2 className="mt-2 text-3xl font-bold tracking-tight">
                            Get things done faster
                        </h2>

                        <p className="mt-3 max-w-xl text-slate-500">
                            Free browser-based tools for common digital tasks. Choose a tool
                            and get started instantly.
                        </p>
                    </div>

                    <span className="text-sm text-slate-400">
                        {tools.length} free tools available
                    </span>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tools.map((tool) => (
                        <Link
                            key={tool.href}
                            href={tool.href}
                            className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                                    {tool.icon}
                                </div>

                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                                    {tool.label}
                                </span>
                            </div>

                            <h3 className="mt-7 text-xl font-bold">
                                {tool.name}
                            </h3>

                            <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">
                                {tool.description}
                            </p>

                            <div className="mt-7 flex items-center text-sm font-semibold text-slate-900">
                                Open Tool
                                <span className="ml-2 transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* SEO CONTENT */}
            <section className="border-y border-slate-200 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
                    <div className="mx-auto max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                            Free Online Tools
                        </p>

                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                            Simple tools for everyday digital work
                        </h2>

                        <div className="mt-6 space-y-5 text-base leading-7 text-slate-600">
                            <p>
                                DigitalKit is a collection of free online tools designed to
                                help you complete common digital tasks quickly without
                                complicated software. From creating invoices and calculating
                                profit to working with images, formatting data, generating QR
                                codes, creating passwords, and handling everyday calculations,
                                everything is available in one place.
                            </p>

                            <p>
                                Need to work with images? Use the{" "}
                                <Link
                                    href="/image-resizer"
                                    className="font-semibold text-slate-900 underline underline-offset-4"
                                >
                                    Image Resizer
                                </Link>{" "}
                                or{" "}
                                <Link
                                    href="/image-compressor"
                                    className="font-semibold text-slate-900 underline underline-offset-4"
                                >
                                    Image Compressor
                                </Link>
                                . You can also use the{" "}
                                <Link
                                    href="/image-enhancer"
                                    className="font-semibold text-slate-900 underline underline-offset-4"
                                >
                                    AI Image Enhancer
                                </Link>{" "}
                                to improve and upscale images.
                            </p>

                            <p>
                                Developers can use the{" "}
                                <Link
                                    href="/json-formatter"
                                    className="font-semibold text-slate-900 underline underline-offset-4"
                                >
                                    JSON Formatter
                                </Link>
                                ,{" "}
                                <Link
                                    href="/base64"
                                    className="font-semibold text-slate-900 underline underline-offset-4"
                                >
                                    Base64 Encoder & Decoder
                                </Link>
                                ,{" "}
                                <Link
                                    href="/uuid-generator"
                                    className="font-semibold text-slate-900 underline underline-offset-4"
                                >
                                    UUID Generator
                                </Link>
                                , and{" "}
                                <Link
                                    href="/timestamp-converter"
                                    className="font-semibold text-slate-900 underline underline-offset-4"
                                >
                                    Timestamp Converter
                                </Link>{" "}
                                for common development tasks.
                            </p>

                            <p>
                                DigitalKit also provides practical calculators and business
                                utilities including an{" "}
                                <Link
                                    href="/invoice"
                                    className="font-semibold text-slate-900 underline underline-offset-4"
                                >
                                    Invoice Generator
                                </Link>
                                ,{" "}
                                <Link
                                    href="/profit"
                                    className="font-semibold text-slate-900 underline underline-offset-4"
                                >
                                    Profit & Pricing Calculator
                                </Link>
                                ,{" "}
                                <Link
                                    href="/percentage-calculator"
                                    className="font-semibold text-slate-900 underline underline-offset-4"
                                >
                                    Percentage Calculator
                                </Link>
                                ,{" "}
                                <Link
                                    href="/tip-calculator"
                                    className="font-semibold text-slate-900 underline underline-offset-4"
                                >
                                    Tip Calculator
                                </Link>
                                , and{" "}
                                <Link
                                    href="/unit-converter"
                                    className="font-semibold text-slate-900 underline underline-offset-4"
                                >
                                    Unit Converter
                                </Link>
                                .
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 p-6">
                            <h3 className="text-lg font-bold text-slate-900">
                                Business & Finance
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Create invoices and calculate profit, pricing, percentages,
                                and tips with simple browser-based tools.
                            </p>

                            <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
                                <Link
                                    href="/invoice"
                                    className="text-slate-900 hover:underline"
                                >
                                    Invoice Generator →
                                </Link>

                                <Link
                                    href="/profit"
                                    className="text-slate-900 hover:underline"
                                >
                                    Profit Calculator →
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 p-6">
                            <h3 className="text-lg font-bold text-slate-900">
                                Image & Design Tools
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Resize, compress, enhance, and work with images directly in
                                your browser.
                            </p>

                            <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
                                <Link
                                    href="/image-compressor"
                                    className="text-slate-900 hover:underline"
                                >
                                    Compress Images →
                                </Link>

                                <Link
                                    href="/image-resizer"
                                    className="text-slate-900 hover:underline"
                                >
                                    Resize Images →
                                </Link>

                                <Link
                                    href="/image-enhancer"
                                    className="text-slate-900 hover:underline"
                                >
                                    Enhance Images →
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 p-6">
                            <h3 className="text-lg font-bold text-slate-900">
                                Developer & Utility Tools
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Format data, convert values, generate identifiers, work with
                                colors, and handle everyday developer tasks.
                            </p>

                            <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
                                <Link
                                    href="/json-formatter"
                                    className="text-slate-900 hover:underline"
                                >
                                    JSON Formatter →
                                </Link>

                                <Link
                                    href="/unit-converter"
                                    className="text-slate-900 hover:underline"
                                >
                                    Unit Converter →
                                </Link>

                                <Link
                                    href="/qr-generator"
                                    className="text-slate-900 hover:underline"
                                >
                                    QR Generator →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LATEST ARTICLES */}
            {articles.length > 0 && (
                <section className="border-b border-slate-200 bg-slate-50">
                    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                                    From the DigitalKit Blog
                                </p>

                                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                                    Helpful guides & articles
                                </h2>

                                <p className="mt-3 max-w-xl text-slate-500">
                                    Learn how to use online tools, work more efficiently,
                                    and solve everyday digital tasks.
                                </p>
                            </div>

                            <Link
                                href="/blog"
                                className="text-sm font-semibold text-slate-900 hover:underline"
                            >
                                View all articles →
                            </Link>
                        </div>

                        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {articles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/blog/${article.slug}`}
                                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                                >
                                    {article.featured_image ? (
                                        <img
                                            src={article.featured_image}
                                            alt={article.title}
                                            className="h-48 w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-48 items-center justify-center bg-slate-100">
                                            <span className="text-5xl">
                                                📝
                                            </span>
                                        </div>
                                    )}

                                    <div className="p-6">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            {article.category}
                                        </p>

                                        <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:underline">
                                            {article.title}
                                        </h3>

                                        {article.excerpt && (
                                            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                                                {article.excerpt}
                                            </p>
                                        )}

                                        <div className="mt-6 text-sm font-semibold text-slate-900">
                                            Read Article
                                            <span className="ml-2 transition-transform group-hover:translate-x-1">
                                                →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* WHY DIGITALKIT */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-16">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Built to stay simple
                        </h2>

                        <p className="mt-4 leading-7 text-slate-500">
                            No complicated dashboards. No unnecessary steps. Just useful
                            tools that help you finish the task.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 p-6">
                            <div className="text-2xl">⚡</div>

                            <h3 className="mt-4 font-bold">
                                Fast
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Open a tool and start working immediately.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 p-6">
                            <div className="text-2xl">🎯</div>

                            <h3 className="mt-4 font-bold">
                                Focused
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Each tool is designed around one useful task.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 p-6">
                            <div className="text-2xl">🛠️</div>

                            <h3 className="mt-4 font-bold">
                                Practical
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Built for everyday personal and business work.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section
                id="faq"
                className="mx-auto max-w-6xl px-6 py-16 sm:py-20"
            >
                <div className="mx-auto max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                        Frequently Asked Questions
                    </p>

                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                        Questions about DigitalKit
                    </h2>

                    <div className="mt-8 space-y-4">
                        {faqItems.map((item) => (
                            <details
                                key={item.question}
                                className="rounded-2xl border border-slate-200 bg-white p-5"
                            >
                                <summary className="cursor-pointer font-semibold text-slate-900">
                                    {item.question}
                                </summary>

                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    {item.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-6xl px-6 pb-16">
                <div className="rounded-3xl bg-slate-900 px-7 py-12 text-center text-white sm:px-12">
                    <h2 className="text-3xl font-bold">
                        Have an idea for a tool?
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
                        Tell us what would make your everyday digital work easier.
                    </p>

                    <Link
                        href="/contact"
                        className="mt-7 inline-flex rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                        Contact Us
                    </Link>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="font-bold">
                            DigitalKit
                        </div>

                        <p className="mt-1 text-sm text-slate-400">
                            Free online tools for everyday digital work.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm text-slate-500">
                        <Link
                            href="/privacy"
                            className="hover:text-slate-900"
                        >
                            Privacy
                        </Link>

                        <Link
                            href="/terms"
                            className="hover:text-slate-900"
                        >
                            Terms
                        </Link>

                        <Link
                            href="/contact"
                            className="hover:text-slate-900"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}