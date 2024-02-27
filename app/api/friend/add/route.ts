import { addFriendForm } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { notFound } from "next/navigation";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return notFound();

    const sender = await prisma.user.findUnique({
        where: { email: session?.user?.email || undefined },
    });
    const body = await request.json();
    const { email } = addFriendForm.parse(body);

    if (session?.user?.email === email) {
        return NextResponse.json("You tried to add yourself as a friend", {
            status: 409,
        });
    }
    const receiver = await prisma.user.findUnique({ where: { email } });
    // console.log(sender);

    await prisma.friendRequest.create({
        data: {
            fromUserId: sender!.id,
            toUserId: receiver!.id,
        },
    });
    return NextResponse.json("OK", { status: 201 });
}
