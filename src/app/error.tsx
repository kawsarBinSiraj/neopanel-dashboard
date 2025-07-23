"use client"; // Error boundaries must be Client Components
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div id="error-page" className="text-center p-5">
            <h1 className="display-1 mb-2 text-danger">Oops!</h1>
            <h2 className="display-5 mb-3">Something went wrong! caught by error boundary</h2>
            <button
                className="btn btn-danger px-4 rounded-pill"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    );
}
