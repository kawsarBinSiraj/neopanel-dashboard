import Link from "next/link";

export default function NotFound() {
    return (
        <div id="not-found" className="h-screen flex flex-col items-center justify-center">
            <h2 className="title text-[12rem] text-red-600 font-bold mb-1">Oops!</h2>
            <h2 className="title text-3xl text-red-600 font-bold mb-3">404 - Page not found</h2>
            <p className="desc text-xl mb-3">Could not find requested resource!</p>
            <Link className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" href="/">
                Return Home
            </Link>
        </div>
    );
}
