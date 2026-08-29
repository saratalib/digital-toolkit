import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const email = String(body.email || "").trim().toLowerCase();
        const password = String(body.password || "");

        const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        const adminPassword = process.env.ADMIN_PASSWORD;
        const sessionSecret = process.env.ADMIN_SESSION_SECRET;

        if (!adminEmail || !adminPassword || !sessionSecret) {
            console.error("Admin authentication environment variables are missing.");

            return NextResponse.json(
                {
                    error: "Admin authentication is not configured.",
                },
                {
                    status: 500,
                }
            );
        }

        if (email !== adminEmail || password !== adminPassword) {
            return NextResponse.json(
                {
                    error: "Invalid email or password.",
                },
                {
                    status: 401,
                }
            );
        }

        const session = crypto
            .createHmac("sha256", sessionSecret)
            .update(adminEmail)
            .digest("hex");

        const response = NextResponse.json({
            success: true,
        });

        response.cookies.set({
            name: "admin_session",
            value: session,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch {
        return NextResponse.json(
            {
                error: "Invalid request.",
            },
            {
                status: 400,
            }
        );
    }
}