"use client";
import { logInSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import Link from "next/link";

type logInFormData = z.infer<typeof logInSchema>;
const LoginForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<logInFormData>({
        resolver: zodResolver(logInSchema),
    });
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const submitForm = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            const response = await signIn("credentials", {
                ...data,
                redirect: false,
            });

            if (response!.ok) {
                toast({
                    title: "Successful!",
                    description: "Congratulations! Sign In was Sucessfull.",
                });
                router.refresh();
                setTimeout(() => {
                    router.push("/chats");
                }, 1500);
            }
        } catch (error) {
            setSubmitting(false);
            setError("An Expected Error Occured.");
        }
    });

    return (
        <div className='mb-3 w-auto xl:w-1/3 md:w-9/12'>
            <div className='my-4 flex flex-col items-center'>
                <h1 className='text-3xl font-semibold justify-center'>
                    Sign In
                </h1>
            </div>
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
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            className='rounded-full'
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
                            className='rounded-full'
                            id='password'
                            type='password'
                            placeholder='Password'
                            {...register("password")}
                        />
                        <ErrorMessage>{errors.password?.message}</ErrorMessage>
                    </div>
                    <Button
                        className='w-full rounded-full'
                        disabled={isSubmitting}
                        type='submit'
                    >
                        Sign In {isSubmitting && <Spinner />}
                    </Button>
                </div>
            </form>
            <div className='flex flex-col items-center'>
                <p className='text-xs pt-3 text-slate-500'>
                    New here?{" "}
                    <Link
                        className='hover:text-gray-50 text-gray-300'
                        href={"/signup"}
                    >
                        Sign up.
                    </Link>{" "}
                    First
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
