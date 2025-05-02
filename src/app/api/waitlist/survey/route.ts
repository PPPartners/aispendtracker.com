import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { z } from "zod";

// Re-use the schema validation logic (could be extracted to a shared file)
const surveySchema = z.object({
    entryId: z.number().int().positive(), // Changed from token
    building_description: z.string().max(500).optional().nullable(),
    used_providers: z.array(z.string()).optional().nullable(),
    tracking_method: z.string().optional().nullable(),
    billing_frustration: z.string().max(1000).optional().nullable(),
    team_size: z.string().optional().nullable(),
    reasonable_price: z.string().optional().nullable(),
    feedback_call_interest: z.string().optional().nullable(),
});

export async function POST(request: Request) {
    const body = await request.json();
    console.log(
        "[Survey API] Received request body:",
        JSON.stringify(body, null, 2),
    ); // Log raw body

    // Validate the incoming data
    const validationResult = surveySchema.safeParse(body);
    if (!validationResult.success) {
        console.error(
            "Survey validation error:",
            validationResult.error.flatten(),
        );
        return NextResponse.json({ error: "Invalid survey data." }, {
            status: 400,
        });
    }

    const { entryId, ...surveyData } = validationResult.data;
    console.log("[Survey API] Extracted entryId:", entryId); // Log extracted ID

    // Initialize Supabase client (respecting environment)
    const supabaseUrl = process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_SUPABASE_URL_LOCAL!
        : process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_LOCAL!
        : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    try {
        // Find the entry by token and update it
        const { data: updateData, error: updateError } = await supabase
            .from("waitlist_entries")
            .update({
                ...surveyData,
                survey_completed_at: new Date().toISOString(),
                // Optional: Clear confirmation token after survey completion?
                // confirmation_token: null,
            })
            .eq("id", entryId) // Changed from confirmation_token to id
            .select("id") // Select something to confirm update happened
            .single(); // Expect only one row

        if (updateError) {
            console.error(
                "[Survey API] Supabase survey update error:",
                updateError,
            ); // Add identifier to log
            // Handle specific errors, e.g., entryId not found
            if (updateError.code === "PGRST116") { // "JSON object requested, multiple (or no) rows returned"
                return NextResponse.json(
                    { error: "Waitlist entry not found." }, // Updated error message
                    { status: 404 },
                );
            }
            return NextResponse.json({ error: "Failed to save survey data." }, {
                status: 500,
            });
        }

        if (!updateData) {
            // This case means the token didn't match any row
            // This case should technically not be reached if PGRST116 is handled above, but keep as safeguard
            return NextResponse.json({
                error: "Waitlist entry not found for token.",
            }, {
                status: 404,
            });
        }

        console.log(
            `[Survey API] Survey completed for waitlist entry ID: ${updateData.id}`,
        ); // Add identifier to log
        return NextResponse.json(
            { message: "Survey submitted successfully!" },
            { status: 200 },
        );
    } catch (e) {
        console.error("[Survey API] Generic API error:", e); // Add identifier to log
        return NextResponse.json({ error: "An unexpected error occurred." }, {
            status: 500,
        });
    }
}
