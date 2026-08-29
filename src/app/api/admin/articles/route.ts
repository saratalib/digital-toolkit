import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
    supabaseUrl && supabaseServiceKey
        ? createClient(supabaseUrl, supabaseServiceKey)
        : null;

async function checkAdmin() {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;

    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const secret = process.env.ADMIN_SESSION_SECRET;

    if (!session || !email || !secret) {
        return false;
    }

    const expected = crypto
        .createHmac("sha256", secret)
        .update(email)
        .digest("hex");

    return session === expected;
}

function getSupabaseError(error: any) {
    return {
        error: error?.message || "Unknown Supabase error.",
        details: error?.details || null,
        hint: error?.hint || null,
        code: error?.code || null,
    };
}

/* CREATE ARTICLE */
export async function POST(request: Request) {
    try {
        if (!(await checkAdmin())) {
            return NextResponse.json(
                { error: "Unauthorized." },
                { status: 401 }
            );
        }

        if (!supabase) {
            return NextResponse.json(
                { error: "Supabase is not configured." },
                { status: 500 }
            );
        }

        const body = await request.json();

        const title = String(body.title || "").trim();
        const slug = String(body.slug || "").trim().toLowerCase();
        const category = String(body.category || "General").trim();
        const excerpt = String(body.excerpt || "").trim();
        const content = String(body.content || "").trim();
        const seoTitle = String(body.seoTitle || "").trim();
        const seoDescription = String(
            body.seoDescription || ""
        ).trim();
        const featuredImage = String(
            body.featuredImage || ""
        ).trim();

        const status =
            body.status === "published"
                ? "published"
                : "draft";

        if (!title || !slug || !content) {
            return NextResponse.json(
                {
                    error:
                        "Title, slug and content are required.",
                },
                { status: 400 }
            );
        }

        const { data: existing, error: existingError } =
            await supabase
                .from("articles")
                .select("id")
                .eq("slug", slug)
                .maybeSingle();

        if (existingError) {
            return NextResponse.json(
                getSupabaseError(existingError),
                { status: 500 }
            );
        }

        if (existing) {
            return NextResponse.json(
                {
                    error:
                        "An article with this slug already exists.",
                },
                { status: 409 }
            );
        }

        const { data, error } = await supabase
            .from("articles")
            .insert({
                title,
                slug,
                category,
                excerpt,
                content,
                seo_title: seoTitle,
                seo_description: seoDescription,
                featured_image: featuredImage,
                status,
            })
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                getSupabaseError(error),
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                article: data,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Unexpected server error.",
            },
            { status: 400 }
        );
    }
}

/* GET ARTICLES */
export async function GET() {
    try {
        if (!(await checkAdmin())) {
            return NextResponse.json(
                { error: "Unauthorized." },
                { status: 401 }
            );
        }

        if (!supabase) {
            return NextResponse.json(
                { error: "Supabase is not configured." },
                { status: 500 }
            );
        }

        const { data, error } = await supabase
            .from("articles")
            .select("*")
            .order("created_at", {
                ascending: false,
            });

        if (error) {
            return NextResponse.json(
                getSupabaseError(error),
                { status: 500 }
            );
        }

        return NextResponse.json({
            articles: data || [],
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Could not load articles.",
            },
            { status: 500 }
        );
    }
}

/* UPDATE ARTICLE */
export async function PATCH(request: Request) {
    try {
        if (!(await checkAdmin())) {
            return NextResponse.json(
                { error: "Unauthorized." },
                { status: 401 }
            );
        }

        if (!supabase) {
            return NextResponse.json(
                { error: "Supabase is not configured." },
                { status: 500 }
            );
        }

        const body = await request.json();

        const id = String(body.id || "").trim();

        if (!id) {
            return NextResponse.json(
                { error: "Article ID is required." },
                { status: 400 }
            );
        }

        const title = String(body.title || "").trim();
        const slug = String(body.slug || "").trim().toLowerCase();
        const category = String(body.category || "General").trim();
        const excerpt = String(body.excerpt || "").trim();
        const content = String(body.content || "").trim();
        const seoTitle = String(body.seoTitle || "").trim();
        const seoDescription = String(
            body.seoDescription || ""
        ).trim();
        const featuredImage = String(
            body.featuredImage || ""
        ).trim();

        const status =
            body.status === "published"
                ? "published"
                : "draft";

        if (!title || !slug || !content) {
            return NextResponse.json(
                {
                    error:
                        "Title, slug and content are required.",
                },
                { status: 400 }
            );
        }

        const { data: duplicate, error: duplicateError } =
            await supabase
                .from("articles")
                .select("id")
                .eq("slug", slug)
                .neq("id", id)
                .maybeSingle();

        if (duplicateError) {
            return NextResponse.json(
                getSupabaseError(duplicateError),
                { status: 500 }
            );
        }

        if (duplicate) {
            return NextResponse.json(
                {
                    error:
                        "Another article already uses this slug.",
                },
                { status: 409 }
            );
        }

        const { data, error } = await supabase
            .from("articles")
            .update({
                title,
                slug,
                category,
                excerpt,
                content,
                seo_title: seoTitle,
                seo_description: seoDescription,
                featured_image: featuredImage,
                status,
                updated_at: new Date().toISOString(),
            })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                getSupabaseError(error),
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            article: data,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Could not update article.",
            },
            { status: 400 }
        );
    }
}

/* DELETE ARTICLE */
export async function DELETE(request: Request) {
    try {
        if (!(await checkAdmin())) {
            return NextResponse.json(
                { error: "Unauthorized." },
                { status: 401 }
            );
        }

        if (!supabase) {
            return NextResponse.json(
                { error: "Supabase is not configured." },
                { status: 500 }
            );
        }

        const body = await request.json();

        const id = String(body.id || "").trim();

        if (!id) {
            return NextResponse.json(
                { error: "Article ID is required." },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from("articles")
            .delete()
            .eq("id", id);

        if (error) {
            return NextResponse.json(
                getSupabaseError(error),
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Could not delete article.",
            },
            { status: 400 }
        );
    }
}