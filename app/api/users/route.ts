import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { notFound } from "next/navigation";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    // if (!session) return notFound();
    try {
        const allUser = await prisma.user.findMany();
        return NextResponse.json(allUser, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to get the Users" },
            { status: 500 }
        );
    }
}
