import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    // Use local Supabase in development, otherwise use production keys
    const supabaseUrl = process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_SUPABASE_URL_LOCAL!
        : process.env.NEXT_PUBLIC_SUPABASE_URL!;

    const supabaseAnonKey = process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_LOCAL!
        : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options }) => {
                    request.cookies.set(name, value);
                    response.cookies.set(name, value, {
                        ...options,
                        httpOnly: true,
                        secure: request.nextUrl.protocol === "https",
                        sameSite: "lax",
                        path: "/",
                        // maxAge: 60 * 60 * 24 * 7, // Optional: Set max age (e.g., 7 days)
                    });
                });
            },
        },
    });

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    await supabase.auth.getUser();

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).)*",
    ],
};
