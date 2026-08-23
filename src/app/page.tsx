
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
];

export default function Home() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">

            {/* HEADER */}

            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

                    <a href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-xl text-white">
                            ✦
                        </div>

                        <span className="text-xl font-bold tracking-tight">
                            DigitalKit
                        </span>
                    </a>

                    <nav className="hidden items-center gap-7 text-sm font-medium text-slate-500 sm:flex">
                        <a
                            href="#tools"
                            className="hover:text-slate-900"
                        >
                            Tools
                        </a>

                        <a
                            href="/contact"
                            className="hover:text-slate-900"
                        >
                            Contact
                        </a>
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
                            Useful Digital Tools
                            <span className="block text-slate-500">
                                All in one place.
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                            DigitalKit gives you simple online tools for
                            business, images, pricing, and everyday digital
                            tasks.
                        </p>

                        <a
                            href="#tools"
                            className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 font-semibold text-white transition hover:bg-slate-800"
                        >
                            Explore Tools →
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
                            Choose a tool and get started instantly.
                        </p>
                    </div>

                    <span className="text-sm text-slate-400">
                        {tools.length} tools available
                    </span>

                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {tools.map((tool) => (
                        <a
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

                        </a>
                    ))}

                </div>

            </section>

            {/* WHY DIGITALKIT */}

            <section className="border-y border-slate-200 bg-white">

                <div className="mx-auto max-w-6xl px-6 py-16">

                    <div className="mx-auto max-w-2xl text-center">

                        <h2 className="text-3xl font-bold tracking-tight">
                            Built to stay simple
                        </h2>

                        <p className="mt-4 leading-7 text-slate-500">
                            No complicated dashboards. No unnecessary steps.
                            Just useful tools that help you finish the task.
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

            {/* CTA */}

            <section className="mx-auto max-w-6xl px-6 py-16">

                <div className="rounded-3xl bg-slate-900 px-7 py-12 text-center text-white sm:px-12">

                    <h2 className="text-3xl font-bold">
                        Have an idea for a tool?
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
                        Tell us what would make your everyday digital work
                        easier.
                    </p>

                    <a
                        href="/contact"
                        className="mt-7 inline-flex rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                        Contact Us
                    </a>

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
                            Simple tools for everyday digital work.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm text-slate-500">

                        <a
                            href="/privacy"
                            className="hover:text-slate-900"
                        >
                            Privacy
                        </a>

                        <a
                            href="/terms"
                            className="hover:text-slate-900"
                        >
                            Terms
                        </a>

                        <a
                            href="/contact"
                            className="hover:text-slate-900"
                        >
                            Contact
                        </a>

                    </div>

                </div>

            </footer>

        </main>
    );
}