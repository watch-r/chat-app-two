import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { query: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    try {
        const friendsId = (await fetchRedis(
            `smembers`,
            `user:${session.user.id}:friends`
        )) as string[];

        const friends = await Promise.all(
            friendsId.map(async (friendId) => {
                const friend = (await fetchRedis(
                    "get",
                    `user:${friendId}`
                )) as string;

                const parsedFriend = JSON.parse(friend) as User;
                if (
                    parsedFriend.name
                        .toLowerCase()
                        .includes(params.query.toLowerCase())
                )
                    return parsedFriend;
                return '';
            })
        );
        return NextResponse.json(friends, { status: 200 });
    } catch (error) {
        return NextResponse.json("Sorry! Failed To Search The Contacts.", {
            status: 500,
        });
    }
}
