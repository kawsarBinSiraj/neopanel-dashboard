import { headers } from "next/headers";

/**
 * Gets the current pathname in a Server Component
 * @returns The current pathname string
 */
export async function getServerPathname() {
    try {
        const headersList = await headers();
        const xUrl = headersList.get("x-url") || "";
        const referer = headersList.get("referer") || "";
        const rawUrl = xUrl || referer;
        if (!rawUrl) return "";
        try {
            const { pathname } = new URL(rawUrl);
            return pathname;
        } catch (parseError) {
            console.error("Invalid URL format:", parseError);
            return "";
        }
    } catch (error) {
        console.error("Error getting headers:", error);
        return "";
    }
}
