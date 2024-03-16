import { fetchRedis } from "@/helpers/redis";
import { database } from "@/lib/db";
import { registerSchema } from "@/lib/schemas";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });
    const user =
        ((await fetchRedis("get", `user:email:${body.email}`)) as true) ||
        false;

    if (user)
        return NextResponse.json(
            { error: "User Already Exists" },
            { status: 400 }
        );
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const userId = uuid();
    const message = {
        email: body.email,
        emailVerified: null,
        image: null,
        password: hashedPassword,
        name: body.name,
        id: userId,
    };
    const newUser = await database.set(`user:${userId}`, message);
    await database.set(`user:email:${body.email}`, userId);
    return NextResponse.json(newUser, { status: 200 });
}
