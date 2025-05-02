import { createClient } from "@supabase/supabase-js"; // Use basic client
import { NextResponse } from "next/server";
import { z } from "zod";

// Schema for the expected query parameter
const tokenSchema = z.string().uuid(); // Assuming UUID tokens

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    // Validate the token format
    const validationResult = tokenSchema.safeParse(token);

    if (!token || !validationResult.success) {
        return NextResponse.json({ error: "Invalid or missing token." }, {
            status: 400,
        });
    }

    const validToken = validationResult.data;

    // Initialize basic Supabase client
    const supabaseUrl = process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_SUPABASE_URL_LOCAL!
        : process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_LOCAL!
        : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    try {
        // Find the waitlist entry with the matching token
        const { data: entry, error: findError } = await supabase
            .from("waitlist_entries")
            .select("id, confirmed_at")
            .eq("confirmation_token", validToken)
            .single();

        if (findError || !entry) {
            console.error("Error finding token or token not found:", findError);
            return NextResponse.json({ error: "Invalid or expired token." }, {
                status: 404,
            });
        }

        // Check if already confirmed
        if (entry.confirmed_at) {
            console.log(`Token ${validToken} already confirmed.`);
            // Consider redirecting to login or a specific page if already confirmed
            return NextResponse.json({ message: "Email already confirmed." }, {
                status: 200,
            });
        }

        // Update the entry to mark as confirmed
        const { error: updateError } = await supabase
            .from("waitlist_entries")
            .update({
                confirmed_at: new Date().toISOString(),
                confirmation_token: null,
            }) // Set confirmed_at, clear token
            .eq("id", entry.id);

        if (updateError) {
            console.error("Error updating waitlist entry:", updateError);
            return NextResponse.json({ error: "Failed to confirm email." }, {
                status: 500,
            });
        }

        console.log(`Email confirmed successfully for token ${validToken}`);
        // Optionally: Redirect to a success page or return data for the UI
        return NextResponse.json({ message: "Email confirmed successfully!" }, {
            status: 200,
        });
    } catch (e) {
        console.error("Confirmation API error:", e);
        return NextResponse.json({ error: "An unexpected error occurred." }, {
            status: 500,
        });
    }
}
