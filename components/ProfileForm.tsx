"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Spinner from "./Spinner";
import { useToast } from "./ui/use-toast";

type user = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    hashedPassword?: string | null;
    image?: string | null;
} | null;

type CloudinaryResult = {
    public_id: string;
    secure_url: string;
};

const profileFormSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters.",
    }),
    image: z.string().nullable(),
});

interface Props {
    user: user;
}

const ProfileForm = ({ user }: Props) => {
    const router = useRouter();
    const { toast } = useToast();
    const [isloading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: user!.name!,
            image: user!.image! || "/defaultperson.png",
        },
    });
    const uploadPhotoHandler = (result: any) => {
        if (result.event !== "success") return;
        const info = result.info as CloudinaryResult;
        form.setValue("image", info.secure_url);
    };

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof profileFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            setLoading(true);
            const response = await fetch(`/api/users/${user!.id}/update`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
                cache: "no-store",
            });
            if (response.ok) {
                toast({
                    variant: "default",
                    title: "Successful!",
                    description:
                        "Profile Updated Successfully.",
                });
                setLoading(false);
            }
            router.refresh();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Unsuccessful!",
                description: "An error Occured.",
            });
            setLoading(false);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder='Your Name' {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex items-center justify-between'>
                    <Image
                        src={
                            form.watch("image") ||
                            user!.image ||
                            "/defaultperson.png"
                        }
                        className='rounded-full'
                        alt={"Your Profile Picture"}
                        width={"160"}
                        height={"160"}
                    />
                    <CldUploadWidget
                        options={{
                            maxFiles: 1,
                            cropping: true,
                            sources: ["local"],
                            resourceType: "image",
                        }}
                        onUpload={uploadPhotoHandler}
                        uploadPreset='ffsyomdz'
                    >
                        {({ open }) => (
                            <Button onClick={() => open()}>Upload</Button>
                        )}
                    </CldUploadWidget>
                </div>
                <Button disabled={isloading} type='submit'>
                    Save Changes {isloading && <Spinner />}
                </Button>
            </form>
        </Form>
    );
};

export default ProfileForm;
