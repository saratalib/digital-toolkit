import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import Link from "next/link";

async function isAdminAuthenticated() {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;

    const adminEmail = process.env.ADMIN_EMAIL;
    const secret = process.env.ADMIN_SESSION_SECRET;

    if (!session || !adminEmail || !secret) {
        return false;
    }

    const expectedSession = crypto
        .createHmac("sha256", secret)
        .update(adminEmail)
        .digest("hex");

    return session === expectedSession;
}

export default async function AdminDashboard() {
    const authenticated = await isAdminAuthenticated();

    if (!authenticated) {
        redirect("/admin/login");
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <header className="border-b border-slate-800 bg-slate-900">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <div>
                        <h1 className="text-xl font-bold">
                            DigitalKit Admin
                        </h1>

                        <p className="mt-1 text-xs text-slate-400">
                            Website management dashboard
                        </p>
                    </div>

                    <Link
                        href="/"
                        className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800"
                    >
                        View Website →
                    </Link>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-6 py-10">
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                    Dashboard
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                    Welcome to DigitalKit
                </h2>

                <p className="mt-3 text-slate-400">
                    Manage your website and monitor its important areas from
                    one place.
                </p>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                        <div className="text-3xl">🛠️</div>
                        <p className="mt-5 text-sm text-slate-400">
                            Total Tools
                        </p>
                        <p className="mt-1 text-3xl font-bold">16</p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                        <div className="text-3xl">👥</div>
                        <p className="mt-5 text-sm text-slate-400">
                            Visitors
                        </p>
                        <p className="mt-1 text-3xl font-bold">—</p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                        <div className="text-3xl">✉️</div>
                        <p className="mt-5 text-sm text-slate-400">
                            Messages
                        </p>
                        <p className="mt-1 text-3xl font-bold">—</p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                        <div className="text-3xl">📊</div>
                        <p className="mt-5 text-sm text-slate-400">
                            Status
                        </p>
                        <p className="mt-1 text-lg font-bold text-green-400">
                            Online
                        </p>
                    </div>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
                        <h3 className="text-xl font-bold">
                            Website Management
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Manage DigitalKit tools and website content.
                        </p>

                        <div className="mt-6 space-y-3">
                            <Link
                                href="/admin/tools"
                                className="flex items-center justify-between rounded-xl border border-slate-700 px-4 py-4 hover:bg-slate-800"
                            >
                                <span>🛠️ Manage Tools</span>
                                <span>→</span>
                            </Link>

                            <Link
                                href="/admin/messages"
                                className="flex items-center justify-between rounded-xl border border-slate-700 px-4 py-4 hover:bg-slate-800"
                            >
                                <span>✉️ Contact Messages</span>
                                <span>→</span>
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
                        <h3 className="text-xl font-bold">
                            Quick Links
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Quickly access important areas of your website.
                        </p>

                        <div className="mt-6 space-y-3">
                            <Link
                                href="/"
                                className="flex items-center justify-between rounded-xl border border-slate-700 px-4 py-4 hover:bg-slate-800"
                            >
                                <span>🏠 Homepage</span>
                                <span>→</span>
                            </Link>

                            <Link
                                href="/contact"
                                className="flex items-center justify-between rounded-xl border border-slate-700 px-4 py-4 hover:bg-slate-800"
                            >
                                <span>📩 Contact Page</span>
                                <span>→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}