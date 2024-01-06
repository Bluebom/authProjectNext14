"use server"

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import {db} from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values);
    if(!validateFields.success) {
        return {error: "Invalid fields"};
    }
    const {name, email, password} = validateFields.data;

    const hashPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email); 

    if(existingUser) {
        return {error: "User already in use"};
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashPassword
        }
    });

    return {success: "Email sent!"};
}