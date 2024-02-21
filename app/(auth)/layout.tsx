import { ToggleTheme } from "@/components/ToggleTheme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";
import Image from "next/image";

const layout = ({ children }: PropsWithChildren) => {
    return (
        <main className='bg-[#26313c] h-screen flex items-center justify-center p-10  '>
            <div className='grid w-full h-full grid-cols-1 bg-white box-anim md:grid-cols-2 rounded-md'>
                <div className='bg-[#16202a] text-white flex items-center justify-center flex-col rounded-md'>
                    {children}
                    <span className='text-slate-600 mb-3'>or</span>
                    <div>
                        <Button
                            className='flex items-center w-full gap-4 px-12 mb-4 bg-transparent rounded-full'
                            variant='outline'
                        >
                            <Avatar className='w-8 h-8'>
                                <AvatarImage src='/Google.svg' />
                                <AvatarFallback>G</AvatarFallback>
                            </Avatar>
                            Sign In With Google
                        </Button>
                    </div>
                    <p className='mt-4 text-xs text-slate-200'>
                        @2024 All rights reserved
                    </p>
                </div>
                <div className='relative hidden md:block'>
                    {/* <ToggleTheme /> */}
                    <Image
                        className='object-cover '
                        fill={true}
                        src='/bg.jpg'
                        alt='bg-image'
                    />
                </div>
            </div>
        </main>
    );
};

export default layout;
