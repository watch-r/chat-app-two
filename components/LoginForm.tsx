"use client";
import { logInSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorMessage from "./ErrorMessage";
import Logo from "./Logo";
import SignInGoogle from "./SignInGoogle";
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
                    description: "Congratulations! Sign In was Successful.",
                });
                router.refresh();
                setTimeout(() => {
                    router.push("/chats");
                }, 1500);
            } else {
                setSubmitting(false);
                toast({
                    variant: "destructive",
                    title: "Unsuccessful!",
                    description: "Invalid Username or Password!",
                });
            }
        } catch (error) {
            setSubmitting(false);
            setError("An Expected Error Occured.");
        }
    });

    return (
        <Card className='sm:w-[350px] md:w-[400px]'>
            <CardHeader className='my-2 flex flex-col items-center'>
                <CardTitle className='text-3xl font-semibold '>
                    <div className='flex flex-col items-center justify-center'>
                        <Logo />
                        Sign In
                    </div>
                </CardTitle>
                <CardDescription>
                    New here? First{" "}
                    <Link
                        className='hover:text-gray-700 hover:underline text-gray-600 dark:hover:text-gray-50 dark:text-gray-300'
                        href={"/signup"}
                    >
                        Sign up.
                    </Link>{" "}
                    {error && (
                        <Alert className='h-16 mt-2' variant={"destructive"}>
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
                            <ErrorMessage>
                                {errors.password?.message}
                            </ErrorMessage>
                        </div>
                    </div>
                    <Button
                        className='w-full rounded-full'
                        disabled={isSubmitting}
                    >
                        Sign In {isSubmitting && <Spinner />}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className='flex flex-col items-center'>
                <SignInGoogle />
            </CardFooter>
        </Card>
    );
};

export default LoginForm;
