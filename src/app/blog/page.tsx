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
        ? createClient(
            supabaseUrl,
            supabaseServiceKey
        )
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
        console.error(
            "BLOG ARTICLES ERROR:",
            error
        );

        return [];
    }

    return (data || []) as Article[];
}

export default async function BlogPage() {
    const articles = await getArticles();

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <header className="border-b border-slate-800 bg-slate-900">
                <div className="mx-auto max-w-6xl px-6 py-8">
                    <Link
                        href="/"
                        className="text-sm text-slate-400 hover:text-white"
                    >
                        ← DigitalKit
                    </Link>

                    <h1 className="mt-6 text-4xl font-bold">
                        DigitalKit Articles
                    </h1>

                    <p className="mt-3 max-w-2xl text-slate-400">
                        Guides, tutorials, tips, and useful
                        information about DigitalKit tools and
                        everyday digital work.
                    </p>
                </div>
            </header>

            <section className="mx-auto max-w-6xl px-6 py-12">
                {articles.length === 0 ? (
                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center">
                        <div className="text-5xl">📝</div>

                        <h2 className="mt-5 text-xl font-bold">
                            No articles published yet
                        </h2>

                        <p className="mt-2 text-slate-400">
                            Check back soon for useful DigitalKit
                            guides and tutorials.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {articles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/blog/${article.slug}`}
                                className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition hover:-translate-y-1 hover:border-slate-600"
                            >
                                {article.featured_image ? (
                                    <img
                                        src={
                                            article.featured_image
                                        }
                                        alt={article.title}
                                        className="h-48 w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-48 items-center justify-center bg-slate-800 text-5xl">
                                        📝
                                    </div>
                                )}

                                <div className="p-6">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">
                                        {article.category}
                                    </p>

                                    <h2 className="mt-3 text-xl font-bold leading-7 transition group-hover:text-slate-300">
                                        {article.title}
                                    </h2>

                                    {article.excerpt && (
                                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                                            {article.excerpt}
                                        </p>
                                    )}

                                    <div className="mt-6 flex items-center justify-between">
                                        <span className="text-xs text-slate-500">
                                            {new Date(
                                                article.created_at
                                            ).toLocaleDateString(
                                                "en-US",
                                                {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                }
                                            )}
                                        </span>

                                        <span className="text-sm font-medium text-white">
                                            Read →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}