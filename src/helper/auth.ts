import Cookies from "js-cookie";
import { SignJWT, jwtVerify } from "jose";
import { sessionInfo } from "@/types/session";

/**
 * @desc :- constants for session management keys and limits
 * created_by :- Kawsar Bin Siraj (13/04/2025)
 */
const secretKey = process.env.SESSION_SECRET || "36YW<QhYc{iC9>6";
const encodedKey = new TextEncoder().encode(secretKey);
const expiredDayLimit = 30;

/**
 * Creates a session by encrypting the session information and storing it in a cookie.
 * @param sessionInfo - Object containing accessToken, tokenType, and expiresAt.
 * @returns Sets the session cookie with the encrypted session data.
 * @throws Error if session creation fails.
 */
export const createSession = async (sessionInfo: sessionInfo) => {
    try {
        // Destructure sessionInfo with defaults for tokenType and expiresAt
        const { accessToken = "", tokenType = "Bearer", expiresAt = new Date(Date.now() + expiredDayLimit * 24 * 60 * 60 * 1000) } = sessionInfo;
        // Create authToken by combining tokenType and accessToken
        const authToken = tokenType + " " + accessToken;
        // Encrypt the payload to create a session
        const session = await encrypt({ authToken, expiresAt });
        // Set the session cookie with the encrypted session data
        return Cookies.set("session", session, { expires: expiredDayLimit });
    } catch (err: any) {
        // Throw an error if session creation fails
        throw Error("Auth generation is failed.");
    }
};

/**
 * Encrypts the payload to create a session.
 * @param payload - Object containing authToken and expiresAt.
 * @returns A Promise that resolves with the encrypted session data.
 */
export async function encrypt(payload: { authToken: string; expiresAt: Date }): Promise<string> {
    // Set the issued at and expiration time for the session
    // https://github.com/panva/jose/issues/231#issuecomment-1027575289
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" }) // Use the HS256 algorithm
        .setIssuedAt() // Set the issued at time
        .setExpirationTime(expiredDayLimit + "d") // Set the expiration time to 7 days
        .sign(encodedKey); // Sign the payload with the secret key
}

/**
 * Decrypts the session cookie to retrieve the session data.
 * @param session - The session cookie value. Defaults to an empty string.
 * @returns A Promise that resolves with the decrypted session data.
 * @throws Error if the session verification fails.
 */
export async function decrypt(session: string | undefined = "") {
    try {
        // Verify the session cookie using the secret key
        // https://github.com/panva/jose/issues/231#issuecomment-1027575289
        const { payload } = await jwtVerify(session, encodedKey, { algorithms: ["HS256"] });
        // Return the decrypted session data
        return payload;
    } catch (error) {
        // Log an error if the session verification fails
        console.log("Failed to decrypt session");
        return null;
    }
}

/**
 * Deletes the session cookie and clears local and session storage.
 * @param callback - Optional callback to run after the session is deleted.
 * @returns If a callback is provided, it will be returned. Otherwise, the user is redirected to the signin page.
 */
export const deleteSession = (callback: Function | undefined = undefined) => {
    // Clear local and session storage
    sessionStorage.clear();
    localStorage.clear();
    // Remove the session cookie
    Cookies.remove("session");
    // If a callback is provided, run it
    if (typeof callback === "function") callback();
    // Otherwise, redirect the user to the signin pag
    return "Session deleted successfully";
};
