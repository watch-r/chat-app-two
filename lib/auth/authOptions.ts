import { prisma } from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Email",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@email.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                if (!credentials?.email || !credentials.password) return null;
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) return null;
                const validPass = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword!
                );

                return validPass ? user : null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        jwt: async ({ token }) => {
            const user = await prisma.user.findUnique({
                where: { email: token.email || undefined },
            });
            if (user?.id) {
                token.id = user.id;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token?.id) {
                session.user.id = token?.id as string;
            }
            return session;
        },
    },

    session: {
        strategy: "jwt",
    },

    pages: { signIn: "/" },
};
