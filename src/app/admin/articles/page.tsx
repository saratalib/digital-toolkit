"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Article = {
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    featured_image: string;
    status: "draft" | "published";
    created_at: string;
    updated_at: string;
};

export default function ArticlesPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(
        null
    );

    const loadArticles = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "/api/admin/articles",
                {
                    cache: "no-store",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.error || "Could not load articles."
                );
                return;
            }

            setArticles(data.articles || []);
        } catch {
            setError(
                "Could not connect to the article system."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadArticles();
    }, []);

    const deleteArticle = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to permanently delete this article?"
        );

        if (!confirmed) return;

        try {
            setDeletingId(id);
            setError("");

            const response = await fetch(
                "/api/admin/articles",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.error ||
                    "Could not delete article."
                );
                return;
            }

            setArticles((current) =>
                current.filter(
                    (article) => article.id !== id
                )
            );
        } catch {
            setError(
                "Could not connect to the article system."
            );
        } finally {
            setDeletingId(null);
        }
    };

    const publishedCount = articles.filter(
        (article) => article.status === "published"
    ).length;

    const draftCount = articles.filter(
        (article) => article.status === "draft"
    ).length;

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <header className="border-b border-slate-800 bg-slate-900">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                    <div>
                        <Link
                            href="/admin"
                            className="text-sm text-slate-400 hover:text-white"
                        >
                            ← Dashboard
                        </Link>

                        <h1 className="mt-2 text-2xl font-bold">
                            Articles
                        </h1>

                        <p className="mt-1 text-sm text-slate-400">
                            Create and manage DigitalKit
                            articles.
                        </p>
                    </div>

                    <Link
                        href="/admin/articles/new"
                        className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                    >
                        + New Article
                    </Link>
                </div>
            </header>

            <section className="mx-auto max-w-6xl px-6 py-10">
                <div className="mb-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                        <p className="text-sm text-slate-500">
                            Total Articles
                        </p>

                        <p className="mt-2 text-3xl font-bold">
                            {articles.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                        <p className="text-sm text-slate-500">
                            Published
                        </p>

                        <p className="mt-2 text-3xl font-bold text-green-400">
                            {publishedCount}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                        <p className="text-sm text-slate-500">
                            Drafts
                        </p>

                        <p className="mt-2 text-3xl font-bold text-yellow-400">
                            {draftCount}
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 rounded-2xl border border-red-900 bg-red-950/30 p-4">
                        <p className="text-sm text-red-300">
                            {error}
                        </p>
                    </div>
                )}

                {loading ? (
                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">
                        <p className="text-slate-400">
                            Loading articles...
                        </p>
                    </div>
                ) : articles.length === 0 ? (
                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center">
                        <div className="text-5xl">📝</div>

                        <h2 className="mt-5 text-xl font-bold">
                            No articles yet
                        </h2>

                        <p className="mt-2 text-slate-400">
                            Create your first DigitalKit
                            article.
                        </p>

                        <Link
                            href="/admin/articles/new"
                            className="mt-6 inline-block rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 hover:bg-slate-200"
                        >
                            Create Article
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {articles.map((article) => (
                            <article
                                key={article.id}
                                className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
                            >
                                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h2 className="text-xl font-bold">
                                                {article.title}
                                            </h2>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${article.status ===
                                                        "published"
                                                        ? "bg-green-950 text-green-400"
                                                        : "bg-yellow-950 text-yellow-400"
                                                    }`}
                                            >
                                                {article.status ===
                                                    "published"
                                                    ? "Published"
                                                    : "Draft"}
                                            </span>
                                        </div>

                                        <p className="mt-2 break-all font-mono text-xs text-slate-500">
                                            /blog/{article.slug}
                                        </p>

                                        {article.excerpt && (
                                            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                                                {article.excerpt}
                                            </p>
                                        )}

                                        <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
                                            <span>
                                                Category:{" "}
                                                {article.category}
                                            </span>

                                            <span>
                                                Created:{" "}
                                                {new Date(
                                                    article.created_at
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex shrink-0 flex-wrap gap-3">
                                        {article.status ===
                                            "published" && (
                                                <Link
                                                    href={`/blog/${article.slug}`}
                                                    target="_blank"
                                                    className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800"
                                                >
                                                    View
                                                </Link>
                                            )}

                                        <Link
                                            href={`/admin/articles/edit/${article.id}`}
                                            className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteArticle(
                                                    article.id
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                article.id
                                            }
                                            className="rounded-xl border border-red-900 px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-950 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {deletingId ===
                                                article.id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}