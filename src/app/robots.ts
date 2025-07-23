import type { MetadataRoute } from "next";

/**
 * @desc :- This is a robots.txt file for Next.js applications.
 * It allows web crawlers to index the site in production and disallows them in development.
 * This is useful for preventing search engines from indexing your site while you're still working on it.
 * created_by :- Kawsar Bin Siraj (04/05/2025)
 */
export default function robots(): MetadataRoute.Robots {
    // Check if the environment is production
    const isProduction = process.env.NODE_ENV === "production";
    // If in production, allow all crawlers
    return {
        rules: {
            userAgent: "*",
            disallow: isProduction ? "" : "/",
        },
        sitemap: "",
    };
}
