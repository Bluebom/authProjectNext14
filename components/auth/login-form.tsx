"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { LoginSchema } from "@/schemas";

import {
    Form, FormControl, FormField,
    FormItem, FormLabel, FormMessage
} from "@/components/ui/form";

import { Input } from "../ui/input";

import CardWrapper from "./card-wrapper";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Login } from "@/actions/login";
import { useState, useTransition } from "react";

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ?
        "E-mail already in use with different provider." :
        "";

    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPadding, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            code: ""
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            Login(values).then((data) => {
                if (data?.error) {
                    form.reset();
                    setError(data.error);
                }
                if (data?.success) {
                    form.reset();
                    setSuccess(data.success);
                }
                if (data?.twoFactor) {
                    setShowTwoFactor(true);
                }
            }).catch(() => setError("Something went wrong!"))
        });
    }


    return (<CardWrapper
        headerLabel="Welcome Back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial
    >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="space-y-4">
                    {showTwoFactor && (
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Two Factor Code</FormLabel>
                                    <FormControl {...field} >
                                        <Input disabled={isPadding} {...field} placeholder="12345" />
                                    </FormControl>
                                    <FormMessage {...field} />
                                </FormItem>
                            )} />
                    )}
                    {!showTwoFactor && (
                        <>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl {...field} >
                                            <Input disabled={isPadding} {...field} placeholder="john.doe@example.com" type="email" />
                                        </FormControl>
                                        <FormMessage {...field} />
                                    </FormItem>
                                )} />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl {...field} >
                                            <Input disabled={isPadding} {...field} placeholder="******" type="password" />
                                        </FormControl>
                                        <Button
                                            size="sm"
                                            variant={"link"}
                                            asChild
                                            className="px-0 font-normal"
                                        >
                                            <Link href={'/auth/reset'}>
                                                Forgot your password?
                                            </Link>
                                        </Button>
                                        <FormMessage {...field} />
                                    </FormItem>
                                )} />
                        </>
                    )}
                </div>
                <FormError message={error || urlError} />
                <FormSuccess message={success} />
                <Button disabled={isPadding} type="submit" className="w-full">Login</Button>
            </form>
        </Form>
    </CardWrapper>);
}
