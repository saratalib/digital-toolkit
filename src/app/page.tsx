"use client";

export default function AboutPage() {
return ( <main className="min-h-screen bg-slate-50 text-slate-900"> <header className="border-b border-slate-200 bg-white"> <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"> <a
                     href="/"
                     className="text-xl font-bold tracking-tight text-slate-900"
                 >
DigitalKit </a>

```
                <a
                    href="/"
                    className="text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                    ← Back to Home
                </a>
            </div>
        </header>

        <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
            <div className="text-center">
                <div className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
                    About DigitalKit
                </div>

                <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                    Simple digital tools for everyday work
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                    DigitalKit is a collection of practical, browser-based
                    tools designed to make common digital tasks faster and
                    easier.
                </p>
            </div>

            <div className="mt-12 space-y-8">
                <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
                    <h2 className="text-2xl font-bold">
                        What is DigitalKit?
                    </h2>

                    <div className="mt-5 space-y-5 text-base leading-7 text-slate-600">
                        <p>
                            DigitalKit brings together useful online
                            utilities in one simple website. Instead of
                            searching for a different website for every
                            small task, you can use DigitalKit for common
                            business, calculator, image, developer,
                            security, design, and productivity needs.
                        </p>

                        <p>
                            Our goal is to keep each tool straightforward.
                            You should be able to open a tool, understand
                            what it does, complete your task, and move on
                            without unnecessary accounts, complicated
                            interfaces, or software installations.
                        </p>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
                    <h2 className="text-2xl font-bold">
                        What can you do with DigitalKit?
                    </h2>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 p-5">
                            <h3 className="font-bold">
                                Business & Finance
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Create invoices and calculate profit,
                                pricing, percentages, and tips.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 p-5">
                            <h3 className="font-bold">
                                Image Tools
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Resize, compress, and work with images
                                directly in your browser.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 p-5">
                            <h3 className="font-bold">
                                Developer Tools
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Format JSON, encode Base64, generate UUIDs,
                                convert timestamps, and work with colors.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 p-5">
                            <h3 className="font-bold">
                                Everyday Utilities
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Convert units, generate QR codes, create
                                passwords, and perform other common digital
                                tasks.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
                    <h2 className="text-2xl font-bold">
                        Designed for simplicity
                    </h2>

                    <div className="mt-5 space-y-5 text-base leading-7 text-slate-600">
                        <p>
                            DigitalKit is built around a simple idea:
                            useful online tools should be easy to access
                            and easy to understand.
                        </p>

                        <p>
                            Many of the tools process information directly
                            in your browser. When a tool is designed for
                            local browser processing, your information does
                            not need to be sent to a DigitalKit server just
                            to perform the calculation or conversion.
                        </p>

                        <p>
                            Each tool is designed for a specific purpose,
                            helping you complete everyday digital work
                            without unnecessary complexity.
                        </p>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
                    <h2 className="text-2xl font-bold">
                        Who is DigitalKit for?
                    </h2>

                    <p className="mt-5 text-base leading-7 text-slate-600">
                        DigitalKit can be useful for freelancers, small
                        businesses, developers, designers, students,
                        creators, remote workers, and anyone who needs
                        quick online utilities for everyday digital tasks.
                    </p>
                </section>

                <section className="rounded-3xl bg-slate-900 p-7 text-white sm:p-9">
                    <h2 className="text-2xl font-bold">
                        Have a tool idea?
                    </h2>

                    <p className="mt-4 leading-7 text-slate-300">
                        If there is a useful digital task you would like
                        DigitalKit to support, let us know.
                    </p>

                    <a
                        href="/contact"
                        className="mt-6 inline-flex rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                        Contact DigitalKit →
                    </a>
                </section>
            </div>
        </section>

        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="font-bold">DigitalKit</div>

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
