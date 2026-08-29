import Link from "next/link";

const totalTools = 16;

const managementLinks = [
    {
        icon: "🛠️",
        title: "Manage Tools",
        description: "Manage DigitalKit tools and website content.",
        href: "/admin/tools",
    },
    {
        icon: "📝",
        title: "Articles",
        description: "Create, edit, publish, and manage DigitalKit articles.",
        href: "/admin/articles",
    },
    {
        icon: "✉️",
        title: "Contact Messages",
        description: "View messages submitted through the contact page.",
        href: "/admin/messages",
    },
];

const quickLinks = [
    {
        icon: "🏠",
        title: "Homepage",
        href: "/",
    },
    {
        icon: "📝",
        title: "Articles",
        href: "/admin/articles",
    },
    {
        icon: "📨",
        title: "Contact Page",
        href: "/contact",
    },
];

export default function AdminDashboard() {
    return (
        <main className="min-h-screen bg-slate-950 text-white">
            {/* HEADER */}
            <header className="border-b border-slate-800 bg-slate-950">
                <div className="mx-auto max-w-6xl px-6 py-10">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Welcome to DigitalKit
                    </h1>

                    <p className="mt-3 text-base text-slate-400">
                        Manage your website and monitor its important areas
                        from one place.
                    </p>
                </div>
            </header>

            {/* DASHBOARD */}
            <section className="mx-auto max-w-6xl px-6 py-10">
                {/* STATS */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {/* TOTAL TOOLS */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                        <div className="text-3xl">🛠️</div>

                        <p className="mt-5 text-sm text-slate-400">
                            Total Tools
                        </p>

                        <p className="mt-2 text-4xl font-bold">
                            {totalTools}
                        </p>
                    </div>

                    {/* VISITORS */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                        <div className="text-3xl">👥</div>

                        <p className="mt-5 text-sm text-slate-400">
                            Visitors
                        </p>

                        <p className="mt-2 text-4xl font-bold">
                            —
                        </p>
                    </div>

                    {/* MESSAGES */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                        <div className="text-3xl">✉️</div>

                        <p className="mt-5 text-sm text-slate-400">
                            Messages
                        </p>

                        <p className="mt-2 text-4xl font-bold">
                            —
                        </p>
                    </div>

                    {/* STATUS */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                        <div className="text-3xl">📊</div>

                        <p className="mt-5 text-sm text-slate-400">
                            Status
                        </p>

                        <p className="mt-2 text-xl font-bold text-green-400">
                            Online
                        </p>
                    </div>
                </div>

                {/* MAIN MANAGEMENT AREA */}
                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                    {/* WEBSITE MANAGEMENT */}
                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7 sm:p-8">
                        <h2 className="text-2xl font-bold">
                            Website Management
                        </h2>

                        <p className="mt-2 text-sm text-slate-400">
                            Manage DigitalKit tools and website content.
                        </p>

                        <div className="mt-7 space-y-3">
                            {managementLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 transition hover:border-slate-500 hover:bg-slate-800"
                                >
                                    <div className="flex min-w-0 items-center gap-3">
                                        <span className="text-xl">
                                            {item.icon}
                                        </span>

                                        <div className="min-w-0">
                                            <p className="font-medium text-white">
                                                {item.title}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    <span className="ml-4 shrink-0 text-lg text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-white">
                                        →
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7 sm:p-8">
                        <h2 className="text-2xl font-bold">
                            Quick Links
                        </h2>

                        <p className="mt-2 text-sm text-slate-400">
                            Quickly access important areas of your website.
                        </p>

                        <div className="mt-7 space-y-3">
                            {quickLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 transition hover:border-slate-500 hover:bg-slate-800"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">
                                            {item.icon}
                                        </span>

                                        <span className="font-medium">
                                            {item.title}
                                        </span>
                                    </div>

                                    <span className="text-lg text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-white">
                                        →
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ARTICLES HIGHLIGHT */}
                <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-7 sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-2xl">
                                    📝
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold">
                                        DigitalKit Articles
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-400">
                                        Publish helpful guides and articles to
                                        grow your website.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/admin/articles"
                                className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Manage Articles
                            </Link>

                            <Link
                                href="/admin/articles/new"
                                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                            >
                                + New Article
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-slate-800 bg-slate-950">
                <div className="mx-auto max-w-6xl px-6 py-8">
                    <p className="text-center text-sm text-slate-500">
                        DigitalKit Administration
                    </p>
                </div>
            </footer>
        </main>
    );
}