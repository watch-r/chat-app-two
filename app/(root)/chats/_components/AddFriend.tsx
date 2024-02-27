"use client";

import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addFriendForm } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { prisma } from "@/prisma/client";

const AddFriend = () => {
    const [error, setError] = useState("");
    // 1. Define your form.
    const form = useForm<z.infer<typeof addFriendForm>>({
        resolver: zodResolver(addFriendForm),
        defaultValues: {
            email: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof addFriendForm>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        let receiverId;
        const receiver = await prisma.user.findUnique({
            where: { email: values.email },
        });
        if (receiver) receiverId = receiver.id;

        await prisma.friendRequest.findMany({where:{}})

        const response = await fetch(`/api/friend/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
            cache: "no-store",
        });
        if (response.ok) {
            console.log("Done");
        }
    }
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='griditems-center gap-4'>
                <div className='flex flex-col items-center space-y-1 5'>
                    <Label htmlFor='email' className='text-lg font-bold'>
                        Add Friend By Email
                    </Label>
                    <Input
                        className='rounded-full'
                        id='email'
                        type='email'
                        placeholder='example@email.com'
                        {...form.register("email")}
                    />
                    <ErrorMessage>
                        {form.formState.errors.email?.message}
                    </ErrorMessage>
                </div>
            </div>
            <Button className='w-full rounded-full'>Add</Button>
        </form>
    );
};

export default AddFriend;
