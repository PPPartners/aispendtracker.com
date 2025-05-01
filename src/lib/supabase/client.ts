import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
    // Use local Supabase in development, otherwise use production keys
    const supabaseUrl = process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_SUPABASE_URL_LOCAL!
        : process.env.NEXT_PUBLIC_SUPABASE_URL!;

    const supabaseAnonKey = process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_LOCAL!
        : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
