import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authOptions } from "@/lib/auth/authOptions";
import { User } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogOutButton from "@/components/nav/LogOutButton";

const AuthStatus = async () => {
    const session = await getServerSession(authOptions);
    if (!session) return notFound();

    const userbyEmail = await prisma?.user.findUnique({
        where: { email: session!.user!.email! },
    });
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className='w-8 h-8'>
                    <AvatarImage
                        src={userbyEmail!.image || "/defaultperson.png"}
                    />
                    <AvatarFallback>?</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>
                    {userbyEmail!.name!}{" "}
                    <span className='text-gray-600 dark:text-gray-300 font-light'>
                        {userbyEmail!.email!}
                    </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link
                        href={"/profile"}
                        className='flex flex-row items-center justify-center'
                    >
                        <User className='mr-2 h-4 w-4' />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default AuthStatus;
