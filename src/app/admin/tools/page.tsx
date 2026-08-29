import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

async function checkAdmin() {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;

    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const secret = process.env.ADMIN_SESSION_SECRET;

    if (!session || !email || !secret) return false;

    const expected = crypto
        .createHmac("sha256", secret)
        .update(email)
        .digest("hex");

    return session === expected;
}

const tools = [
    { name: "Base64 Encoder / Decoder", path: "/base64" },
    { name: "Color Converter", path: "/color-converter" },
    { name: "Image Compressor", path: "/image-compressor" },
    { name: "Image Resizer", path: "/image-resizer" },
    { name: "Invoice Generator", path: "/invoice" },
    { name: "JSON Formatter", path: "/json-formatter" },
    { name: "Password Generator", path: "/password-generator" },
    { name: "Percentage Calculator", path: "/percentage-calculator" },
    { name: "QR Generator", path: "/qr-generator" },
    { name: "Text Tools", path: "/text-tools" },
    { name: "Timestamp Converter", path: "/timestamp-converter" },
    { name: "TIP Calculator", path: "/tip-calculator" },
    { name: "Unit Converter", path: "/unit-converter" },
    { name: "UUID Generator", path: "/uuid-generator" },
    { name: "Image Tools", path: "/image-tools" },
    { name: "Calculator", path: "/calculator" },
];

export default async function ManageToolsPage() {
    const authenticated = await checkAdmin();

    if (!authenticated) {
        redirect("/admin/login");
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <header className="border-b border-slate-800 bg-slate-900">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <div>
                        <Link
                            href="/admin"
                            className="text-sm text-slate-400 hover:text-white"
                        >
                            ← Back to Dashboard
                        </Link>

                        <h1 className="mt-2 text-2xl font-bold">
                            Manage Tools
                        </h1>

                        <p className="mt-1 text-sm text-slate-400">
                            View and manage all DigitalKit tools.
                        </p>
                    </div>

                    <Link
                        href="/"
                        target="_blank"
                        className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
                    >
                        View Website →
                    </Link>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-6 py-10">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold">
                            All Tools
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            {tools.length} tools available
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {tools.map((tool, index) => (
                        <div
                            key={tool.path}
                            className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-sm font-bold">
                                        {index + 1}
                                    </div>

                                    <h3 className="font-semibold">
                                        {tool.name}
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-500">
                                        {tool.path}
                                    </p>
                                </div>

                                <span className="rounded-full bg-green-950 px-3 py-1 text-xs font-medium text-green-400">
                                    Active
                                </span>
                            </div>

                            <Link
                                href={tool.path}
                                target="_blank"
                                className="mt-5 block rounded-xl border border-slate-700 px-4 py-3 text-center text-sm font-medium hover:bg-slate-800"
                            >
                                Open Tool →
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}