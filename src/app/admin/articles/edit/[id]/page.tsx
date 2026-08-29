"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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
};

export default function EditArticlePage() {
    const params = useParams();
    const router = useRouter();

    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        const loadArticle = async () => {
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
                        data.error ||
                        "Could not load articles."
                    );
                    return;
                }

                const found = data.articles?.find(
                    (item: Article) => item.id === id
                );

                if (!found) {
                    setError("Article not found.");
                    return;
                }

                setArticle(found);
            } catch {
                setError(
                    "Could not connect to the article system."
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadArticle();
        }
    }, [id]);

    const updateField = (
        field: keyof Article,
        value: string
    ) => {
        setArticle((current) =>
            current
                ? {
                    ...current,
                    [field]: value,
                }
                : current
        );
    };

    const saveArticle = async (
        event: React.FormEvent
    ) => {
        event.preventDefault();

        if (!article) return;

        try {
            setSaving(true);
            setMessage("");
            setError("");

            const response = await fetch(
                "/api/admin/articles",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        id: article.id,
                        title: article.title,
                        slug: article.slug,
                        category: article.category,
                        excerpt: article.excerpt,
                        content: article.content,
                        seoTitle: article.seo_title,
                        seoDescription:
                            article.seo_description,
                        featuredImage:
                            article.featured_image,
                        status: article.status,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.error ||
                    "Could not save article."
                );
                return;
            }

            setArticle(data.article);

            setMessage(
                "Article saved successfully."
            );
        } catch {
            setError(
                "Could not connect to the article system."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
                <p className="text-slate-400">
                    Loading article...
                </p>
            </main>
        );
    }

    if (error && !article) {
        return (
            <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
                <div className="mx-auto max-w-3xl rounded-3xl border border-red-900 bg-red-950/30 p-8">
                    <h1 className="text-xl font-bold text-red-300">
                        {error}
                    </h1>

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/admin/articles"
                            )
                        }
                        className="mt-6 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950"
                    >
                        Back to Articles
                    </button>
                </div>
            </main>
        );
    }

    if (!article) {
        return null;
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <header className="border-b border-slate-800 bg-slate-900">
                <div className="mx-auto max-w-5xl px-6 py-6">
                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/admin/articles"
                            )
                        }
                        className="text-sm text-slate-400 hover:text-white"
                    >
                        ← Back to Articles
                    </button>

                    <h1 className="mt-3 text-3xl font-bold">
                        Edit Article
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                        Update your DigitalKit article.
                    </p>
                </div>
            </header>

            <section className="mx-auto max-w-5xl px-6 py-10">
                <form
                    onSubmit={saveArticle}
                    className="space-y-6"
                >
                    {error && (
                        <div className="rounded-xl border border-red-900 bg-red-950/30 p-4 text-sm text-red-300">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="rounded-xl border border-green-900 bg-green-950/30 p-4 text-sm text-green-300">
                            {message}
                        </div>
                    )}

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
                        <h2 className="text-lg font-semibold">
                            Article Details
                        </h2>

                        <div className="mt-6 space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    value={article.title}
                                    onChange={(e) =>
                                        updateField(
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    required
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Slug
                                </label>

                                <input
                                    type="text"
                                    value={article.slug}
                                    onChange={(e) =>
                                        updateField(
                                            "slug",
                                            e.target.value
                                                .toLowerCase()
                                                .replace(
                                                    /\s+/g,
                                                    "-"
                                                )
                                        )
                                    }
                                    required
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white"
                                />

                                <p className="mt-2 text-xs text-slate-500">
                                    /blog/
                                    {article.slug}
                                </p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Category
                                </label>

                                <input
                                    type="text"
                                    value={article.category}
                                    onChange={(e) =>
                                        updateField(
                                            "category",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Excerpt
                                </label>

                                <textarea
                                    value={article.excerpt}
                                    onChange={(e) =>
                                        updateField(
                                            "excerpt",
                                            e.target.value
                                        )
                                    }
                                    rows={4}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Content
                                </label>

                                <textarea
                                    value={article.content}
                                    onChange={(e) =>
                                        updateField(
                                            "content",
                                            e.target.value
                                        )
                                    }
                                    rows={16}
                                    required
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
                        <h2 className="text-lg font-semibold">
                            SEO
                        </h2>

                        <div className="mt-6 space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    SEO Title
                                </label>

                                <input
                                    type="text"
                                    value={
                                        article.seo_title
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "seo_title",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    SEO Description
                                </label>

                                <textarea
                                    value={
                                        article.seo_description
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "seo_description",
                                            e.target.value
                                        )
                                    }
                                    rows={4}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Featured Image URL
                                </label>

                                <input
                                    type="url"
                                    value={
                                        article.featured_image
                                    }
                                    onChange={(e) =>
                                        updateField(
                                            "featured_image",
                                            e.target.value
                                        )
                                    }
                                    placeholder="https://..."
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
                        <h2 className="text-lg font-semibold">
                            Publishing
                        </h2>

                        <div className="mt-5">
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Status
                            </label>

                            <select
                                value={article.status}
                                onChange={(e) =>
                                    updateField(
                                        "status",
                                        e.target
                                            .value
                                    )
                                }
                                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white"
                            >
                                <option value="draft">
                                    Draft
                                </option>

                                <option value="published">
                                    Published
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={() =>
                                router.push(
                                    "/admin/articles"
                                )
                            }
                            className="rounded-xl border border-slate-700 px-6 py-3 font-medium text-slate-300 hover:bg-slate-900"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-xl bg-white px-7 py-3 font-semibold text-slate-950 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}