import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { logInSchema } from "../../../../lib/schemas";

export async function GET(
    request: NextRequest,
    { params }: { params: { chatId: string } }
) {
    try {
        const chat = await prisma.chat.findUnique({
            where: { id: params.chatId },
            include: { members: true, messages: { include: { sender: true } } },
        });

        return NextResponse.json(chat, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed To Get Chat Details" },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: { chatId: string } }
) {
    try {
        const body = await request.json();
        const { currentUserId } = body;

        // If the user hasn't seen the message, connect the user to the message
        // await prisma.chat.update({
        //     where: { id: params.chatId },
        //     data: {
        //         messages: {
        //             connect: {
        //                 seenBy: {
        //                     connect: { id: currentUserId },
        //                 },
        //             },
        //         },
        //     },
        // });
        const messages = await prisma.message.findMany({
            where: { chatId: params.chatId },
        });

        // Update each message
        for (const message of messages) {
            await prisma.message.update({
                where: { id: message.id },
                data: {
                    seenBy: {
                        connect: { id: currentUserId },
                    },
                },
            });
        }

        return NextResponse.json(
            { message: "Updated: Seen By User" },
            // "OK",
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to Update" },
            { status: 500 }
        );
    }
}
