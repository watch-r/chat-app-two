"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogInIcon, LogOut, User } from "lucide-react";
import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ToggleTheme } from "./ToggleTheme";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

const NavBar = () => {
    return (
        <nav className='border-b-2 px-4 mb-5 py-3'>
            <div className='flex flex-row items-center justify-between'>
                <Link
                    href={"/chats"}
                    className='flex flex-row space-x-1 items-center'
                >
                    <Image
                        src={"/chatlogo.svg"}
                        alt='Chat logo'
                        height={30}
                        width={30}
                    />
                    <p className='text-sm md:text-base font-extrabold'>
                        Chat App
                    </p>
                </Link>
                <div className='flex space-x-2 items-center'>
                    <NavLinks />
                    <ToggleTheme />
                    <AuthStatus />
                </div>
            </div>
        </nav>
    );
};

const NavLinks = () => {
    const currentPath = usePathname();
    const links = [
        { label: "Chats", href: "/chats" },
        { label: "Contacts", href: "/contacts" },
    ];
    return (
        <ul className='flex space-x-2'>
            {links.map((link) => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={cn(
                            "font-semibold text-sm md:font-bold md:text-lg",
                            {
                                "dark:!text-violet-800 text-violet-400":
                                    link.href === currentPath,
                            }
                        )}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

const AuthStatus = () => {
    // location.reload();
    const { status, data: session } = useSession();

    if (status === "loading") return <Skeleton className='w-8 h-8' />;
    if (status === "unauthenticated")
        return (
            <Link className='nav-link' href='/signin'>
                <LogInIcon />
            </Link>
        );
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className='w-8 h-8'>
                    <AvatarImage
                        src={session!.user!.image || "/defaultperson.png"}
                    />
                    <AvatarFallback>?</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>
                    {session?.user!.name!}{" "}
                    <span className='text-gray-600 dark:text-gray-300 font-light'>
                        {session?.user!.email!}
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
                    <Button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        variant={"link"}
                        className='flex flex-row items-center justify-center h-6'
                    >
                        <LogOut className='mr-2 h-4 w-4' />
                        <span>Log out</span>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NavBar;
