"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewArticlePage() {
    const router = useRouter();
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState("General");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [seoTitle, setSeoTitle] = useState("");
    const [seoDescription, setSeoDescription] = useState("");
    const [featuredImage, setFeaturedImage] = useState("");
    const [status, setStatus] =
        useState<"draft" | "published">("draft");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const createSlug = (value: string) => {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    };

    const handleTitleChange = (value: string) => {
        setTitle(value);

        if (!slug || slug === createSlug(title)) {
            setSlug(createSlug(value));
        }
    };

    const insertAtCursor = (
        before: string,
        after = "",
        placeholder = "text"
    ) => {
        const textarea = contentRef.current;

        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const selected = content.substring(start, end);
        const text = selected || placeholder;

        const newContent =
            content.substring(0, start) +
            before +
            text +
            after +
            content.substring(end);

        setContent(newContent);

        requestAnimationFrame(() => {
            textarea.focus();

            const cursorStart =
                start + before.length;

            const cursorEnd =
                cursorStart + text.length;

            textarea.setSelectionRange(
                cursorStart,
                cursorEnd
            );
        });
    };

    const insertLine = (text: string) => {
        const textarea = contentRef.current;

        if (!textarea) return;

        const start = textarea.selectionStart;

        const before = content.substring(0, start);
        const after = content.substring(start);

        const prefix =
            before.length > 0 &&
                !before.endsWith("\n")
                ? "\n"
                : "";

        const newContent =
            before +
            prefix +
            text +
            after;

        setContent(newContent);

        requestAnimationFrame(() => {
            textarea.focus();

            const position =
                start +
                prefix.length +
                text.length;

            textarea.setSelectionRange(
                position,
                position
            );
        });
    };

    const insertTemplate = () => {
        const template = `# Article Title

Write a short introduction to your topic here.

## What is this?

Explain the topic clearly and simply.

## Why is it useful?

- Benefit one
- Benefit two
- Benefit three

## How to use it

### Step 1: Open DigitalKit

Open the relevant DigitalKit tool.

### Step 2: Add your information

Enter the information required by the tool.

### Step 3: Get your result

Use the result immediately without installing additional software.

## Tips

**Tip:** Keep your information simple and accurate.

## Conclusion

Summarize the main points and explain how DigitalKit can help.

`;

        setContent(template);

        requestAnimationFrame(() => {
            contentRef.current?.focus();
        });
    };

    const saveArticle = async () => {
        if (!title.trim()) {
            setMessage(
                "Please enter an article title."
            );
            return;
        }

        if (!slug.trim()) {
            setMessage(
                "Please enter an article slug."
            );
            return;
        }

        if (!content.trim()) {
            setMessage(
                "Please write some article content."
            );
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(
                "/api/admin/articles",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        title: title.trim(),
                        slug: slug.trim(),
                        category,
                        excerpt: excerpt.trim(),
                        content,
                        seoTitle:
                            seoTitle.trim(),
                        seoDescription:
                            seoDescription.trim(),
                        featuredImage:
                            featuredImage.trim(),
                        status,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(
                    data.error ||
                    "Could not save article."
                );
                setLoading(false);
                return;
            }

            setMessage(
                "Article saved successfully ✓"
            );

            setTimeout(() => {
                router.push("/admin/articles");
                router.refresh();
            }, 700);
        } catch {
            setMessage(
                "Something went wrong. Please try again."
            );
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <header className="border-b border-slate-800 bg-slate-900">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                    <div>
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

                        <h1 className="mt-2 text-2xl font-bold">
                            New Article
                        </h1>

                        <p className="mt-1 text-sm text-slate-400">
                            Write and publish a new
                            DigitalKit article.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={saveArticle}
                        disabled={loading}
                        className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Saving..."
                            : "Save Article"}
                    </button>
                </div>
            </header>

            <section className="mx-auto max-w-6xl px-6 py-10">
                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                    <div className="space-y-6">
                        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
                            <h2 className="text-xl font-bold">
                                Article Content
                            </h2>

                            <div className="mt-6 space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Title
                                    </label>

                                    <input
                                        value={title}
                                        onChange={(e) =>
                                            handleTitleChange(
                                                e.target.value
                                            )
                                        }
                                        placeholder="How to Compress Images Online"
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Slug
                                    </label>

                                    <input
                                        value={slug}
                                        onChange={(e) =>
                                            setSlug(
                                                createSlug(
                                                    e.target.value
                                                )
                                            )
                                        }
                                        placeholder="how-to-compress-images-online"
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-sm text-white outline-none placeholder:text-slate-600 focus:border-white"
                                    />

                                    <p className="mt-2 text-xs text-slate-500">
                                        Your article URL will use
                                        this slug.
                                    </p>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Excerpt
                                    </label>

                                    <textarea
                                        value={excerpt}
                                        onChange={(e) =>
                                            setExcerpt(
                                                e.target.value
                                            )
                                        }
                                        rows={3}
                                        placeholder="A short description of the article..."
                                        className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-white"
                                    />
                                </div>

                                <div>
                                    <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <label className="block text-sm font-medium text-slate-300">
                                            Article Content
                                        </label>

                                        <span className="text-xs text-slate-500">
                                            Markdown supported
                                        </span>
                                    </div>

                                    <div className="mb-3 flex flex-wrap gap-2 rounded-xl border border-slate-700 bg-slate-950 p-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                insertLine(
                                                    "# "
                                                )
                                            }
                                            className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold hover:bg-slate-800"
                                        >
                                            H1
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                insertLine(
                                                    "## "
                                                )
                                            }
                                            className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold hover:bg-slate-800"
                                        >
                                            H2
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                insertLine(
                                                    "### "
                                                )
                                            }
                                            className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold hover:bg-slate-800"
                                        >
                                            H3
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                insertAtCursor(
                                                    "**",
                                                    "**",
                                                    "bold text"
                                                )
                                            }
                                            className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-bold hover:bg-slate-800"
                                        >
                                            B
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                insertAtCursor(
                                                    "_",
                                                    "_",
                                                    "italic text"
                                                )
                                            }
                                            className="rounded-lg border border-slate-700 px-3 py-2 text-xs italic hover:bg-slate-800"
                                        >
                                            I
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                insertLine(
                                                    "- "
                                                )
                                            }
                                            className="rounded-lg border border-slate-700 px-3 py-2 text-xs hover:bg-slate-800"
                                        >
                                            • List
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                insertLine(
                                                    "1. "
                                                )
                                            }
                                            className="rounded-lg border border-slate-700 px-3 py-2 text-xs hover:bg-slate-800"
                                        >
                                            1. List
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                insertAtCursor(
                                                    "[",
                                                    "](https://example.com)",
                                                    "link text"
                                                )
                                            }
                                            className="rounded-lg border border-slate-700 px-3 py-2 text-xs hover:bg-slate-800"
                                        >
                                            Link
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                insertLine(
                                                    "---"
                                                )
                                            }
                                            className="rounded-lg border border-slate-700 px-3 py-2 text-xs hover:bg-slate-800"
                                        >
                                            Divider
                                        </button>

                                        <button
                                            type="button"
                                            onClick={
                                                insertTemplate
                                            }
                                            className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold hover:bg-slate-800"
                                        >
                                            Article Template
                                        </button>
                                    </div>

                                    <textarea
                                        ref={contentRef}
                                        value={content}
                                        onChange={(e) =>
                                            setContent(
                                                e.target.value
                                            )
                                        }
                                        rows={26}
                                        placeholder={`Write your article here...

Example:

# How to Compress Images Online

Compressing images can help reduce file sizes and make websites load faster.

## Why image compression matters

- Smaller file sizes
- Faster websites
- Easier sharing

### Step 1: Open DigitalKit

Visit the Image Compressor tool.

### Step 2: Upload your image

Choose a JPG, PNG, or WEBP image.

**Tip:** Choose the right image quality for your needs.

## Conclusion

DigitalKit makes everyday image tasks simple and fast.`}
                                        className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 font-mono text-sm leading-7 text-white outline-none placeholder:text-slate-600 focus:border-white"
                                    />

                                    <p className="mt-2 text-xs leading-5 text-slate-500">
                                        Use the toolbar to insert
                                        headings, bold text, italic
                                        text, lists, links, dividers,
                                        or a complete article template.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7">
                            <h2 className="text-xl font-bold">
                                SEO Settings
                            </h2>

                            <div className="mt-6 space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        SEO Title
                                    </label>

                                    <input
                                        value={seoTitle}
                                        onChange={(e) =>
                                            setSeoTitle(
                                                e.target.value
                                            )
                                        }
                                        placeholder="How to Compress Images Online | DigitalKit"
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        SEO Description
                                    </label>

                                    <textarea
                                        value={seoDescription}
                                        onChange={(e) =>
                                            setSeoDescription(
                                                e.target.value
                                            )
                                        }
                                        rows={4}
                                        placeholder="Learn how to compress images online..."
                                        className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-white"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Featured Image URL
                                    </label>

                                    <input
                                        value={featuredImage}
                                        onChange={(e) =>
                                            setFeaturedImage(
                                                e.target.value
                                            )
                                        }
                                        placeholder="https://..."
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-6">
                        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                            <h2 className="font-bold">
                                Publishing
                            </h2>

                            <label className="mt-5 mb-2 block text-sm font-medium text-slate-300">
                                Status
                            </label>

                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(
                                        e.target.value as
                                        | "draft"
                                        | "published"
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

                            <button
                                type="button"
                                onClick={saveArticle}
                                disabled={loading}
                                className="mt-5 w-full rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 hover:bg-slate-200 disabled:opacity-50"
                            >
                                {loading
                                    ? "Saving..."
                                    : status ===
                                        "published"
                                        ? "Publish Article"
                                        : "Save Draft"}
                            </button>

                            {message && (
                                <p className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-3 text-center text-sm text-slate-300">
                                    {message}
                                </p>
                            )}
                        </div>

                        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                            <h2 className="font-bold">
                                Category
                            </h2>

                            <select
                                value={category}
                                onChange={(e) =>
                                    setCategory(
                                        e.target.value
                                    )
                                }
                                className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white"
                            >
                                <option>
                                    General
                                </option>
                                <option>
                                    DigitalKit
                                </option>
                                <option>
                                    Developer Tools
                                </option>
                                <option>
                                    Image Tools
                                </option>
                                <option>
                                    Business Tools
                                </option>
                                <option>
                                    Productivity
                                </option>
                                <option>
                                    Guides
                                </option>
                                <option>
                                    Tutorials
                                </option>
                            </select>
                        </div>

                        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                            <h2 className="font-bold">
                                Article Preview
                            </h2>

                            <p className="mt-4 text-lg font-semibold">
                                {title ||
                                    "Your article title"}
                            </p>

                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                {excerpt ||
                                    "Your article excerpt will appear here."}
                            </p>

                            <div className="mt-4 rounded-xl bg-slate-950 p-4">
                                <p className="text-xs text-slate-500">
                                    URL
                                </p>

                                <p className="mt-1 break-all font-mono text-xs text-slate-300">
                                    /blog/
                                    {slug ||
                                        "article-slug"}
                                </p>
                            </div>

                            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
                                <p className="text-xs font-semibold text-slate-400">
                                    Writing tip
                                </p>

                                <p className="mt-2 text-xs leading-5 text-slate-500">
                                    Use one H1 for the main
                                    title, H2 headings for
                                    major sections, and H3
                                    headings for steps or
                                    smaller sections.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}