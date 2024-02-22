"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Spinner from "./Spinner";
import { useToast } from "./ui/use-toast";

const SignInGoogle = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toast } = useToast();
    async function loginWithGoogle() {
        setIsLoading(true);
        try {
            await signIn("google");
        } catch (error) {
            // display error message to user
            toast({
                variant: "destructive",
                title: "Sign In Unsuccessful!",
                description: "Something went wrong with your login.",
            });
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                or
            </div>
            <Button
                onClick={loginWithGoogle}
                className='flex items-center w-full gap-4 px-12 mb-4 bg-transparent rounded-full'
                variant='outline'
            >
                {isLoading ? (
                    <Spinner />
                ) : (
                    <Avatar className='w-8 h-8'>
                        <AvatarImage src='/Google.svg' />
                        <AvatarFallback>G</AvatarFallback>
                    </Avatar>
                )}
                Sign In With Google
            </Button>
        </>
    );
};

export default SignInGoogle;
