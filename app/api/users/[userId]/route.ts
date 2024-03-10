import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(
    request: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        const userChats = await prisma.chat.findMany({
            where: {
                members: {
                    some: {
                        id: { equals: params.userId },
                    },
                },
            },
            orderBy: {
                lastMessageAt: "desc", // Sort by createdAt field in descending order (latest first)
            },
            include: { members: true, messages: { include: { seenBy: true } } },
        });

        return NextResponse.json(userChats, { status: 200 });
    } catch (error) {
        return NextResponse.json("Failed to find any chats", { status: 500 });
    }
}
