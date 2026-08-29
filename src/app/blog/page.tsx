import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "DigitalKit Articles & Guides",
    description:
        "Useful guides, tutorials, tips, and articles about DigitalKit tools and everyday digital work.",
    alternates: {
        canonical: "https://www.getdigitalkit.online/blog",
    },
    openGraph: {
        title: "DigitalKit Articles & Guides",
        description:
            "Useful guides, tutorials, tips, and articles about DigitalKit tools and everyday digital work.",
        url: "https://www.getdigitalkit.online/blog",
        siteName: "DigitalKit",
        type: "website",
    },
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
    supabaseUrl && supabaseServiceKey
        ? createClient(supabaseUrl, supabaseServiceKey)
        : null;

async function getArticles(): Promise<Article[]> {
    if (!supabase) {
        return [];
    }

    const { data, error } = await supabase
        .from("articles")
        .select(
            "id, title, slug, category, excerpt, featured_image, created_at"
        )
        .eq("status", "published")
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        console.error("BLOG ARTICLES ERROR:", error);
        return [];
    }

    return (data || []) as Article[];
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default async function BlogPage() {
    const articles = await getArticles();

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            {/* HEADER */}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-slate-500 transition hover:text-slate-900"
                    >
                        ← Back to DigitalKit
                    </Link>

                    <div className="mt-10 max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                            DigitalKit Blog
                        </p>

                        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                            Articles & Guides
                        </h1>

                        <p className="mt-5 text-lg leading-8 text-slate-600">
                            Helpful guides, tutorials, tips, and practical
                            information for everyday digital work.
                        </p>
                    </div>
                </div>
            </header>

            {/* ARTICLES */}
            <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
                {articles.length === 0 ? (
                    <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                        <div className="text-5xl">📝</div>

                        <h2 className="mt-5 text-2xl font-bold">
                            No articles published yet
                        </h2>

                        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-500">
                            New DigitalKit guides and tutorials will appear
                            here when they are published.
                        </p>

                        <Link
                            href="/"
                            className="mt-7 inline-flex rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
                        >
                            Explore DigitalKit Tools
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="mb-8 flex items-end justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                                    Latest
                                </p>

                                <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                                    Helpful articles
                                </h2>
                            </div>

                            <span className="hidden text-sm text-slate-400 sm:block">
                                {articles.length}{" "}
                                {articles.length === 1
                                    ? "article"
                                    : "articles"}
                            </span>
                        </div>

                        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                            {articles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/blog/${article.slug}`}
                                    className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                                >
                                    {/* IMAGE */}
                                    {article.featured_image ? (
                                        <div className="overflow-hidden">
                                            <img
                                                src={article.featured_image}
                                                alt={article.title}
                                                className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex h-52 items-center justify-center bg-slate-100">
                                            <span className="text-5xl">
                                                📝
                                            </span>
                                        </div>
                                    )}

                                    {/* CONTENT */}
                                    <div className="flex flex-1 flex-col p-6">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                {article.category}
                                            </span>

                                            <span className="text-xs text-slate-400">
                                                {formatDate(
                                                    article.created_at
                                                )}
                                            </span>
                                        </div>

                                        <h2 className="mt-4 text-xl font-bold leading-7 tracking-tight text-slate-900 transition group-hover:text-slate-600">
                                            {article.title}
                                        </h2>

                                        {article.excerpt && (
                                            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                                                {article.excerpt}
                                            </p>
                                        )}

                                        <div className="mt-auto pt-7">
                                            <span className="inline-flex items-center text-sm font-semibold text-slate-900">
                                                Read Article
                                                <span className="ml-2 transition-transform group-hover:translate-x-1">
                                                    →
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </section>

            {/* FOOTER CTA */}
            <section className="border-t border-slate-200 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-14 text-center">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Need a useful online tool?
                    </h2>

                    <p className="mx-auto mt-3 max-w-xl text-slate-500">
                        Explore DigitalKit's free tools for business,
                        images, developers, calculators, and everyday
                        digital tasks.
                    </p>

                    <Link
                        href="/"
                        className="mt-6 inline-flex rounded-xl bg-slate-900 px-6 py-3.5 font-semibold text-white transition hover:bg-slate-800"
                    >
                        Explore Free Tools →
                    </Link>
                </div>
            </section>
        </main>
    );
}