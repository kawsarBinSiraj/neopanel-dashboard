import { NextResponse, NextRequest } from "next/server";
import { decrypt } from "@/helper/auth";

/**
 * @desc :- list of protected and public routes for middleware
 * created_by :- Kawsar Bin Siraj (13/04/2025)
 */
const protectedRoutes = ["/"];
const authRoutes = ["/signin", "/signup", "/forgot", "/reset"];

/**
 * Middleware function to handle route protection and redirection based on session data.
 * @param req - The incoming request object.
 * @returns A NextResponse object for redirection or continuation.
 */
export default async function middleware(request: NextRequest) {
    const { nextUrl, cookies } = request;
    const path = nextUrl.pathname;

    // Determine if the current path is a protected or public route
    const isProtectedRoute = protectedRoutes.includes(path);
    const isAuthRoute = authRoutes.includes(path);

    // Retrieve and decrypt the session cookie
    const cookie = cookies.get("session")?.value;
    const session = await decrypt(cookie);

    // Redirect to signin if accessing a protected route without a valid session
    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL("/signin", nextUrl));
    }
    // Redirect to dashboard if accessing a public route with a valid session
    if (isAuthRoute && session) return NextResponse.redirect(new URL("/", nextUrl));
    // Allow the request to proceed if no redirection is necessary
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|favicon.ico).*)",
    ],
};
