import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "DigitalKit Articles & Guides",
    description:
        "Useful guides, tutorials, tips, and articles about DigitalKit tools, online tools, productivity, and everyday digital work.",
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
const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
    supabaseUrl && supabaseServiceKey
        ? createClient(
            supabaseUrl,
            supabaseServiceKey
        )
        : null;

async function getArticles(): Promise<Article[]> {
    if (!supabase) {
        console.error(
            "BLOG: Supabase environment variables are not configured."
        );

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

function formatDate(date: string) {
    return new Date(date).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );
}

export default async function BlogPage() {
    const articles = await getArticles();

    const featuredArticle =
        articles.length > 0
            ? articles[0]
            : null;

    const remainingArticles =
        articles.length > 1
            ? articles.slice(1)
            : [];

    const categories = Array.from(
        new Set(
            articles
                .map((article) => article.category)
                .filter(Boolean)
        )
    );

    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "DigitalKit Articles",
        description:
            "Useful guides, tutorials, tips, and articles about DigitalKit tools and everyday digital work.",
        url: "https://www.getdigitalkit.online/blog",
        publisher: {
            "@type": "Organization",
            name: "DigitalKit",
            url: "https://www.getdigitalkit.online/",
        },
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            {/* BLOG STRUCTURED DATA */}

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        blogSchema
                    ),
                }}
            />

            {/* HEADER */}

            <header className="border-b border-slate-800 bg-slate-900">
                <div className="mx-auto max-w-6xl px-6 py-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-slate-400 transition hover:text-white"
                    >
                        ← DigitalKit
                    </Link>

                    <div className="mt-8 max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                            DigitalKit Blog
                        </p>

                        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                            Articles & Guides
                        </h1>

                        <p className="mt-5 text-lg leading-8 text-slate-400">
                            Useful guides, tutorials, tips, and
                            practical information to help you work
                            smarter with digital tools.
                        </p>
                    </div>
                </div>
            </header>

            {/* CATEGORY BAR */}

            {categories.length > 0 && (
                <section className="border-b border-slate-800 bg-slate-950">
                    <div className="mx-auto max-w-6xl px-6 py-5">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="mr-2 text-sm font-semibold text-slate-500">
                                Topics:
                            </span>

                            {categories.map(
                                (category) => (
                                    <span
                                        key={category}
                                        className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-400"
                                    >
                                        {category}
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* CONTENT */}

            <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
                {articles.length === 0 ? (
                    /* EMPTY STATE */

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 px-6 py-16 text-center">
                        <div className="text-5xl">
                            📝
                        </div>

                        <h2 className="mt-6 text-2xl font-bold">
                            No articles published yet
                        </h2>

                        <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-400">
                            We're preparing useful guides and
                            tutorials for DigitalKit. Check back
                            soon for new articles.
                        </p>

                        <Link
                            href="/"
                            className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-200"
                        >
                            Explore DigitalKit Tools
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* FEATURED ARTICLE */}

                        {featuredArticle && (
                            <section>
                                <div className="mb-6 flex items-end justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                                            Featured Article
                                        </p>

                                        <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                                            Start here
                                        </h2>
                                    </div>
                                </div>

                                <Link
                                    href={`/blog/${featuredArticle.slug}`}
                                    className="group block overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition duration-200 hover:-translate-y-1 hover:border-slate-600 hover:shadow-2xl"
                                >
                                    <div className="grid md:grid-cols-2">
                                        {featuredArticle.featured_image ? (
                                            <img
                                                src={
                                                    featuredArticle.featured_image
                                                }
                                                alt={
                                                    featuredArticle.title
                                                }
                                                className="h-64 w-full object-cover transition duration-300 group-hover:scale-[1.02] md:h-full"
                                            />
                                        ) : (
                                            <div className="flex h-64 items-center justify-center bg-slate-800 text-7xl md:h-full">
                                                📝
                                            </div>
                                        )}

                                        <div className="flex flex-col justify-center p-7 md:p-10">
                                            <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                                                {
                                                    featuredArticle.category
                                                }
                                            </p>

                                            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
                                                {
                                                    featuredArticle.title
                                                }
                                            </h2>

                                            {featuredArticle.excerpt && (
                                                <p className="mt-5 text-base leading-7 text-slate-400">
                                                    {
                                                        featuredArticle.excerpt
                                                    }
                                                </p>
                                            )}

                                            <div className="mt-7 flex items-center justify-between gap-4">
                                                <span className="text-xs text-slate-500">
                                                    {formatDate(
                                                        featuredArticle.created_at
                                                    )}
                                                </span>

                                                <span className="text-sm font-semibold text-white">
                                                    Read Article
                                                    <span className="ml-2 transition-transform group-hover:translate-x-1">
                                                        →
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </section>
                        )}

                        {/* MORE ARTICLES */}

                        {remainingArticles.length > 0 && (
                            <section className="mt-16">
                                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                                            Latest Articles
                                        </p>

                                        <h2 className="mt-2 text-3xl font-bold tracking-tight">
                                            More from DigitalKit
                                        </h2>
                                    </div>

                                    <span className="text-sm text-slate-500">
                                        {articles.length}{" "}
                                        {articles.length === 1
                                            ? "article"
                                            : "articles"}{" "}
                                        published
                                    </span>
                                </div>

                                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {remainingArticles.map(
                                        (article) => (
                                            <Link
                                                key={
                                                    article.id
                                                }
                                                href={`/blog/${article.slug}`}
                                                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition duration-200 hover:-translate-y-1 hover:border-slate-600 hover:shadow-xl"
                                            >
                                                {article.featured_image ? (
                                                    <img
                                                        src={
                                                            article.featured_image
                                                        }
                                                        alt={
                                                            article.title
                                                        }
                                                        className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                                                    />
                                                ) : (
                                                    <div className="flex h-48 items-center justify-center bg-slate-800 text-5xl">
                                                        📝
                                                    </div>
                                                )}

                                                <div className="flex flex-1 flex-col p-6">
                                                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                                                        {
                                                            article.category
                                                        }
                                                    </p>

                                                    <h3 className="mt-3 text-xl font-bold leading-7 text-white transition group-hover:text-slate-300">
                                                        {
                                                            article.title
                                                        }
                                                    </h3>

                                                    {article.excerpt && (
                                                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                                                            {
                                                                article.excerpt
                                                            }
                                                        </p>
                                                    )}

                                                    <div className="mt-auto pt-6">
                                                        <div className="flex items-center justify-between gap-3">
                                                            <span className="text-xs text-slate-500">
                                                                {formatDate(
                                                                    article.created_at
                                                                )}
                                                            </span>

                                                            <span className="text-sm font-semibold text-white">
                                                                Read →
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    )}
                                </div>
                            </section>
                        )}

                        {/* ALL TOOLS CTA */}

                        <section className="mt-16">
                            <div className="rounded-3xl border border-slate-800 bg-slate-900 px-7 py-10 text-center sm:px-12">
                                <h2 className="text-2xl font-bold md:text-3xl">
                                    Looking for a useful tool?
                                </h2>

                                <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-400">
                                    Explore DigitalKit's free online
                                    tools for business, images,
                                    developers, calculators,
                                    security, text, and everyday
                                    digital work.
                                </p>

                                <Link
                                    href="/#tools"
                                    className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-200"
                                >
                                    Explore Free Tools →
                                </Link>
                            </div>
                        </section>
                    </>
                )}
            </section>

            {/* FOOTER */}

            <footer className="border-t border-slate-800 bg-slate-900">
                <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Link
                            href="/"
                            className="font-bold text-white"
                        >
                            DigitalKit
                        </Link>

                        <p className="mt-1 text-sm text-slate-500">
                            Free online tools for everyday
                            digital work.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm text-slate-500">
                        <Link
                            href="/"
                            className="transition hover:text-white"
                        >
                            Tools
                        </Link>

                        <Link
                            href="/blog"
                            className="transition hover:text-white"
                        >
                            Articles
                        </Link>

                        <Link
                            href="/privacy"
                            className="transition hover:text-white"
                        >
                            Privacy
                        </Link>

                        <Link
                            href="/terms"
                            className="transition hover:text-white"
                        >
                            Terms
                        </Link>

                        <Link
                            href="/contact"
                            className="transition hover:text-white"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}