import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
    supabaseUrl && supabaseServiceKey
        ? createClient(supabaseUrl, supabaseServiceKey)
        : null;

export async function GET() {
    try {
        if (!supabase) {
            return NextResponse.json(
                { error: "Supabase is not configured." },
                { status: 500 }
            );
        }

        const { data, error } = await supabase
            .from("articles")
            .select(
                "id, title, slug, category, excerpt, featured_image, created_at"
            )
            .eq("status", "published")
            .order("created_at", {
                ascending: false,
            })
            .limit(6);

        if (error) {
            console.error("PUBLIC ARTICLES ERROR:", error);

            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            articles: data || [],
        });
    } catch (error) {
        console.error("PUBLIC ARTICLES ERROR:", error);

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