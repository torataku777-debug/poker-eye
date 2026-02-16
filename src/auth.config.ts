import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    providers: [],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnLogin = nextUrl.pathname === '/login';

            // Allow access to public assets and api
            if (nextUrl.pathname.startsWith('/api') || nextUrl.pathname.startsWith('/_next') || nextUrl.pathname === '/favicon.ico') {
                return true;
            }

            if (isOnLogin) {
                if (isLoggedIn) {
                    return Response.redirect(new URL('/', nextUrl));
                }
                return true;
            }

            // Protect other routes
            if (!isLoggedIn) {
                return false; // Redirect to login
            }

            return true;
        },
    },
    trustHost: true,
} satisfies NextAuthConfig;
