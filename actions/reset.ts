"use server"

import { ResetSchema } from "@/schemas";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/mail";

export const Reset = async (values: z.infer<typeof ResetSchema>) => {
    const validateFields = ResetSchema.safeParse(values);
    if (!validateFields.success) {
        return { error: "Invalid fields" };
    }
    const { email } = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email) {
        return { error: "E-mail does not exist!" };
    }

    if (!existingUser.emailVerified) {
        return { error: "E-mail not verified!" }
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return { success: "Reset e-mail sent!" };
}