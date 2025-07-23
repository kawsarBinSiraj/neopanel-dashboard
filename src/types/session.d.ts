/**
 * @desc :- TypeScript types for session management and authentication
 * created_by :- Kawsar Bin Siraj (22/04/2025)
 */

export type sessionInfo = {
    accessToken: string;
    tokenType: string;
    expiresAt: Date;
};
