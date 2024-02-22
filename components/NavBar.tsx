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

const NavBar = () => {
    return (
        <nav className='border-b-2 px-5 mb-5 py-3'>
            <div className='flex flex-row items-center justify-between'>
                <Link
                    href={"/"}
                    className='flex flex-row space-x-2 items-center'
                >
                    <Image
                        src={"/chatlogo.svg"}
                        alt='Chat logo'
                        height={"50"}
                        width={30}
                    />{" "}
                    <p className='text-lg font-extrabold'>Chat App</p>
                </Link>
                <div className='flex space-x-2 items-center'>
                    <NavLinks />
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
                    <Link href={link.href} className='font-bold'>
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

const AuthStatus = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NavBar;
