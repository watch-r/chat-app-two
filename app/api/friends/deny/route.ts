import { authOptions } from "@/lib/auth/authOptions";
import { database } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }
    try {
        const body = await request.json();
        const { id: idToDeny } = z.object({ id: z.string() }).parse(body);

        await database.srem(
            `user:${session.user.id}:incoming_friend_requests`,
            idToDeny
        );

        return NextResponse.json("OK", { status: 201 });
    } catch (error) {
        // console.log(error);

        if (error instanceof z.ZodError) {
            return NextResponse.json("Invalid request payload", {
                status: 422,
            });
        }

        return NextResponse.json("Invalid request", { status: 400 });
    }
}
