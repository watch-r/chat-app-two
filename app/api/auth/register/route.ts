import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import bcrypt from "bcrypt";
import { registerSchema } from "@/lib/schemas";
export async function POST(request: NextRequest,response:NextResponse) {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });
    const user = await prisma.user.findUnique({
        where: { email: body.email },
    });
    if (user)
        return NextResponse.json(
            { error: "User Already Exists" },
            { status: 400 }
        );
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            hashedPassword,
        },
    });
    return NextResponse.json(newUser.email, { status: 200 });
}
