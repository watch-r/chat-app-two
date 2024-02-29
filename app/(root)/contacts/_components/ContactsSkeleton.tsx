import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ContactsSkeleton = () => {
    const contacts = [1, 2, 3];
    return (
        <>
            <RadioGroup>
                {contacts.map((user: number, index: number) => (
                    <div
                        className='flex items-center space-x-2 space-y-1 p-3 border-2 border-purple-100 dark:border-purple-950 rounded-lg'
                        key={index}
                    >
                        <RadioGroupItem value={"skeleton"} />
                        <Skeleton className='rounded-full w-9 h-9' />
                        <Skeleton className='text-lg w-40 h-6' />
                    </div>
                ))}
            </RadioGroup>
        </>
    );
};

export default ContactsSkeleton;
