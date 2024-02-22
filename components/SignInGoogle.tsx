"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signIn } from "next-auth/react";

const SignInGoogle = () => {
    return (
        <>
            <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                or
            </div>
            <Button
                onClick={() => signIn("google")}
                className='flex items-center w-full gap-4 px-12 mb-4 bg-transparent rounded-full'
                variant='outline'
            >
                <Avatar className='w-8 h-8'>
                    <AvatarImage src='/Google.svg' />
                    <AvatarFallback>G</AvatarFallback>
                </Avatar>
                Sign In With Google
            </Button>
        </>
    );
};

export default SignInGoogle;
