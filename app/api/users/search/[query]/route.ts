import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
export async function GET(
    request: NextRequest,
    { params }: { params: { query: string } }
) {
    try {
        const searchedContacts = await prisma.user.findMany({
            where: {
                OR: [
                    { name: { contains: params.query, mode: "insensitive" } },
                    { email: { contains: params.query, mode: "insensitive" } },
                ],
            },
        });

        return NextResponse.json(searchedContacts, { status: 200 });
    } catch (error) {
        return NextResponse.json("Sorry! Failed To Search The Contacts.", {
            status: 500,
        });
    }
}
