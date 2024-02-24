import { z } from "zod";

export const registerSchema = z
    .object({
        name: z.string().min(2, "Name Must Be at least 3 character(s) long"),
        email: z.string().email("Please Provide a Valid Email"),
        password: z
            .string()
            .min(5, "Password must be Minimum 5 Character(s) long"),
        confirmPassword: z.string().min(5, "Need to Re-Enter the password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords Do Not Match",
    });

export const logInSchema = z.object({
    email: z.string().email("Please Provide a Valid Email"),
    password: z.string().min(5, "Password Minimum 5 Character(s) long"),
});

export const patchProfileSchema = z.object({
    name: z
        .string()
        .min(2, "Name Must Be at least 3 character(s) long")
        .optional(),
    image: z.string().optional(),
});
