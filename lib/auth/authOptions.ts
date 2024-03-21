import { fetchRedis } from "@/helpers/redis";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { database } from "../db";

export const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(database),
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
                const userId = await fetchRedis(
                    "get",
                    `user:email:${credentials.email}`
                );
                const user = await fetchRedis("get", `user:${userId}`);
                // console.log(user)
                if (!user) return null;
                const parsedUser = JSON.parse(user);

                // console.log(parsedUser.password);
                const validPass = await bcrypt.compare(
                    credentials.password,
                    parsedUser.password!
                );

                return validPass ? parsedUser : null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            const dbUserResult = (await fetchRedis(
                "get",
                `user:${token.id}`
            )) as string | null;

            if (!dbUserResult) {
                if (user) {
                    token.id = user!.id;
                }

                return token;
            }

            const dbUser = JSON.parse(dbUserResult) as User;

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
            };
        },
        session: async ({ session, token }) => {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }
            // console.log(token);

            return session;
        },
    },

    session: {
        strategy: "jwt",
    },

    pages: { signIn: "/" },
};
