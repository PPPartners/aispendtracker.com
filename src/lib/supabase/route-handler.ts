import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
// import { Database } from '@/types/database.types'; // Add later

export function createRouteHandlerSupabaseClient() {
    const cookieStore = cookies();
    // Add <Database> generic once types are available
    // Note: The signature for auth-helpers might be slightly different if needing URL/keys,
    // but the basic cookie handler should work.
    return createRouteHandlerClient({
        cookies: () => cookieStore,
    });
}
