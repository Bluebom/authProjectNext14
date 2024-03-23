const nodemailer = require('nodemailer');

interface MailOptions {
    to: string,
    subject: string,
    html: string
}

export const sendMailService = async ({to, subject, html}:MailOptions) => {
    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.MAIL_ADDRESS,
        to: to,
        subject: subject,
        html: html,
    };

    transport.sendMail(mailOptions, (error: any, info: any) => {
        if(error){
            throw new Error(error);
        }else{
            return true;
        }
    });
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
    const options = {
        to: email,
        subject: "Two Factor Authentication",
        html: `<p>Your two factor authentication token is: ${token}</p>`
    }
    await sendMailService(options);
};

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
    const options = {
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`
    };
    await sendMailService(options);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
    const options = {
        to: email,
        subject: "Set your new password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    };
    await sendMailService(options);
};