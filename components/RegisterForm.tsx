"use client";
import { registerSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorMessage from "./ErrorMessage";
import Logo from "./Logo";
import Spinner from "./Spinner";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";

import React from "react";
import SignInGoogle from "./SignInGoogle";

type registerFormData = z.infer<typeof registerSchema>;
type FieldName = "name" | "email" | "password" | "confirmPassword";
type FormContentType = {
    id: number;
    label: string;
    htmlfor: string;
    registername: FieldName;
    type: string;
    placeholder: string;
};

const RegisterForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<registerFormData>({
        resolver: zodResolver(registerSchema),
    });
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const formContent: FormContentType[] = [
        {
            id: 1,
            label: "Name",
            htmlfor: "name",
            registername: "name",
            type: "text",
            placeholder: "Your Full Name",
        },
        {
            id: 2,
            label: "Email",
            htmlfor: "email",
            registername: "email",
            type: "email",
            placeholder: "example@email.com",
        },
        {
            id: 3,
            label: "Password",
            htmlfor: "password",
            registername: "password",
            type: "password",
            placeholder: "password",
        },
        {
            id: 4,
            label: "Confirm Password",
            htmlfor: "password",
            registername: "confirmPassword",
            type: "password",
            placeholder: "Re-enter your Password",
        },
    ];
    const submitForm = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast({
                    title: "Successful!",
                    description:
                        "Congratulations! Your Registration was Successful. Please Sign In Now.",
                });
                router.refresh();
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            } else {
                setSubmitting(false);
                toast({
                    variant: "destructive",
                    title: "Unsuccessful!",
                    description: "User Already Exists / An Unexpected Error Occured!",
                });
            }
        } catch (error) {
            setSubmitting(false);
            setError("An Unexpected Error Occured!");
        }
    });
    return (
        <Card className='sm:w-[350px] md:w-[400px]'>
            <CardHeader className='my-4 flex flex-col items-center'>
                <CardTitle className='text-3xl font-semibold '>
                    <div className='flex flex-col items-center justify-center'>
                        <Logo />
                        Sign Up
                    </div>
                </CardTitle>
                <CardDescription>
                    Already have an Account?{" "}
                    <Link
                        className='hover:text-gray-700 hover:underline text-gray-600 dark:hover:text-gray-50 dark:text-gray-300'
                        href={"/"}
                    >
                        Sign In.
                    </Link>
                    {error && (
                        <Alert className='mb-2 mt-2' variant={"destructive"}>
                            <AlertCircle className='h-4 w-4' />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className='pb-1'>
                <form onSubmit={submitForm}>
                    <div className='griditems-center gap-4'>
                        <div className='flex flex-col space-y-1 5'>
                            {formContent.map((field) => (
                                <React.Fragment key={field.id}>
                                    <Label htmlFor={field.htmlfor}>
                                        {field.label}
                                    </Label>
                                    <Input
                                        className='rounded-full'
                                        id={field.htmlfor}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        {...register(field.registername)}
                                    />
                                    <ErrorMessage>
                                        {errors[field.registername]?.message}
                                    </ErrorMessage>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <Button
                        className='w-full rounded-full'
                        disabled={isSubmitting}
                        type='submit'
                    >
                        Register {isSubmitting && <Spinner />}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className='flex flex-col items-center'>
                <SignInGoogle />
            </CardFooter>
        </Card>
    );
};

export default RegisterForm;
