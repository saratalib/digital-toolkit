import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const name = String(body.name || "").trim();
        const email = String(body.email || "").trim();
        const message = String(body.message || "").trim();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Please fill in all fields." },
                { status: 400 }
            );
        }

        const result = await resend.emails.send({
            from: "DigitalKit <onboarding@resend.dev>",
            to: [process.env.CONTACT_EMAIL!],
            replyTo: email,
            subject: `DigitalKit Contact - ${name}`,
            text: `Name: ${name}

Email: ${email}

Message:
${message}`,
        });

        if (result.error) {
            console.error("Resend error:", result.error);

            return NextResponse.json(
                { error: "Could not send your message." },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error("Contact API error:", error);

        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
}