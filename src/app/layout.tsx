import React from "react";
import { Quicksand } from "next/font/google";
import ThemeProvider from "@/providers/next-themes";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CornerStoneProvider from "@/providers/corner-stone";
import { Toaster } from "@/components/toaster";
import HydrateZustand from "@/store";
import "./globals.css";

/**
 * description :- {fonts}
 * created_at:- 01/01/2024 11:27:16
 */
const quicksand = Quicksand({ subsets: ["latin"], weight: ["300", "400"] });

/**
 * description :- {meta}
 * created_at:- 01/01/2024 12:45:36
 */
export const metadata = {
    metadataBase: new URL("http://localhost:3000"),
    title: "Neo Panel",
    description: "Empowering Conversations with AI",
    icons: {
        icon: [
            {
                media: "(prefers-color-scheme: light)",
                url: "/next.png",
                href: "/next.png",
            },
            {
                media: "(prefers-color-scheme: dark)",
                url: "/next.png",
                href: "/next.png",
            },
        ],
    },
    openGraph: {
        title: "Neo Panel",
        description: "Empowering Conversations with AI",
        siteName: "Neo Panel",
        images: [
            {
                url: "/og.jpeg", // Must be an absolute URL
                width: 800,
                height: 600,
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

/**
 * description :- RootLayout
 * created_at:- 01/01/2024 11:27:30
 */
interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={`bg-gray-100 ${quicksand.className}`} suppressHydrationWarning>
                <CornerStoneProvider>
                    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
                        <ThemeProvider>
                            <HydrateZustand>{children}</HydrateZustand>
                        </ThemeProvider>
                    </GoogleOAuthProvider>
                    <Toaster />
                </CornerStoneProvider>
            </body>
            <GoogleAnalytics gaId="G-XYZ" />
            <GoogleTagManager gtmId="GTM-XYZ" />
        </html>
    );
}
