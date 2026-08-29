import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";

type Article = {
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    content: string;
    seo_title: string;
    seo_description: string;
    featured_image: string;
    status: "draft" | "published";
    created_at: string;
    updated_at: string;
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

async function getArticle(
    slug: string
): Promise<Article | null> {
    if (!supabase) {
        return null;
    }

    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

    if (error) {
        console.error(
            "BLOG ARTICLE ERROR:",
            error
        );

        return null;
    }

    return data as Article | null;
}

async function getRelatedArticles(
    article: Article
): Promise<Article[]> {
    if (!supabase) {
        return [];
    }

    const { data, error } = await supabase
        .from("articles")
        .select(
            "id, title, slug, category, excerpt, featured_image, created_at"
        )
        .eq("status", "published")
        .eq("category", article.category)
        .neq("id", article.id)
        .order("created_at", {
            ascending: false,
        })
        .limit(3);

    if (error) {
        console.error(
            "RELATED ARTICLES ERROR:",
            error
        );

        return [];
    }

    return (data || []) as Article[];
}

async function getAdjacentArticles(
    article: Article
): Promise<{
    previous: Article | null;
    next: Article | null;
}> {
    if (!supabase) {
        return {
            previous: null,
            next: null,
        };
    }

    const { data: previousData } = await supabase
        .from("articles")
        .select(
            "id, title, slug, category, excerpt, featured_image, created_at"
        )
        .eq("status", "published")
        .lt("created_at", article.created_at)
        .order("created_at", {
            ascending: false,
        })
        .limit(1)
        .maybeSingle();

    const { data: nextData } = await supabase
        .from("articles")
        .select(
            "id, title, slug, category, excerpt, featured_image, created_at"
        )
        .eq("status", "published")
        .gt("created_at", article.created_at)
        .order("created_at", {
            ascending: true,
        })
        .limit(1)
        .maybeSingle();

    return {
        previous: previousData as Article | null,
        next: nextData as Article | null,
    };
}

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;

    const article = await getArticle(slug);

    if (!article) {
        return {
            title: "Article Not Found | DigitalKit",
            description:
                "The requested DigitalKit article could not be found.",
        };
    }

    return {
        title:
            article.seo_title ||
            `${article.title} | DigitalKit`,

        description:
            article.seo_description ||
            article.excerpt ||
            `Read ${article.title} on DigitalKit.`,

        alternates: {
            canonical: `https://www.getdigitalkit.online/blog/${article.slug}`,
        },

        openGraph: {
            type: "article",
            title:
                article.seo_title ||
                article.title,

            description:
                article.seo_description ||
                article.excerpt ||
                "",

            url: `https://www.getdigitalkit.online/blog/${article.slug}`,

            siteName: "DigitalKit",

            publishedTime: article.created_at,

            modifiedTime:
                article.updated_at ||
                article.created_at,

            ...(article.featured_image
                ? {
                    images: [
                        {
                            url: article.featured_image,
                            alt: article.title,
                        },
                    ],
                }
                : {}),
        },
    };
}

export default async function BlogArticlePage({
    params,
}: PageProps) {
    const { slug } = await params;

    const article = await getArticle(slug);

    if (!article) {
        notFound();
    }

    const [
        relatedArticles,
        adjacentArticles,
    ] = await Promise.all([
        getRelatedArticles(article),
        getAdjacentArticles(article),
    ]);

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",

        headline: article.title,

        description:
            article.seo_description ||
            article.excerpt ||
            "",

        datePublished: article.created_at,

        dateModified:
            article.updated_at ||
            article.created_at,

        author: {
            "@type": "Organization",
            name: "DigitalKit",
            url: "https://www.getdigitalkit.online/",
        },

        publisher: {
            "@type": "Organization",
            name: "DigitalKit",
            url: "https://www.getdigitalkit.online/",
        },

        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.getdigitalkit.online/blog/${article.slug}`,
        },

        ...(article.featured_image
            ? {
                image: [
                    article.featured_image,
                ],
            }
            : {}),
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        articleSchema
                    ),
                }}
            />

            <article className="mx-auto max-w-4xl px-6 py-12">
                {/* BACK LINK */}

                <Link
                    href="/blog"
                    className="text-sm text-slate-400 transition hover:text-white"
                >
                    ← Back to Articles
                </Link>

                {/* ARTICLE HEADER */}

                <div className="mt-10">
                    <p className="text-sm font-medium text-blue-400">
                        {article.category}
                    </p>

                    <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
                        {article.title}
                    </h1>

                    <div className="mt-5 text-sm text-slate-500">
                        Published{" "}
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
                    </div>

                    {/* FEATURED IMAGE */}

                    {article.featured_image && (
                        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-800">
                            <img
                                src={
                                    article.featured_image
                                }
                                alt={article.title}
                                className="h-auto w-full object-cover"
                            />
                        </div>
                    )}

                    {/* EXCERPT */}

                    {article.excerpt && (
                        <p className="mt-8 text-xl leading-8 text-slate-300">
                            {article.excerpt}
                        </p>
                    )}

                    {/* ARTICLE CONTENT */}

                    <div className="mt-10 border-t border-slate-800 pt-10">
                        <div className="prose prose-invert max-w-none prose-headings:font-bold prose-h2:mt-10 prose-h2:text-3xl prose-h3:mt-8 prose-h3:text-2xl prose-p:leading-8 prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline">
                            <ReactMarkdown>
                                {article.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>

                {/* PREVIOUS / NEXT */}

                {(adjacentArticles.previous ||
                    adjacentArticles.next) && (
                    <div className="mt-16 grid gap-4 border-y border-slate-800 py-8 sm:grid-cols-2">
                        {adjacentArticles.previous ? (
                            <Link
                                href={`/blog/${adjacentArticles.previous.slug}`}
                                className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-600"
                            >
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    ← Previous Article
                                </p>

                                <h3 className="mt-3 font-semibold text-white transition group-hover:text-slate-300">
                                    {
                                        adjacentArticles.previous
                                            .title
                                    }
                                </h3>
                            </Link>
                        ) : (
                            <div />
                        )}

                        {adjacentArticles.next && (
                            <Link
                                href={`/blog/${adjacentArticles.next.slug}`}
                                className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-slate-600 sm:text-right"
                            >
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Next Article →
                                </p>

                                <h3 className="mt-3 font-semibold text-white transition group-hover:text-slate-300">
                                    {
                                        adjacentArticles.next
                                            .title
                                    }
                                </h3>
                            </Link>
                        )}
                    </div>
                )}

                {/* RELATED ARTICLES */}

                {relatedArticles.length > 0 && (
                    <section className="mt-16">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                                Keep Reading
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                Related Articles
                            </h2>

                            <p className="mt-3 text-slate-400">
                                More useful DigitalKit
                                guides and articles.
                            </p>
                        </div>

                        <div className="mt-8 grid gap-6 md:grid-cols-3">
                            {relatedArticles.map(
                                (relatedArticle) => (
                                    <Link
                                        key={
                                            relatedArticle.id
                                        }
                                        href={`/blog/${relatedArticle.slug}`}
                                        className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition hover:-translate-y-1 hover:border-slate-600"
                                    >
                                        {relatedArticle.featured_image ? (
                                            <img
                                                src={
                                                    relatedArticle.featured_image
                                                }
                                                alt={
                                                    relatedArticle.title
                                                }
                                                className="h-40 w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-40 items-center justify-center bg-slate-800 text-4xl">
                                                📝
                                            </div>
                                        )}

                                        <div className="p-5">
                                            <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                                                {
                                                    relatedArticle.category
                                                }
                                            </p>

                                            <h3 className="mt-2 text-lg font-bold leading-6 text-white group-hover:text-slate-300">
                                                {
                                                    relatedArticle.title
                                                }
                                            </h3>

                                            {relatedArticle.excerpt && (
                                                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
                                                    {
                                                        relatedArticle.excerpt
                                                    }
                                                </p>
                                            )}

                                            <div className="mt-4 text-sm font-semibold text-white">
                                                Read Article →
                                            </div>
                                        </div>
                                    </Link>
                                )
                            )}
                        </div>
                    </section>
                )}

                {/* BACK TO BLOG */}

                <div className="mt-16 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-500 hover:bg-slate-800"
                    >
                        ← View All Articles
                    </Link>
                </div>
            </article>
        </main>
    );
}