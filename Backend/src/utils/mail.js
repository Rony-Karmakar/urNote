import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import { ApiError } from "./api-error.js";

const sendMail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'UrNote',
            link: 'https://taskmanager/'
            // logo: 'https://mailgen.js/img/logo.png'
        }
    });

    const emailBody = mailGenerator.generate(options.mailgenContent)

    const emailText = mailGenerator.generatePlaintext(options.mailgenContent)

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })

    const mail = {
        from: `"UrNote" <${process.env.SMTP_USER}>`,
        to: options.email,
        subject: options.subject,
        text: emailText, // plain‑text body
        html: emailBody, // HTML body
    }

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email service failed")
        throw new ApiError(404, "Email service failed", [])
    }
}

const emailVerificationMaligenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to UrNote! we are excited to have you on board.",
            action: {
                instructions: "To verify your email please click on the following button",
                button: {
                    color: "#22BC66",
                    text: "Verify your email",
                    link: verificationUrl
                }
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help"
        }
    }
}

export { emailVerificationMaligenContent, sendMail }