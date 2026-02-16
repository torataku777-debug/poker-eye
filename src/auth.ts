import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (credentials.password === "admin") {
                    return { id: "1", name: "Admin", email: "admin@example.com" }
                }
                return null
            },
        }),
    ],
})
