import React from "react";
import ContactsSkeleton from "./_components/ContactsSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingPageOfContacts = () => {
    return (
        <>
            <Skeleton className=' my-2 w-full h-10' />
            <div className='flex flex-row space-x-2'>
                <div className='w-1/2 max-lg:hidden'>
                    <ContactsSkeleton />
                </div>
                <div className='w-1/2 max-lg:w-full flex flex-col gap-7'>
                    <Skeleton className='w-full h-10' />
                </div>
            </div>
        </>
    );
};

export default LoadingPageOfContacts;
