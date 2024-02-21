import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, "Name Must Be at least 3 characters long"),
    email: z.string().email("Please Provide a Valid Email"),
    password: z.string().min(5, "Password Minimum 5 Character(s) long"),
});
