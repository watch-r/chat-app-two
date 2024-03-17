import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ContactsSkeleton = () => {
    const contacts = [1, 2, 3];
    return (
        <>
            <div className='space-y-2'>
                <p className='font-semibold text-lg px-3 mt-2'>
                    Select or Deselect to start...
                </p>
                {contacts.map((user: number, index: number) => (
                    <div
                        className='flex items-center space-x-2 space-y-1 p-3 border-2 border-purple-100 dark:border-purple-950 rounded-lg'
                        key={index}
                    >
                        <Checkbox value={"skeleton"} />
                        <Skeleton className='rounded-full w-9 h-9' />
                        <Skeleton className='text-lg w-40 h-6' />
                    </div>
                ))}
            </div>
        </>
    );
};

export default ContactsSkeleton;
