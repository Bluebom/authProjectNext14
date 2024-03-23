import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "E-mail is required",
    }),
    password: z.string()
        .min(6, {
            message: "Password is required"
        }),
    code: z.optional(z.string())
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "E-mail is required",
    })
});

export const NewPasswordSchema = z.object({
    password: z.string()
        .min(6, {
            message: "Password is required"
        }),
    confirmPassword: z.string()
        .min(6, {
            message: "Password is required"
        }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"]
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