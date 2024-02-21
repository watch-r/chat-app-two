"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { registerSchema } from "@/lib/schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";

type registerFormData = z.infer<typeof registerSchema>;

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
    const submitForm = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            const validatedData = registerSchema.safeParse(data);
            const res = await fetch("/api/auth/registera", {
                //problem here /api/auth/register
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(validatedData),
            });
            if (res.ok) {
                toast({
                    title: "Successful!",
                    description:
                        "Congratulations! Your Registration was Sucessfull",
                });
                router.refresh();
                setTimeout(() => {
                    router.push("/auth/login");
                }, 2000);
            } else {
                setSubmitting(false);
                toast({
                  variant:'destructive',
                    title: "Unsuccessful!",
                    description:
                        "An Unexpected Error Occured!",
                });
            }
        } catch (error) {
            setSubmitting(false);
            setError("An Unexpected Error Occured!");
        }
    });
    return (
        <div className='max-w-xl'>
            {error && (
                <Alert className='mb-2 mt-2' variant={"destructive"}>
                    <AlertCircle className='h-4 w-4' />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <form onSubmit={submitForm}>
                <div className='griditems-center gap-4'>
                    <div className='flex flex-col space-y-1 5'>
                        <Label htmlFor='name'>Name</Label>
                        <Input
                            id='name'
                            type='text'
                            placeholder='Name'
                            {...register("name")}
                        />
                        <ErrorMessage>{errors.name?.message}</ErrorMessage>
                    </div>
                    <div className='flex flex-col space-y-1 5'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            type='email'
                            placeholder='Email'
                            {...register("email")}
                        />
                        <ErrorMessage>{errors.email?.message}</ErrorMessage>
                    </div>
                    <div className='flex flex-col space-y-1 5'>
                        <Label htmlFor='password'>Password</Label>
                        <Input
                            id='password'
                            type='password'
                            placeholder='Password'
                            {...register("password")}
                        />
                        <ErrorMessage>{errors.password?.message}</ErrorMessage>
                    </div>
                    <Button disabled={isSubmitting} type='submit'>
                        Register {isSubmitting && <Spinner />}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
