"use client"; // Error boundaries must be Client Components
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        // global-error must include html and body tags
        <html>
            <body className="text-center h-screen flex flex-col items-center justify-center">
                <h1 className="text-[10rem] mb-2">Something went wrong!</h1>
                <p className="text-3xl mb-3">caught by global error boundary</p>
                <button type="button" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => reset()}>
                    Try again
                </button>
            </body>
        </html>
    );
}
