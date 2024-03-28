import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { notFound } from "next/navigation";

export const POST = async (request: NextRequest) => {
    const session = getServerSession(authOptions);
    if (!session) notFound(); 
    try {
        const body = await request.json();
        const { members, isGroup, gname, groupPhoto } = body;
        
        return NextResponse.json("Ok", {
            status: 201,
        });
    } catch (error) {
        return NextResponse.json("Failed to Create New Chats", { status: 400 });
    }
};
