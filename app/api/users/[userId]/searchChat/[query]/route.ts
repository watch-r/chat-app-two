import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(
    request: NextRequest,
    { params }: { params: { userId: string; query: string } }
) {
    try {
        const searchedChat = await prisma.chat.findMany({
            where: {
                members: {
                    some: {
                        id: params.userId,
                    },
                },
                OR: [
                    { gname: { contains: params.query, mode: "insensitive" } },
                    {
                        members: {
                            every: {
                                name: {
                                    contains: params.query,
                                    mode: "insensitive",
                                },
                            },
                        },
                    },
                ],
            },
            include: { members: true, messages: {include:{seenBy:true}} },
        });
        return NextResponse.json(searchedChat, { status: 200 });
    } catch (error) {
        return NextResponse.json("Failed to get the Chats", { status: 200 });
    }
}
