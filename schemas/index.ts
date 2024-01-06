import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "E-mail is required",
    }),
    password: z.string()
        .min(1, {
            message: "Password is required"
        })
});

export const RegisterSchema = z.object({
    email: z.string()
        .email({
            message: "E-mail is required",
        }),
    password: z.string()
        .min(6, {
            message: "Minimum 6 characters required"
        }).max(100, {
            message: "Maximum 100 characters allowed"
        }),
    name: z.string()
        .min(1, {
            message: "Name is required"
        })
});