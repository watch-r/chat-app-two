import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth/authOptions";
import { database } from "@/lib/db";
import { addFriendValidator } from "@/lib/validation/addFriendValidation";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session)
        NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const body = await request.json();
        const { email: emailToAdd } = addFriendValidator.parse(body.email);

        const toAddFriendId = (await fetchRedis(
            "get",
            `user:email:${emailToAdd}`
        )) as string;

        if (!toAddFriendId)
            NextResponse.json(
                { message: "User Does not Exists" },
                { status: 400 }
            );
        if (toAddFriendId === session?.user.id)
            NextResponse.json(
                { message: "You Can Not add yourself as Friend" },
                { status: 400 }
            );

        // checking if I am in the id of that user or not
        const isAlreadyAdded = (await fetchRedis(
            "sismember",
            `user:${toAddFriendId}:incoming_friend_requests`,
            session!.user.id
        )) as 0 | 1;

        if (isAlreadyAdded)
            NextResponse.json(
                { message: "Already Added this User" },
                { status: 400 }
            );

        const isAlreadyFriends = (await fetchRedis(
            "sismember",
            `user:${session?.user.id}:friends`,
            toAddFriendId
        )) as false | true;
        if (isAlreadyFriends)
            NextResponse.json(
                { message: "Already Friends with this User" },
                { status: 400 }
            );
        // console.log(toAddFriendId);

        await database.sadd(
            `user:${toAddFriendId}:incoming_friend_requests`,
            session!.user.id
        );

        return NextResponse.json({ message: "OK" }, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid Message payload" },
                { status: 422 }
            );
        }
        return NextResponse.json(
            { message: "Invalid Request" },
            { status: 400 }
        );
    }
}
