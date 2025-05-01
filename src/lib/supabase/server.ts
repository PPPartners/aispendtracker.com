// We will add the Database import later once types are generated
// import { Database } from '@/types/database.types';
import { createServerClient } from "@supabase/ssr";
import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

// Factory function using the modern getAll/setAll pattern
export function createServerSupabaseClient(
    cookieStore: ReadonlyRequestCookies,
) {
    // Use local Supabase in development, otherwise use production keys
    const supabaseUrl = process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_SUPABASE_URL_LOCAL!
        : process.env.NEXT_PUBLIC_SUPABASE_URL!;

    const supabaseAnonKey = process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_LOCAL!
        : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    // Add <Database> generic once types are available
    return createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
                try {
                    // Options optimized for server-side processing
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                } catch {
                    // The `setAll` method was called from a Server Component.
                    // This can be ignored if you have middleware refreshing
                    // user sessions.
                }
            },
        },
    });
}
