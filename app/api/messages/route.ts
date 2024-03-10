import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { pusherServer } from "@/lib/pusher";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { chatId, currentUserId, text, photo } = body;
        const newMessage = await prisma.message.create({
            data: {
                chatId: chatId,
                senderId: currentUserId,
                text: text,
                photo: photo,
                seenBy: { connect: [{ id: currentUserId }] },
            },
            include: { seenBy: true },
        });
        await prisma.chat.update({
            where: {
                id: chatId,
            },
            data: { lastMessageAt: newMessage.createdAt },
        });

        await pusherServer.trigger(chatId, "new-message", newMessage);

        return NextResponse.json("OK", { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Could not execute this request" },
            { status: 500 }
        );
    }
}
