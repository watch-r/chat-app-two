import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { notFound } from "next/navigation";
import { getFriendsById } from "@/helpers/getFriendsbyId";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return notFound();
    try {
        const allFriends = await getFriendsById(`${session.user.id}`);
        return NextResponse.json(allFriends, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to get the Friends" },
            { status: 500 }
        );
    }
}
