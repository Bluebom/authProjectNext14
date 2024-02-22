import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expiresAt = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);
    if (existingToken) {
        db.passwordResetToken.delete({ where: { id: existingToken.id } });
    }

    return await db.passwordResetToken.create({
        data: {
            email,
            token,
            expiresAt
        }
    });
};

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expiresAt = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        db.verificationToken.delete({ where: { id: existingToken.id } });
    }

    return await db.verificationToken.create({
        data: {
            email,
            token,
            expiresAt
        }
    });
}