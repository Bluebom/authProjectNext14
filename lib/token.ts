import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expiresAt = new Date(new Date().getTime() + 3600 * 1000); // current time + 1 hour
    const existingToken = await getTwoFactorTokenByEmail(email);
    if(existingToken){
        db.twoFactorToken.delete({where: {id: existingToken.id}});
    }
    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expiresAt
        }
    });
    return twoFactorToken;
}

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