"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas";

import {
    Form, FormControl, FormField,
    FormItem, FormLabel, FormMessage
} from "@/components/ui/form";

import { Input } from "../ui/input";

import CardWrapper from "./card-wrapper";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Register } from "@/actions/register";
import { useState, useTransition } from "react";

export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPadding, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            Register(values).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    }


    return (<CardWrapper
        headerLabel="Create an account"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
        showSocial
    >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl {...field} >
                                    <Input disabled={isPadding} {...field} placeholder="john" type="text" />
                                </FormControl>
                                <FormMessage {...field} />
                            </FormItem>
                        )} />

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
                                <FormMessage {...field} />
                            </FormItem>
                        )} />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button disabled={isPadding} type="submit" className="w-full">Create an account</Button>
            </form>
        </Form>
    </CardWrapper>);
}
