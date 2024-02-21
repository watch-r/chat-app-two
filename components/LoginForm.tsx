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
            setError("An Expected Error Occured.");
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

export default LoginForm;
