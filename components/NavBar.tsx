"use client";
import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import { LogInIcon, LogOut, User } from "lucide-react";
import { ToggleTheme } from "./ToggleTheme";

const NavBar = () => {
    const pathname = usePathname();
    return (
        <nav className='border-b-2 px-4 mb-5 py-3'>
            <div className='flex flex-row items-center justify-between'>
                <Link
                    href={"/"}
                    className='flex flex-row space-x-1 items-center'
                >
                    <Image
                        src={"/chatlogo.svg"}
                        alt='Chat logo'
                        height={"50"}
                        width={30}
                    />{" "}
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
                        className='font-semibold text-sm md:font-bold md:text-lg'
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

const AuthStatus = () => {
    const { status, data: session } = useSession();

    if (status === "loading") return <Skeleton className='w-6 h-6' />;
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
                        src={session!.user!.image!}
                        referrerPolicy='no-referrer'
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
                    <a
                        href={"/profile"}
                        className='flex flex-row items-center justify-center'
                    >
                        <User className='mr-2 h-4 w-4' />
                        <span>Profile</span>
                    </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link
                        href={"/api/auth/signout"}
                        className='flex flex-row items-center justify-center'
                    >
                        <LogOut className='mr-2 h-4 w-4' />
                        <span>Log out</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NavBar;
