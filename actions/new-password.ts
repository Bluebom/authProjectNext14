"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const NewPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {
    if(!token){
        return { error: "Invalid token" };
    }

    const validateFields = NewPasswordSchema.safeParse(values);

    if(!validateFields.success){
        return { error: "Invalid fields" };
    }

    const { password } = validateFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if(!existingToken){
        return { error: "Invalid token" };
    }

    const hasExpired = new Date(existingToken.expiresAt) < new Date();

    if(hasExpired){
        return { error: "Token has expired" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser){
        return { error: "E-mail not found" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {id: existingUser.id},
        data: {password: hashedPassword}
    });

    return { success: "Password has been reset!" };
}