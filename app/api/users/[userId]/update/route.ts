import { patchProfileSchema } from "@/lib/schemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { userId: string } }
) {
    const body = await request.json();
    const validation = patchProfileSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });
    const { name, image } = body;
    const user = await prisma.user.findUnique({
        where: {
            id: params.userId,
        },
    });

    if (!user) return NextResponse.json("User DoesNot exists", { status: 200 });
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
            name,
            image,
        },
    });
    return NextResponse.json(updatedUser.name, { status: 200 });
}
