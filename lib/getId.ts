import { prisma } from "@/prisma/client";
export async function getId(email: any) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user?.id;
}
