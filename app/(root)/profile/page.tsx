import ProfileForm from "@/components/ProfileForm";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth/authOptions";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth/next";

const ProfilePage = async () => {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email!,
        },
    });
    return (
        <div className='flex items-center justify-center'>
            <Card className='w-[30rem]'>
                <CardHeader>
                    <CardTitle>Edit Your Profile</CardTitle>
                    <CardDescription>
                        Edit your Profile Picture and Name here.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ProfileForm user={user} />
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfilePage;
