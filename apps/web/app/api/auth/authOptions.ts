import axios from "axios";
import jwt from "jsonwebtoken";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) return null;

                try {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/auth/login`, {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    const { token } = response.data;

                    if (token) {
                        const decodedToken = jwt.decode(token) as {
                            id: string;
                            name: string;
                            email: string;
                            role: string;
                        };

                        const user = {
                            id: decodedToken.id,
                            name: decodedToken.name,
                            email: decodedToken.email,
                            role: decodedToken.role,
                            token, // Include the token in the user object
                        };

                        return user;
                    }

                    return null;
                } catch (error) {
                    console.error("Login error:", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            // Add the user token to the JWT token
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
                token.token = user.token; // Pass the token to the JWT
            }
            return token;
        },
        async session({ session, token }) {
            // Add the token to the session
            if (session.user) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
                session.user.token = token.token; // Pass the token to the session
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};
