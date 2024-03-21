import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth/authOptions";
import { database } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json("You are Unauthorized", { status: 401 });

    try {
        const body = await request.json();
        const { id: idToAdd } = z.object({ id: z.string() }).parse(body);

        // already Friends
        const isAlreadyFriends = await fetchRedis(
            "sismember",
            `user:${session.user.id}:friends`,
            idToAdd
        );
        if (isAlreadyFriends) {
            return NextResponse.json("You Already friends", { status: 400 });
        }

        const hasFriendRequest = await fetchRedis(
            "sismember",
            `user:${session.user.id}:incoming_friend_requests`,
            idToAdd
        );

        if (!hasFriendRequest) {
            return NextResponse.json("No friend request", { status: 400 });
        }

        const [userRaw, friendRaw] = (await Promise.all([
            fetchRedis(`get`, `user:${session.user.id}`),
            fetchRedis(`get`, `user:${idToAdd}`),
        ])) as [string, string];

        const user = JSON.parse(userRaw) as User;
        const friend = JSON.parse(friendRaw) as User;

        // notify added user

        await Promise.all([
            pusherServer.trigger(
                toPusherKey(`user:${idToAdd}:friends`),
                "new_friend",
                user
            ),
            pusherServer.trigger(
                toPusherKey(`user:${session.user.id}:friends`),
                "new_friend",
                friend
            ),
            database.sadd(`user:${session.user.id}:friends`, idToAdd),
            database.sadd(`user:${idToAdd}:friends`, session.user.id),
            database.srem(
                `user:${session.user.id}:incoming_friend_requests`,
                idToAdd
            ),
        ]);

        return NextResponse.json("OK", { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json("Invalid request payload", {
                status: 422,
            });
        }

        return NextResponse.json("Invalid request", { status: 400 });
    }
}
