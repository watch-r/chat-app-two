"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const LogOutButton = () => {
    const handleClick = () => signOut({ callbackUrl: "/" });
    return (
        <Button
            onClick={handleClick}
            variant={"link"}
            className='flex flex-row items-center justify-center h-6'
        >
            <LogOut className='mr-2 h-4 w-4' />
            <span>Log out</span>
        </Button>
    );
};

export default LogOutButton;
