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
            ...(article.featured_image
                ? {
                    images: [
                        {
                            url: article.featured_image,
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
        },
        publisher: {
            "@type": "Organization",
            name: "DigitalKit",
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.getdigitalkit.online/blog/${article.slug}`,
        },
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
                <a
                    href="/"
                    className="text-sm text-slate-400 hover:text-white"
                >
                    ← Back to DigitalKit
                </a>

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

                    {article.excerpt && (
                        <p className="mt-8 text-xl leading-8 text-slate-300">
                            {article.excerpt}
                        </p>
                    )}

                    <div className="mt-10 border-t border-slate-800 pt-10">
                        <div className="prose prose-invert max-w-none prose-headings:font-bold prose-h2:mt-10 prose-h2:text-3xl prose-h3:mt-8 prose-h3:text-2xl prose-p:leading-8 prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline">
                            <ReactMarkdown>
                                {article.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </article>
        </main>
    );
}