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
        console.error("BLOG ARTICLE ERROR:", error);
        return null;
    }

    return data as Article | null;
}

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) {
        return {
            title: "Article Not Found | DigitalKit",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const title =
        article.seo_title ||
        `${article.title} | DigitalKit`;

    const description =
        article.seo_description ||
        article.excerpt ||
        `Read ${article.title} on DigitalKit.`;

    const url =
        `https://www.getdigitalkit.online/blog/${article.slug}`;

    return {
        title,
        description,

        alternates: {
            canonical: url,
        },

        openGraph: {
            type: "article",
            title,
            description,
            url,
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

        twitter: {
            card: article.featured_image
                ? "summary_large_image"
                : "summary",
            title,
            description,

            ...(article.featured_image
                ? {
                    images: [article.featured_image],
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

    const articleUrl =
        `https://www.getdigitalkit.online/blog/${article.slug}`;

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",

        headline: article.title,

        description:
            article.seo_description ||
            article.excerpt ||
            "",

        datePublished: article.created_at,

        dateModified:
            article.updated_at ||
            article.created_at,

        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": articleUrl,
        },

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

        ...(article.featured_image
            ? {
                image: [
                    article.featured_image,
                ],
            }
            : {}),
    };

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            {/* STRUCTURED DATA */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        articleSchema
                    ),
                }}
            />

            {/* HEADER */}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-5xl px-6 py-7">
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                        <Link
                            href="/"
                            className="font-medium text-slate-500 transition hover:text-slate-900"
                        >
                            DigitalKit
                        </Link>

                        <span className="text-slate-300">
                            /
                        </span>

                        <Link
                            href="/blog"
                            className="font-medium text-slate-500 transition hover:text-slate-900"
                        >
                            Articles
                        </Link>
                    </div>
                </div>
            </header>

            {/* ARTICLE */}
            <article className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
                {/* CATEGORY */}
                <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    {article.category}
                </p>

                {/* TITLE */}
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl sm:leading-tight">
                    {article.title}
                </h1>

                {/* DATE */}
                <div className="mt-5 text-sm text-slate-500">
                    Published {formatDate(article.created_at)}
                </div>

                {/* FEATURED IMAGE */}
                {article.featured_image && (
                    <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                        <img
                            src={article.featured_image}
                            alt={article.title}
                            className="h-auto w-full object-cover"
                        />
                    </div>
                )}

                {/* EXCERPT */}
                {article.excerpt && (
                    <p className="mt-10 text-xl leading-8 text-slate-600">
                        {article.excerpt}
                    </p>
                )}

                {/* CONTENT */}
                <div className="mt-10 border-t border-slate-200 pt-10">
                    <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-3xl prose-h3:mt-10 prose-h3:text-2xl prose-p:leading-8 prose-p:text-slate-700 prose-li:text-slate-700 prose-strong:text-slate-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
                        <ReactMarkdown>
                            {article.content}
                        </ReactMarkdown>
                    </div>
                </div>

                {/* BACK TO ARTICLES */}
                <div className="mt-14 border-t border-slate-200 pt-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        ← Back to Articles
                    </Link>
                </div>
            </article>

            {/* FOOTER */}
            <footer className="border-t border-slate-200 bg-white">
                <div className="mx-auto max-w-5xl px-6 py-8">
                    <div className="flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                        <p>
                            © {new Date().getFullYear()} DigitalKit
                        </p>

                        <div className="flex gap-5">
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
                </div>
            </footer>
        </main>
    );
}