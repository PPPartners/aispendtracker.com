import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import crypto from "crypto";

// Initialize Resend
// Ensure RESEND_API_KEY is set in your environment variables
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Define the schema for the request body using Zod
const waitlistSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

export async function POST(request: Request) {
    const requestUrl = new URL(request.url);
    const formData = await request.json();

    // Validate the request body
    const validationResult = waitlistSchema.safeParse(formData);
    if (!validationResult.success) {
        return NextResponse.json(
            {
                error: "Invalid input.",
                details: validationResult.error.flatten(),
            },
            { status: 400 },
        );
    }
    const { email } = validationResult.data;

    // Initialize basic Supabase client
    const supabaseUrl = process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_SUPABASE_URL_LOCAL!
        : process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_LOCAL!
        : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    // Use the basic client - does not need/use cookie helpers
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    try {
        const confirmation_token = crypto.randomUUID();

        const { error: insertError } = await supabase
            .from("waitlist_entries")
            .insert([{ email, confirmation_token }]);

        if (insertError) {
            // Handle potential errors, e.g., unique constraint violation if email already exists
            if (insertError.code === "23505") {
                console.log(`Email ${email} already exists in waitlist.`);
                // Redirect to success, mimicking idempotency for the user
                // No need to pass response object for redirect
                return NextResponse.redirect(
                    requestUrl.origin + "/waitlist-success",
                    {
                        status: 303,
                    },
                );
            }
            console.error("Supabase insert error:", insertError);
            return NextResponse.json(
                { error: "Could not add email to the waitlist." },
                { status: 500 },
            );
        }

        // Send confirmation email with the token link
        if (resend) {
            try {
                const confirmationUrl =
                    `${requestUrl.origin}/waitlist/confirm?token=${confirmation_token}`;
                await resend.emails.send({
                    from:
                        "AI Spend Tracker Waitlist <waitlist@aispendtracker.com>",
                    to: [email],
                    subject:
                        "Confirm your spot on the AI Spend Tracker waitlist!",
                    html:
                        `<p>Thanks for joining the waitlist! Please click the link below to confirm your email address:</p><p><a href="${confirmationUrl}">Confirm Email</a></p><p>If you didn't request this, please ignore this email.</p>`,
                });
                console.log(`Confirmation email sent successfully to ${email}`);
            } catch (emailError) {
                console.error("Resend email sending error:", emailError);
            }
        } else {
            console.warn(
                "Resend API key not configured. Skipping email confirmation.",
            );
            const confirmationUrl =
                `${requestUrl.origin}/waitlist/confirm?token=${confirmation_token}`;
            console.log(
                `---> Confirmation link for ${email}: ${confirmationUrl}`,
            );
        }

        // Redirect to a success page (e.g., telling the user to check their email)
        return NextResponse.redirect(requestUrl.origin + "/waitlist-success", {
            status: 303,
        });
    } catch (e) {
        console.error("Waitlist API error:", e);
        return NextResponse.json(
            { error: "An unexpected error occurred." },
            { status: 500 },
        );
    }
}
